import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import Button from '@/app/components/Button'
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
  return words.map((word, i) => {
    const isHighlighted = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()))
    return (
      <span key={i}>
        {isHighlighted ? (
          <span className="relative inline-block">
            <span className="relative z-10">{word}</span>
            <span
              aria-hidden="true"
              className="absolute left-[-0.05em] right-[-0.05em] bottom-[0.06em] h-[0.28em] bg-lime -z-0 skew-x-[-4deg]"
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
  const bgUrl = image?.asset ? urlForImage(image).width(2400).quality(85).url() : null
  const imageAlt = image?.alt ?? ''
  const hasDescriptiveAlt = imageAlt.trim().length > 0

  const primary = primaryCta ?? {label: 'Contact', href: '/contact', style: 'primary'}
  const secondary = secondaryCta ?? {
    label: 'En savoir plus',
    href: '/installer-un-terrain',
    style: 'secondary',
  }

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-surface"
      aria-labelledby="hero-heading"
    >
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center"
          aria-hidden={hasDescriptiveAlt ? undefined : true}
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            'linear-gradient(180deg, oklch(0.985 0.004 255 / 0.92) 0%, oklch(0.985 0.004 255 / 0.78) 45%, oklch(0.985 0.004 255 / 0.55) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            'linear-gradient(95deg, oklch(0.985 0.004 255 / 0.95) 0%, oklch(0.985 0.004 255 / 0.88) 38%, oklch(0.985 0.004 255 / 0.45) 62%, transparent 82%)',
        }}
      />

      <div className="relative z-10 min-h-[100dvh] flex items-center px-5 md:px-10 py-28 md:py-24 max-w-[1440px] mx-auto">
        <div className="w-full md:max-w-[46rem]">
          <p
            className="eyebrow mb-8 md:mb-10 flex items-center gap-3 hero-reveal"
            style={{animationDelay: '220ms'}}
          >
            <span aria-hidden="true" className="relative inline-flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
              <span className="relative inline-block size-2.5 rounded-full bg-lime" />
            </span>
            <span>Play Simple</span>
          </p>

          <h1
            id="hero-heading"
            className="font-display font-bold text-ink leading-[0.92] tracking-[-0.03em] hero-reveal text-balance"
            style={{
              fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)',
              animationDelay: '340ms',
            }}
          >
            {renderHeading(heading, highlightWords)}
          </h1>

          {slogan && (
            <p
              className="mt-8 md:mt-10 text-base md:text-lg text-ink-muted font-body max-w-[46ch] leading-[1.55] hero-reveal"
              style={{animationDelay: '520ms'}}
            >
              {slogan}
            </p>
          )}

          <div
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 hero-reveal"
            style={{animationDelay: '680ms'}}
          >
            {primary && <Button label={primary.label} href={primary.href} variant="primary" />}
            {secondary && (
              <Button label={secondary.label} href={secondary.href} variant="secondary" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
