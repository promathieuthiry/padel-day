import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery, siteSettingsQuery} from '@/sanity/lib/queries'
import {PortableText} from '@portabletext/react'

import FadeIn from '@/app/components/FadeIn'
import ContactForm from '@/app/components/ContactForm'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

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

  const heroEyebrow = page?.heroEyebrow ?? 'Contact · Parlons de votre projet'
  const highlights = page?.highlights?.length
    ? page.highlights
    : [
        {label: 'Réponse', value: 'Sous 48h ouvrées'},
        {label: 'Zone', value: 'France métropolitaine'},
        {label: 'Interlocuteurs', value: 'Collectivités · Clubs'},
      ]
  const formEyebrow = page?.formEyebrow ?? 'Formulaire'
  const formHeading = page?.formHeading ?? 'Décrivez-nous votre projet.'
  const formBody =
    page?.formBody ??
    'Quelques lignes suffisent. Plus vous nous en dites sur le contexte — commune, club, calendrier — plus notre réponse sera précise.'
  const channelsEyebrow = page?.channelsEyebrow ?? 'Autres canaux'
  const channelsHeading = page?.channelsHeading ?? 'Joignez-nous directement.'
  const channelsBody =
    page?.channelsBody ??
    'Pour une question rapide ou un premier échange informel, choisissez le canal qui vous convient.'
  const channelLabels = {
    email: page?.channelLabels?.email ?? 'Écrire un email',
    instagram: page?.channelLabels?.instagram ?? 'Suivre sur Instagram',
    facebook: page?.channelLabels?.facebook ?? 'Visiter notre page',
  }
  const reassurance = {
    eyebrow: page?.reassurance?.eyebrow ?? 'Engagement',
    title:
      page?.reassurance?.title ??
      'Chaque demande reçoit une réponse personnalisée, jamais un formulaire générique.',
    body:
      page?.reassurance?.body ??
      'Nous étudions votre contexte — terrain, usage, budget — avant de vous rappeler.',
  }

  const channels: Array<{
    key: string
    label: string
    value: string
    href: string
    external?: boolean
    icon: React.ReactNode
  }> = []

  if (contactEmail) {
    channels.push({
      key: 'email',
      label: channelLabels.email,
      value: contactEmail,
      href: `mailto:${contactEmail}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M3 7 L12 13 L21 7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    })
  }

  if (socialInstagram) {
    channels.push({
      key: 'instagram',
      label: channelLabels.instagram,
      value: 'Instagram',
      href: socialInstagram,
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      ),
    })
  }

  if (socialFacebook) {
    channels.push({
      key: 'facebook',
      label: channelLabels.facebook,
      value: 'Facebook',
      href: socialFacebook,
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
          <path
            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    })
  }

  return (
    <>
      {/* HERO — editorial aurora, B2B-oriented supporting copy */}
      <section
        className="relative overflow-hidden bg-surface isolate"
        aria-labelledby="contact-heading"
      >
        <div aria-hidden="true" className="hero-aurora-layer">
          <div className="hero-aurora-blob hero-aurora-blob--a" />
          <div className="hero-aurora-blob hero-aurora-blob--b" />
          <div className="hero-aurora-blob hero-aurora-blob--c" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), var(--color-blue) calc(50% - 0.5px), var(--color-blue) calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(50% - 0.5px), var(--color-blue) calc(50% - 0.5px), var(--color-blue) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 -top-48 h-[34rem] w-[34rem] rounded-full blur-[150px] opacity-[0.20]"
          style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
        />

        <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <FadeIn>
                <p className="eyebrow mb-8 flex items-center gap-3">
                  <span aria-hidden="true" className="relative inline-flex size-2.5">
                    <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                    <span className="relative inline-block size-2.5 rounded-full bg-lime" />
                  </span>
                  <span>{heroEyebrow}</span>
                  <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  id="contact-heading"
                  className="font-display font-bold text-ink leading-[0.94] tracking-[-0.035em] text-balance"
                  style={{fontSize: 'clamp(2.5rem, 6.8vw, 5.75rem)'}}
                >
                  {page?.heading || 'Prenons contact.'}
                </h1>
              </FadeIn>

              {page?.introBody ? (
                <FadeIn delay={0.2}>
                  <div className="mt-8 md:mt-10 font-body text-ink text-lg md:text-xl leading-[1.55] max-w-[58ch] [&_p]:mt-5 [&_p:first-child]:mt-0 [&_p:first-child]:text-xl [&_p:first-child]:md:text-2xl [&_p:first-child]:leading-[1.4] [&_p:first-child]:text-ink [&_p:first-child]:font-display [&_p:first-child]:font-medium [&_p:first-child]:tracking-[-0.01em] [&_p:not(:first-child)]:text-ink-muted [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-ink [&_strong]:font-semibold">
                    <PortableText value={page.introBody} />
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.2}>
                  <p className="mt-8 md:mt-10 font-display font-medium text-ink text-xl md:text-2xl leading-[1.4] tracking-[-0.01em] max-w-[52ch]">
                    Collectivités, clubs, promoteurs — une question, un projet, une étude de
                    faisabilité&nbsp;? Écrivez-nous, nous revenons vers vous sous 48h ouvrées.
                  </p>
                </FadeIn>
              )}
            </div>

            <div className="col-span-12 lg:col-span-4 lg:pb-4">
              <FadeIn delay={0.3}>
                <dl className="flex flex-row lg:flex-col gap-8 lg:gap-7 pt-6 lg:border-l lg:border-hairline lg:pl-8">
                  {highlights.map((highlight, i) => (
                    <div key={highlight.label ?? i}>
                      <dt className="eyebrow text-ink-faint mb-2">{highlight.label}</dt>
                      <dd className="font-display text-ink text-base md:text-lg leading-tight">
                        {highlight.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            </div>
          </div>
        </Container>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-hairline" />
      </section>

      {/* FORM + CHANNELS — editorial split, form leads, channels as editorial list */}
      <section className="relative bg-surface border-b border-hairline py-20 md:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-0 items-start">
            {/* Left: form intro + form */}
            <div className="col-span-12 lg:col-span-7">
              <FadeIn>
                <SectionIntro
                  eyebrow={formEyebrow}
                  heading={formHeading}
                  body={formBody}
                  className="mb-10 md:mb-12"
                />
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="relative">
                  {/* Frame accent */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 -left-3 h-10 w-10 border-t-2 border-l-2 border-lime rounded-tl-[4px]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-blue/60 rounded-br-[4px]"
                  />
                  <div className="relative bg-surface-2/60 border border-hairline rounded-[20px] p-6 md:p-10">
                    <ContactForm />
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: channels as editorial numbered list */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-24">
              <FadeIn delay={0.15}>
                <p className="eyebrow mb-6 flex items-center gap-3">
                  <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                  <span>{channelsEyebrow}</span>
                </p>
                <h2
                  className="font-display font-semibold text-ink tracking-tight leading-[1.05]"
                  style={{fontSize: 'clamp(1.5rem, 2.4vw, 2rem)'}}
                >
                  {channelsHeading}
                </h2>
                <p className="mt-4 font-body text-ink-muted text-base leading-[1.6] max-w-[38ch]">
                  {channelsBody}
                </p>
              </FadeIn>

              {channels.length > 0 && (
                <ol className="mt-10 border-t border-hairline">
                  {channels.map((channel, i) => (
                    <FadeIn key={channel.key} delay={0.2 + i * 0.05}>
                      <li className="border-b border-hairline">
                        <a
                          href={channel.href}
                          target={channel.external ? '_blank' : undefined}
                          rel={channel.external ? 'noopener noreferrer' : undefined}
                          className="group grid grid-cols-12 gap-x-3 items-center py-5 md:py-6 transition-colors hover:bg-surface-2/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue rounded-sm"
                        >
                          <div className="col-span-2">
                            <span
                              aria-hidden="true"
                              className="font-display text-lime font-semibold tabular-nums text-sm md:text-base"
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="col-span-8 min-w-0">
                            <p className="eyebrow text-ink-faint mb-1">{channel.label}</p>
                            <p className="font-display font-semibold text-ink text-base md:text-[1.05rem] tracking-tight leading-tight truncate">
                              {channel.value}
                            </p>
                          </div>
                          <div className="col-span-2 flex justify-end">
                            <span
                              aria-hidden="true"
                              className="flex size-9 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            >
                              {channel.external ? (
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M6 4h8v8" />
                                  <path d="M14 4L4 14" />
                                </svg>
                              ) : (
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M4 9h10" />
                                  <path d="M10 4l5 5-5 5" />
                                </svg>
                              )}
                            </span>
                          </div>
                        </a>
                      </li>
                    </FadeIn>
                  ))}
                </ol>
              )}

              {/* Editorial reassurance card */}
              <FadeIn delay={0.4}>
                <div className="mt-10 relative overflow-hidden rounded-[20px] bg-dark p-8 isolate">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full blur-[90px] opacity-[0.35]"
                    style={{
                      background:
                        'radial-gradient(circle, var(--color-lime) 0%, var(--color-blue) 55%, transparent 75%)',
                    }}
                  />
                  <p className="relative eyebrow text-lime/90 mb-4">{reassurance.eyebrow}</p>
                  <p className="relative font-display text-white text-lg md:text-xl leading-[1.35] tracking-[-0.01em] max-w-[28ch]">
                    {reassurance.title}
                  </p>
                  <p className="relative mt-4 font-body text-white/65 text-sm leading-[1.6]">
                    {reassurance.body}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
