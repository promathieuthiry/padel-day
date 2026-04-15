import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {installerPageQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import FadeIn from '@/app/components/FadeIn'
import Container from '@/app/components/ui/Container'
import Button from '@/app/components/Button'
import SectionIntro from '@/app/components/ui/SectionIntro'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: installerPageQuery, stega: false})
  return {
    title: page?.metaTitle || 'Installer un terrain de padel',
    description:
      page?.metaDescription || 'Decouvrez comment installer un terrain de padel avec Padel Day.',
  }
}

function renderHighlightedHeading(heading: string, highlightWords?: string[] | null) {
  if (!highlightWords || highlightWords.length === 0) return heading
  const words = heading.split(' ')
  return words.map((word, i) => {
    const isHighlighted = highlightWords.some((hw) =>
      word.toLowerCase().includes(hw.toLowerCase()),
    )
    return (
      <span key={i}>
        {isHighlighted ? (
          <span className="relative inline-block">
            <span className="relative z-10">{word}</span>
            <span
              aria-hidden="true"
              className="absolute left-[-0.04em] right-[-0.04em] bottom-[0.06em] h-[0.14em] bg-lime -z-0 rounded-[2px]"
            />
          </span>
        ) : (
          word
        )}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    )
  })
}

const benefitIcons: Record<string, React.ReactNode> = {
  check: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 16 L14.5 19.5 L21 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <path
        d="M16 4 L28 10 V18 C28 24 22 28 16 30 C10 28 4 24 4 18 V10 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 10 V16 L20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <path
        d="M10 6 H22 V14 C22 18 19 22 16 22 C13 22 10 18 10 14 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="16" y1="22" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="11"
        y1="26"
        x2="21"
        y2="26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M10 8 H6 V12 C6 14 8 14 10 14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 8 H26 V12 C26 14 24 14 22 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
}

function getBenefitIcon(iconName?: string) {
  if (!iconName) return benefitIcons.check
  return benefitIcons[iconName.toLowerCase()] || benefitIcons.check
}

export default async function InstallerPage() {
  const {data: page} = await sanityFetch({query: installerPageQuery})

  if (!page) {
    notFound()
  }

  const heroImage = page.heroImage as
    | {asset?: unknown; alt?: string | null}
    | null
    | undefined
  const heroImageUrl = heroImage?.asset
    ? urlForImage(heroImage).width(1200).quality(88).url()
    : null
  const heroImageAlt = heroImage?.alt?.trim() || ''
  const heroImageHasAlt = heroImageAlt.length > 0

  return (
    <>
      <section
        className="relative overflow-hidden bg-surface isolate"
        aria-labelledby="installer-hero-heading"
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
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-[140px] opacity-[0.22]"
          style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
        />

        <Container className="relative z-10 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-end">
            <div className="col-span-12 lg:col-span-8">
              <FadeIn>
                <p className="eyebrow mb-8 flex items-center gap-3">
                  <span aria-hidden="true" className="relative inline-flex size-2.5">
                    <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                    <span className="relative inline-block size-2.5 rounded-full bg-lime" />
                  </span>
                  <span>Pour collectivités &amp; clubs</span>
                  <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  id="installer-hero-heading"
                  className="font-display font-bold text-ink leading-[0.94] tracking-[-0.035em] text-balance"
                  style={{fontSize: 'clamp(2.5rem, 6.8vw, 5.75rem)'}}
                >
                  {renderHighlightedHeading(page.heroHeading || '', page.heroHighlightWords)}
                </h1>
              </FadeIn>

              {page.heroBody && (
                <FadeIn delay={0.2}>
                  <div className="mt-8 md:mt-10 text-base md:text-lg text-ink-muted leading-[1.6] font-body max-w-[58ch]">
                    <PortableText value={page.heroBody} />
                  </div>
                </FadeIn>
              )}

              <FadeIn delay={0.3}>
                <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    href="#process"
                    className="group relative inline-flex items-center gap-3 self-start bg-dark text-lime rounded-full pl-7 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                  >
                    <span>Découvrir le parcours</span>
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-dark transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5"
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
                        <path d="M9 4v10" />
                        <path d="M4 10l5 5 5-5" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 self-start text-ink font-semibold text-[0.95rem] py-2 transition-colors duration-200 hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue rounded-sm"
                  >
                    <span className="relative">
                      Parler à un expert
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

            <div className="col-span-12 lg:col-span-4">
              <FadeIn delay={0.35}>
                <div className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-[3/4] w-full">
                  <div className="absolute inset-0 rounded-[28px] overflow-hidden bg-blue ring-1 ring-dark/10 shadow-[0_30px_60px_-25px_rgba(10,20,60,0.45)]">
                    {heroImageUrl ? (
                      <Image
                        src={heroImageUrl}
                        alt={heroImageAlt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="object-cover object-center"
                        aria-hidden={heroImageHasAlt ? undefined : true}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(160deg, var(--color-blue) 0%, oklch(0.35 0.13 258) 100%)',
                        }}
                      />
                    )}

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full opacity-[0.55] mix-blend-screen"
                    >
                      <g
                        fill="none"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="0.25"
                        vectorEffect="non-scaling-stroke"
                      >
                        <rect x="6" y="6" width="88" height="88" />
                        <line x1="12" y1="6" x2="12" y2="94" />
                        <line x1="88" y1="6" x2="88" y2="94" />
                        <line x1="6" y1="50" x2="94" y2="50" strokeWidth="0.4" />
                        <line x1="6" y1="22" x2="94" y2="22" strokeDasharray="1 1.5" />
                        <line x1="6" y1="78" x2="94" y2="78" strokeDasharray="1 1.5" />
                      </g>
                    </svg>

                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(120% 80% at 50% 30%, transparent 0%, transparent 55%, rgba(10,20,60,0.45) 100%)',
                      }}
                    />
                  </div>

                  {!heroImageUrl && (
                    <div className="absolute inset-x-0 bottom-6 flex justify-center">
                      <span className="eyebrow text-white/70 bg-dark/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                        Image à définir dans Sanity
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-hairline" />
      </section>

      {page.steps && page.steps.length > 0 && (
        <section id="process" className="relative bg-surface border-b border-hairline py-24 md:py-32">
          <Container>
            <FadeIn>
              <SectionIntro
                eyebrow="Le parcours"
                heading={page.stepsHeading || undefined}
                className="mb-16 md:mb-20"
              />
            </FadeIn>

            <ol className="border-t border-hairline">
              {page.steps.map((step, i) => (
                <FadeIn key={step._key} delay={i * 0.06}>
                  <li className="group grid grid-cols-12 gap-x-6 items-start py-8 md:py-10 border-b border-hairline transition-colors hover:bg-surface-2/60">
                    <div className="col-span-12 md:col-span-2">
                      <div className="flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className="font-display text-lime font-semibold tabular-nums"
                          style={{fontSize: 'clamp(1.5rem, 2.2vw, 2rem)'}}
                        >
                          {String(step.number).padStart(2, '0')}
                        </span>
                        <span className="h-px w-8 bg-hairline mt-[-0.5rem] hidden md:block" />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h3
                        className="font-display font-semibold text-ink tracking-tight leading-[1.1]"
                        style={{fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)'}}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <p className="font-body text-base text-ink-muted leading-[1.65] max-w-[54ch]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {page.benefits && page.benefits.length > 0 && (
        <section className="relative bg-surface-2 border-b border-hairline py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full blur-[140px] opacity-[0.12]"
            style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
          />

          <Container className="relative">
            <FadeIn>
              <SectionIntro
                eyebrow="Les bénéfices"
                heading={page.benefitsHeading || undefined}
                className="mb-16 md:mb-20"
              />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
              {page.benefits.map((benefit, i) => (
                <FadeIn key={benefit._key} delay={i * 0.05}>
                  <article className="h-full bg-surface p-8 md:p-10 flex flex-col gap-6 transition-colors hover:bg-surface-2/40">
                    <div className="flex items-center justify-between">
                      <span
                        aria-hidden="true"
                        className="flex size-12 items-center justify-center rounded-full bg-dark text-lime"
                      >
                        {getBenefitIcon(benefit.icon)}
                      </span>
                      <span className="font-display text-ink-faint tabular-nums text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-ink text-xl md:text-2xl tracking-tight leading-[1.15] mb-3">
                        {benefit.title}
                      </h3>
                      <p className="font-body text-base text-ink-muted leading-[1.65] max-w-[48ch]">
                        {benefit.description}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {page.features && page.features.length > 0 && (
        <section className="relative bg-surface border-b border-hairline py-24 md:py-32">
          <Container>
            <FadeIn>
              <SectionIntro
                eyebrow="Inclus dans l'offre"
                heading={page.featuresHeading || undefined}
                className="mb-12 md:mb-16"
              />
            </FadeIn>

            <div className="flex flex-wrap gap-3">
              {page.features.map((feature, i) => (
                <FadeIn key={feature._key} delay={i * 0.03}>
                  <span className="inline-flex items-center gap-2.5 py-2.5 pl-3 pr-5 rounded-full border border-hairline bg-surface hover:border-dark/40 hover:bg-surface-2/50 transition-colors">
                    <span
                      aria-hidden="true"
                      className="flex size-5 items-center justify-center rounded-full bg-lime text-dark"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 18 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9.5l4 4 8-9" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-ink font-body">
                      {feature.label}
                    </span>
                  </span>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

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

        <Container className="relative z-10 py-28 md:py-40">
          <FadeIn>
            <div>
              <p className="eyebrow text-lime/90 mb-8">Prêt à lancer votre projet</p>
              {page.ctaHeading && (
                <h2
                  className="font-display font-semibold text-white leading-[0.98] tracking-[-0.035em] text-balance"
                  style={{fontSize: 'clamp(2.25rem, 6vw, 5rem)'}}
                >
                  {page.ctaHeading}
                </h2>
              )}

              {page.ctaBody && (
                <div className="mt-8 md:mt-10 text-base md:text-lg text-gray-300 leading-[1.65] font-body prose prose-invert max-w-[58ch]">
                  <PortableText value={page.ctaBody} />
                </div>
              )}

              {page.cta && (
                <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
                  <Button label={page.cta.label} href={page.cta.href} variant="primary" />
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-white/80 font-semibold text-[0.95rem] hover:text-lime transition-colors"
                  >
                    <span className="relative">
                      Poser une question
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
              )}
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
