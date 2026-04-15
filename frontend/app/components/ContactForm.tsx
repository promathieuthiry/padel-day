'use client'

import {useState} from 'react'
import {toast} from 'sonner'
import {submitContactForm} from '@/app/actions'

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(formData: FormData): Record<string, string> {
    const errs: Record<string, string> = {}
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || name.trim().length === 0) {
      errs.name = 'Le nom est requis.'
    }
    if (!email || email.trim().length === 0) {
      errs.email = "L'email est requis."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Veuillez entrer un email valide.'
    }
    if (!message || message.trim().length === 0) {
      errs.message = 'Le message est requis.'
    }

    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsPending(true)

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        toast.success('Message envoye !')
        form.reset()
      } else {
        toast.error(result.error || 'Une erreur est survenue.')
      }
    } catch (err) {
      console.error('Contact form submission failed:', err)
      toast.error('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setIsPending(false)
    }
  }

  const inputBase =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-body text-dark placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-lime focus:ring-2 focus:ring-lime/30'
  const errorInput = 'border-red-400 focus:border-red-400 focus:ring-red-400/30'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, filled by bots */}
      <div aria-hidden="true" style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden'}}>
        <label htmlFor="pd_hp_field">Laissez ce champ vide</label>
        <input type="text" id="pd_hp_field" name="pd_hp_field" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-dark mb-1.5 font-body">
          Nom
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Votre nom"
          className={`${inputBase} ${errors.name ? errorInput : ''}`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-500 font-body" role="alert">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-dark mb-1.5 font-body">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          autoComplete="email"
          placeholder="votre@email.com"
          className={`${inputBase} ${errors.email ? errorInput : ''}`}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500 font-body" role="alert">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-dark mb-1.5 font-body">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Comment pouvons-nous vous aider ?"
          className={`${inputBase} resize-y min-h-[120px] ${errors.message ? errorInput : ''}`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500 font-body" role="alert">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center rounded-full bg-lime text-dark font-semibold text-sm px-6 py-3.5 border-2 border-lime transition-all duration-200 hover:bg-lime/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
              <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          'Envoyer'
        )}
      </button>
    </form>
  )
}
