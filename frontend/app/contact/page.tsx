import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery, siteSettingsQuery} from '@/sanity/lib/queries'
import {PortableText} from '@portabletext/react'

import FadeIn from '@/app/components/FadeIn'
import ContactForm from '@/app/components/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: contactPageQuery, stega: false})
  return {
    title: page?.metaTitle || 'Contact',
    description: page?.metaDescription || 'Contactez Padel Day pour toute question.',
  }
}

export default async function ContactPage() {
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: contactPageQuery}),
    sanityFetch({query: siteSettingsQuery}),
  ])

  const contactEmail = settings?.contactEmail
  const socialInstagram = settings?.socialInstagram
  const socialFacebook = settings?.socialFacebook

  return (
    <>
      {/* Header space */}
      <section className="bg-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-white tracking-tight">
              {page?.heading || 'Contact'}
            </h1>
            {page?.introBody && (
              <div className="mt-4 text-base md:text-lg text-gray-300 font-body prose prose-invert max-w-[55ch]">
                <PortableText value={page.introBody} />
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 md:gap-16 md:grid-cols-5">
            {/* Form */}
            <FadeIn className="md:col-span-3">
              <ContactForm />
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.1} className="md:col-span-2">
              <div className="rounded-2xl bg-gray-50 p-8 md:p-10">
                <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                  Nos coordonnees
                </h2>

                <div className="space-y-5">
                  {contactEmail && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0 text-dark">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M3 7 L12 13 L21 7" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-body mb-0.5">Email</p>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="text-sm font-medium text-dark hover:text-blue transition-colors font-body"
                        >
                          {contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {socialInstagram && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0 text-dark">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-body mb-0.5">Instagram</p>
                        <a
                          href={socialInstagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-dark hover:text-blue transition-colors font-body"
                        >
                          Suivez-nous
                        </a>
                      </div>
                    </div>
                  )}

                  {socialFacebook && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0 text-dark">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-body mb-0.5">Facebook</p>
                        <a
                          href={socialFacebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-dark hover:text-blue transition-colors font-body"
                        >
                          Notre page
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
