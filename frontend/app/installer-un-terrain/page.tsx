import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {sanityFetch} from '@/sanity/lib/live'
import {installerPageQuery} from '@/sanity/lib/queries'
import FadeIn from '@/app/components/FadeIn'
import Button from '@/app/components/Button'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: installerPageQuery, stega: false})
  return {
    title: page?.metaTitle || 'Installer un terrain de padel',
    description: page?.metaDescription || 'Decouvrez comment installer un terrain de padel avec Padel Day.',
  }
}

function renderHighlightedHeading(heading: string, highlightWords?: string[] | null) {
  if (!highlightWords || highlightWords.length === 0) return heading
  const words = heading.split(' ')
  return words.map((word, i) => {
    const isHighlighted = highlightWords.some(
      (hw) => word.toLowerCase().includes(hw.toLowerCase()),
    )
    return (
      <span key={i}>
        {isHighlighted ? <span className="text-lime">{word}</span> : word}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    )
  })
}

const benefitIcons: Record<string, React.ReactNode> = {
  check: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M11 16 L14.5 19.5 L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 4 L28 10 V18 C28 24 22 28 16 30 C10 28 4 24 4 18 V10 Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10 V16 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M10 6 H22 V14 C22 18 19 22 16 22 C13 22 10 18 10 14 Z" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="22" x2="16" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="11" y1="26" x2="21" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 8 H6 V12 C6 14 8 14 10 14" stroke="currentColor" strokeWidth="2" />
      <path d="M22 8 H26 V12 C26 14 24 14 22 14" stroke="currentColor" strokeWidth="2" />
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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 30%, oklch(0.85 0.18 120 / 0.05), transparent)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-[1.08] tracking-tight">
                {renderHighlightedHeading(page.heroHeading || '', page.heroHighlightWords)}
              </h1>
            </FadeIn>

            {page.heroBody && (
              <FadeIn delay={0.15}>
                <div className="mt-6 md:mt-8 text-base md:text-lg text-gray-300 leading-relaxed font-body prose prose-invert max-w-[55ch]">
                  <PortableText value={page.heroBody} />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Steps */}
      {page.steps && page.steps.length > 0 && (
        <FadeIn>
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6">
              {page.stepsHeading && (
                <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-16">
                  {page.stepsHeading}
                </h2>
              )}

              <div className="relative max-w-5xl mx-auto">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px border-t-2 border-dashed border-gray-200" aria-hidden="true" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-6">
                  {page.steps.map((step) => (
                    <div key={step._key} className="relative text-center">
                      <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-lime flex items-center justify-center mb-6">
                        <span className="font-heading text-2xl font-semibold text-dark">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-body max-w-[28ch] mx-auto">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Benefits grid */}
      {page.benefits && page.benefits.length > 0 && (
        <FadeIn>
          <section className="bg-gray-50 py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6">
              {page.benefitsHeading && (
                <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-16">
                  {page.benefitsHeading}
                </h2>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {page.benefits.map((benefit) => (
                  <div
                    key={benefit._key}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center text-dark mb-5">
                      {getBenefitIcon(benefit.icon)}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-body">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Features list */}
      {page.features && page.features.length > 0 && (
        <FadeIn>
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6">
              {page.featuresHeading && (
                <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-12">
                  {page.featuresHeading}
                </h2>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                {page.features.map((feature) => (
                  <div
                    key={feature._key}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gray-50"
                  >
                    <div className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
                    <span className="text-sm font-medium text-dark font-body">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Bottom CTA */}
      <FadeIn>
        <section className="bg-dark py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {page.ctaHeading && (
              <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white tracking-tight max-w-3xl mx-auto">
                {page.ctaHeading}
              </h2>
            )}

            {page.ctaBody && (
              <div className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed font-body prose prose-invert mx-auto max-w-[55ch]">
                <PortableText value={page.ctaBody} />
              </div>
            )}

            {page.cta && (
              <div className="mt-10">
                <Button
                  label={page.cta.label}
                  href={page.cta.href}
                  variant="primary"
                />
              </div>
            )}
          </div>
        </section>
      </FadeIn>
    </>
  )
}
