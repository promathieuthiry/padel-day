'use server'

import {draftMode} from 'next/headers'
import {createClient} from '@sanity/client'
import {apiVersion, dataset, projectId} from '@/sanity/lib/api'

const writeToken = process.env.SANITY_API_WRITE_TOKEN
if (!writeToken) {
  console.error('Missing SANITY_API_WRITE_TOKEN — contact form submissions will fail.')
}

export async function disableDraftMode() {
  'use server'
  await Promise.allSettled([
    (await draftMode()).disable(),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ])
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
})

export async function submitContactForm(
  formData: FormData,
): Promise<{success: boolean; error?: string}> {
  // Honeypot — bots fill hidden fields
  if (formData.get('website')) {
    return {success: false, error: 'Spam detected.'}
  }

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  // Server-side validation
  if (!name || name.length === 0) {
    return {success: false, error: 'Le nom est requis.'}
  }
  if (name.length > 200) {
    return {success: false, error: 'Nom trop long.'}
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {success: false, error: 'Veuillez entrer un email valide.'}
  }
  if (email.length > 320) {
    return {success: false, error: 'Email trop long.'}
  }
  if (!message || message.length === 0) {
    return {success: false, error: 'Le message est requis.'}
  }
  if (message.length > 5000) {
    return {success: false, error: 'Message trop long (5000 caracteres max).'}
  }

  try {
    await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    return {success: true}
  } catch (err) {
    console.error('Failed to submit contact form:', err)
    return {success: false, error: 'Une erreur est survenue. Veuillez reessayer.'}
  }
}
