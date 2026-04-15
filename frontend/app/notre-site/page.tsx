import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import {sanityFetch} from '@/sanity/lib/live'
import {notreSitePageQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'

import FadeIn from '@/app/components/FadeIn'
import StatusBadge from '@/app/components/StatusBadge'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: notreSitePageQuery, stega: false})
  return {
    title: page?.metaTitle || 'Notre site',
    description: page?.metaDescription || 'Decouvrez notre terrain de padel.',
  }
}

export default async function NotreSitePage() {
  const {data: page} = await sanityFetch({query: notreSitePageQuery})

  if (!page) {
    notFound()
  }

  const courtImageUrl = page.courtImage?.asset
    ? urlForImage(page.courtImage).width(1800).height(1200).fit('crop').quality(88).url()
    : null

  const features = page.features ?? []
  const hasFeatures = features.length > 0

  return (
    <>
      {/* HERO — editorial, aurora-tinted, asymmetric */}
      <section
        className="relative overflow-hidden bg-surface isolate"
        aria-labelledby="notre-site-heading"
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
          className="pointer-events-none absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full blur-[160px] opacity-[0.20]"
          style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
        />

        <Container className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-9">
              <FadeIn>
                <p className="eyebrow mb-8 flex items-center gap-3">
                  <span aria-hidden="true" className="relative inline-flex size-2.5">
                    <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                    <span className="relative inline-block size-2.5 rounded-full bg-lime" />
                  </span>
                  <span>Notre référence · Projet pilote</span>
                  <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  id="notre-site-heading"
                  className="font-display font-bold text-ink leading-[0.94] tracking-[-0.035em] text-balance"
                  style={{fontSize: 'clamp(2.5rem, 7vw, 5.75rem)'}}
                >
                  {page.heading || 'Notre site'}
                </h1>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-3 lg:pb-4">
              <FadeIn delay={0.2}>
                <dl className="flex flex-row lg:flex-col gap-8 lg:gap-6 pt-6">
                  {page.locationLabel && (
                    <div>
                      <dt className="eyebrow text-ink-faint mb-2">Localisation</dt>
                      <dd className="font-display text-ink text-base md:text-lg leading-tight">
                        {page.locationLabel}
                      </dd>
                    </div>
                  )}
                  {page.status && page.statusLabel && (
                    <div>
                      <dt className="eyebrow text-ink-faint mb-2">Statut</dt>
                      <dd>
                        <StatusBadge status={page.status} label={page.statusLabel} />
                      </dd>
                    </div>
                  )}
                </dl>
              </FadeIn>
            </div>
          </div>
        </Container>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-hairline" />
      </section>

      {/* FULL-BLEED COURT IMAGE — the hero object */}
      <section className="relative bg-surface">
        <div className="relative">
          <FadeIn>
            <div className="relative w-full overflow-hidden bg-dark">
              <div className="relative aspect-[16/10] md:aspect-[21/9] lg:aspect-[21/8] w-full">
                {courtImageUrl ? (
                  <Image
                    src={courtImageUrl}
                    alt={page.heading || 'Terrain de padel'}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-dark">
                    <svg
                      viewBox="0 0 200 120"
                      className="w-56 h-32 text-lime/40"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="20"
                        y="20"
                        width="160"
                        height="80"
                        rx="4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="100"
                        y1="20"
                        x2="100"
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="20"
                        y1="60"
                        x2="180"
                        y2="60"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        strokeDasharray="4 3"
                      />
                    </svg>
                  </div>
                )}

                {/* Court tramlines overlay */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] mix-blend-screen"
                >
                  <g
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="0.18"
                    vectorEffect="non-scaling-stroke"
                  >
                    <rect x="4" y="4" width="92" height="92" />
                    <line x1="4" y1="50" x2="96" y2="50" strokeWidth="0.3" />
                    <line x1="4" y1="22" x2="96" y2="22" strokeDasharray="1 1.5" />
                    <line x1="4" y1="78" x2="96" y2="78" strokeDasharray="1 1.5" />
                    <line x1="50" y1="22" x2="50" y2="78" />
                  </g>
                </svg>

                {/* Bottom vignette for caption legibility */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 50%, rgba(10,20,60,0.55) 100%)',
                  }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES — editorial numbered callouts */}
      {hasFeatures && (
        <section className="relative bg-surface border-b border-hairline py-24 md:py-32">
          <Container>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
              <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24">
                <FadeIn>
                  <SectionIntro
                    eyebrow="Fiche technique"
                    heading="Un terrain conçu pour durer."
                    body="Chaque détail — structure, revêtement, éclairage — a été pensé pour offrir une expérience de jeu fiable, saison après saison."
                  />
                </FadeIn>
              </div>

              <div className="col-span-12 lg:col-span-8">
                <ol className="border-t border-hairline">
                  {features.map((feature, i) => (
                    <FadeIn key={feature._key} delay={i * 0.05}>
                      <li className="group grid grid-cols-12 gap-x-4 items-baseline py-6 md:py-7 border-b border-hairline transition-colors hover:bg-surface-2/60">
                        <div className="col-span-3 sm:col-span-2">
                          <span
                            aria-hidden="true"
                            className="font-display text-lime font-semibold tabular-nums"
                            style={{fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)'}}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="col-span-9 sm:col-span-10">
                          <span
                            className="font-display font-semibold text-ink tracking-tight leading-[1.2]"
                            style={{fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)'}}
                          >
                            {feature.label}
                          </span>
                        </div>
                      </li>
                    </FadeIn>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* DESCRIPTION — editorial prose */}
      {page.description && (
        <section className="relative bg-surface-2 border-b border-hairline py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-0 h-[30rem] w-[30rem] rounded-full blur-[140px] opacity-[0.10]"
            style={{background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 60%)'}}
          />
          <Container className="relative">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-3">
                <FadeIn>
                  <SectionIntro eyebrow="À propos du site" heading="Le lieu, en détail." />
                </FadeIn>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <FadeIn delay={0.1}>
                  <div className="font-body text-ink text-lg md:text-xl leading-[1.55] max-w-[62ch] [&_p]:mt-6 [&_p:first-child]:mt-0 [&_p:first-child]:text-xl [&_p:first-child]:md:text-2xl [&_p:first-child]:leading-[1.4] [&_p:first-child]:text-ink [&_p:first-child]:font-display [&_p:first-child]:font-medium [&_p:first-child]:tracking-[-0.01em] [&_p:not(:first-child)]:text-ink-muted [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-ink [&_strong]:font-semibold">
                    <PortableText value={page.description} />
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA — B2B close */}
      <section className="relative bg-dark overflow-hidden isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] w-[50rem] rounded-full blur-[180px] opacity-[0.28]"
            style={{
              background:
                'radial-gradient(circle, var(--color-lime) 0%, var(--color-blue) 45%, transparent 70%)',
            }}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), rgba(255,255,255,0.9) calc(50% - 0.5px), rgba(255,255,255,0.9) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
          }}
        />

        <Container className="relative z-10 py-24 md:py-36">
          <div className="w-full">
            <FadeIn>
              <p className="eyebrow text-lime/90 mb-8 flex items-center gap-3">
                <span aria-hidden="true" className="inline-block h-px w-10 bg-lime/40" />
                <span>Votre projet</span>
              </p>
              <h2
                className="font-display font-semibold text-white leading-[0.98] tracking-[-0.035em] text-balance w-full"
                style={{fontSize: 'clamp(2rem, 5.4vw, 4.25rem)'}}
              >
                Un terrain comme celui-ci, dans votre commune.
              </h2>
              <p className="mt-8 md:mt-10 text-base md:text-lg text-white/70 leading-[1.6] font-body max-w-[72ch]">
                Collectivités et clubs : nous accompagnons l&apos;étude, l&apos;installation et
                l&apos;exploitation de votre terrain de padel, de la faisabilité à la première
                réservation.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-12 md:mt-14 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-8">
                <Link
                  href="/installer-un-terrain"
                  className="group relative inline-flex items-center gap-3 self-start bg-lime text-dark rounded-full pl-7 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                >
                  <span>Installer un terrain</span>
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
                  >
                    <svg
                      width="16"
                      height="16"
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
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 self-start text-white/85 font-semibold text-[0.95rem] py-2 transition-colors duration-200 hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime rounded-sm"
                >
                  <span className="relative">
                    Visiter le site
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-1 h-px bg-current"
                    />
                  </span>
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                  >
                    <path d="M4 9h10" />
                    <path d="M10 4l5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
