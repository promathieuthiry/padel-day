'use server'

import {draftMode} from 'next/headers'
import {createClient} from '@sanity/client'
import {Resend} from 'resend'
import {apiVersion, dataset, projectId} from '@/sanity/lib/api'

const writeToken = process.env.SANITY_API_WRITE_TOKEN
if (!writeToken) {
  console.error('Missing SANITY_API_WRITE_TOKEN — contact form submissions will fail.')
}

const resendApiKey = process.env.RESEND_API_KEY
const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Padel Day <onboarding@resend.dev>'
if (!resendApiKey) {
  console.warn('Missing RESEND_API_KEY — contact form email notifications will be skipped.')
}
if (!notificationEmail) {
  console.warn('Missing CONTACT_NOTIFICATION_EMAIL — contact form email notifications will be skipped.')
}

const resend = resendApiKey ? new Resend(resendApiKey) : null

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
  if (formData.get('pd_hp_field')) {
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
  } catch (err) {
    console.error('Failed to submit contact form:', err)
    return {success: false, error: 'Une erreur est survenue. Veuillez reessayer.'}
  }

  if (resend && notificationEmail) {
    try {
      const {error} = await resend.emails.send({
        from: fromEmail,
        to: notificationEmail,
        replyTo: email,
        subject: `Nouveau message de ${name} — Padel Day`,
        text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;">
            <h2 style="margin:0 0 16px;">Nouveau message via le formulaire de contact</h2>
            <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
            <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Message :</strong></p>
            <pre style="white-space:pre-wrap;font-family:inherit;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(message)}</pre>
          </div>
        `,
      })
      if (error) {
        console.error('Resend email failed:', error)
      }
    } catch (err) {
      console.error('Resend email threw:', err)
    }
  }

  return {success: true}
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
