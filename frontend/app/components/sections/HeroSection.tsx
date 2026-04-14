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
              className="absolute left-0 right-0 bottom-0 h-[0.22em] bg-lime -z-0"
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
  const bgUrl = image?.asset
    ? urlForImage(image).width(2400).quality(85).url()
    : null
  const imageAlt = image?.alt ?? ''
  const hasDescriptiveAlt = imageAlt.trim().length > 0

  const primary = primaryCta ?? {label: 'Contact', href: '/contact', style: 'primary'}
  const secondary =
    secondaryCta ?? {label: 'En savoir plus', href: '/installer-un-terrain', style: 'secondary'}

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
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, oklch(0.2 0.02 258 / 0.08) 100%)',
        }}
      />


      <div className="relative z-10 min-h-[100dvh] flex items-center px-5 md:px-10 py-28 md:py-24 max-w-[1440px] mx-auto">
        <div className="w-full md:w-auto md:max-w-[42rem] bg-surface/96 backdrop-blur-sm px-6 py-8 md:px-12 md:py-14 shadow-[0_24px_60px_-20px_oklch(0.2_0.02_258/0.18)]">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span>Play Simple</span>
            <span aria-hidden="true" className="inline-block h-px w-8 bg-blue/60" />
            <span className="text-ink-faint">Ouvert 7 j/7</span>
          </p>

          <h1
            id="hero-heading"
            className="font-display font-bold text-ink leading-[0.95] tracking-[-0.025em]"
            style={{fontSize: 'clamp(2.5rem, 7vw, 6rem)'}}
          >
            {renderHeading(heading, highlightWords)}
          </h1>

          {slogan && (
            <p className="mt-6 md:mt-8 text-base md:text-lg text-ink-muted font-body max-w-[42ch] leading-relaxed">
              {slogan}
            </p>
          )}

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3">
            {primary && (
              <Button label={primary.label} href={primary.href} variant="primary" />
            )}
            {secondary && (
              <Button label={secondary.label} href={secondary.href} variant="secondary" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
