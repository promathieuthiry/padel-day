import Image from 'next/image'
import Link from 'next/link'
import {urlForImage} from '@/sanity/lib/utils'
import Container from '@/app/components/ui/Container'
import type {Cta} from '@/sanity.types'

interface HeroImage {
  asset?: {_ref: string}
  alt?: string | null
}

interface HeroSectionProps {
  heading: string
  highlightWords?: string[]
  slogan?: string
  image?: HeroImage | null
  primaryCta?: Cta | null
  secondaryCta?: Cta | null
}

function renderHeading(heading: string, highlightWords?: string[]) {
  if (!highlightWords || highlightWords.length === 0) return heading
  const words = heading.split(' ')
  let highlightIndex = 0
  return words.map((word, i) => {
    const isHighlighted = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()))
    const delay = isHighlighted ? 1100 + highlightIndex * 180 : 0
    if (isHighlighted) highlightIndex += 1
    return (
      <span key={i}>
        {isHighlighted ? (
          <span className="relative inline-block">
            <span className="relative z-10">{word}</span>
            <span
              aria-hidden="true"
              className="hero-underline absolute left-[-0.04em] right-[-0.04em] bottom-[0.04em] h-[0.14em] bg-lime -z-0 rounded-[2px]"
              style={{animationDelay: `${delay}ms`}}
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

export default function HeroSection({
  heading,
  highlightWords,
  slogan,
  image,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  const bgUrl = image?.asset ? urlForImage(image).width(1600).quality(88).url() : null
  const imageAlt = image?.alt ?? ''
  const hasDescriptiveAlt = imageAlt.trim().length > 0

  const primary = primaryCta ?? {
    label: 'Installer un terrain',
    href: '/installer-un-terrain',
    style: 'primary',
  }
  const secondary = secondaryCta ?? {
    label: 'Découvrir notre site',
    href: '/notre-site',
    style: 'secondary',
  }

  return (
    <section className="relative overflow-hidden bg-surface isolate" aria-labelledby="hero-heading">
      {/* Aurora drift — animated brand gradient, sits furthest back.
          Pure CSS transform/opacity; respects prefers-reduced-motion via globals.css */}
      <div aria-hidden="true" className="hero-aurora-layer">
        <div className="hero-aurora-blob hero-aurora-blob--a" />
        <div className="hero-aurora-blob hero-aurora-blob--b" />
        <div className="hero-aurora-blob hero-aurora-blob--c" />
      </div>

      {/* Court tramlines — same motif as Footer, kept very faint on light ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), var(--color-blue) calc(50% - 0.5px), var(--color-blue) calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(50% - 0.5px), var(--color-blue) calc(50% - 0.5px), var(--color-blue) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        }}
      />

      {/* Lime bloom — anchored top-right, balances the editorial composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-[140px] opacity-[0.22]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14 pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 min-h-[100dvh] items-center">
          {/* LEFT — Editorial content column */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7">
            {/* Eyebrow — status pulse + B2B positioning */}
            <p
              className="eyebrow mb-8 md:mb-10 flex items-center gap-3 hero-reveal"
              style={{animationDelay: '220ms'}}
            >
              <span aria-hidden="true" className="relative inline-flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2.5 rounded-full bg-lime" />
              </span>
              <span>Padel automatisé</span>
            </p>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="font-display font-bold text-ink leading-[0.92] tracking-[-0.035em] hero-reveal text-balance"
              style={{
                fontSize: 'clamp(2.75rem, 7.2vw, 6.25rem)',
                animationDelay: '340ms',
              }}
            >
              {renderHeading(heading, highlightWords)}
            </h1>

            {slogan && (
              <p
                className="mt-8 md:mt-10 text-base md:text-[1.075rem] text-ink-muted font-body max-w-[52ch] leading-[1.6] hero-reveal"
                style={{animationDelay: '520ms'}}
              >
                {slogan}
              </p>
            )}

            {/* CTAs — editorial pill primary + ghost arrow secondary */}
            <div
              className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 hero-reveal"
              style={{animationDelay: '700ms'}}
            >
              {primary && (
                <Link
                  href={primary.href ?? '#'}
                  className="group relative inline-flex items-center gap-3 self-start bg-dark text-lime rounded-full pl-7 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                >
                  <span>{primary.label}</span>
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-dark transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
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
              )}
              {secondary && (
                <Link
                  href={secondary.href ?? '#'}
                  className="group inline-flex items-center gap-2 self-start text-ink font-semibold text-[0.95rem] py-2 transition-colors duration-200 hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue rounded-sm"
                >
                  <span className="relative">
                    {secondary.label}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-1 h-px bg-current origin-left scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
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
              )}
            </div>
          </div>

          {/* RIGHT — Image inside a "court frame" with tramline overlay */}
          <div
            className="col-span-12 lg:col-span-5 xl:col-span-5 hero-reveal"
            style={{animationDelay: '460ms'}}
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-[3/4] w-full">
              {/* Outer court frame — dark border, deep blue ground */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden bg-blue ring-1 ring-dark/10 shadow-[0_30px_60px_-25px_rgba(10,20,60,0.45)]">
                {bgUrl ? (
                  <Image
                    src={bgUrl}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-center"
                    aria-hidden={hasDescriptiveAlt ? undefined : true}
                  />
                ) : (
                  // Fallback: graphical court when no image is set in Sanity
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(160deg, var(--color-blue) 0%, oklch(0.35 0.13 258) 100%)',
                    }}
                  />
                )}

                {/* Tramline overlay — service box + center line */}
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
                    {/* outer */}
                    <rect x="6" y="6" width="88" height="88" />
                    {/* tramlines */}
                    <line x1="12" y1="6" x2="12" y2="94" />
                    <line x1="88" y1="6" x2="88" y2="94" />
                    {/* service line / net */}
                    <line x1="6" y1="50" x2="94" y2="50" strokeWidth="0.4" />
                    {/* glass back wall hint */}
                    <line x1="6" y1="22" x2="94" y2="22" strokeDasharray="1 1.5" />
                    <line x1="6" y1="78" x2="94" y2="78" strokeDasharray="1 1.5" />
                  </g>
                </svg>

                {/* Subtle vignette so the image holds the eye */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 50% 30%, transparent 0%, transparent 55%, rgba(10,20,60,0.45) 100%)',
                  }}
                />
              </div>

              {/* Floating credentials chip — B2B reassurance, anchored bottom-left */}
              <div
                className="absolute -left-3 sm:-left-5 -bottom-5 sm:-bottom-6 max-w-[16rem] bg-surface rounded-2xl p-4 sm:p-5 ring-1 ring-hairline shadow-[0_18px_40px_-18px_rgba(10,20,60,0.25)] hero-reveal"
                style={{animationDelay: '780ms'}}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-full bg-lime text-dark"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9.5l4 4 8-9" />
                    </svg>
                  </span>
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted"
                    style={{fontFamily: 'var(--font-poppins), sans-serif'}}
                  >
                    Partenaire installation
                  </span>
                </div>
                <p className="mt-3 font-display text-[0.95rem] leading-snug text-ink tracking-[-0.01em]">
                  Étude de site, financement et exploitation gérés de bout en bout.
                </p>
              </div>

              {/* Lime corner accent — court line punctuation */}
              <span
                aria-hidden="true"
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 flex size-12 sm:size-14 items-center justify-center rounded-full bg-lime ring-4 ring-surface text-dark"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 14L14 4" />
                  <path d="M7 4h7v7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom hairline — connects hero to the next section editorially */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-hairline" />
    </section>
  )
}
