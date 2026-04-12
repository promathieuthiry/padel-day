import {PortableText} from '@portabletext/react'
import type {BlockContent, Cta} from '@/sanity.types'
import Button from '@/app/components/Button'

interface IntroSectionProps {
  heading: string
  body?: BlockContent
  primaryCta?: Cta | null
  secondaryCta?: Cta | null
}

export default function IntroSection({
  heading,
  body,
  primaryCta,
  secondaryCta,
}: IntroSectionProps) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark tracking-tight">
            {heading}
          </h2>

          {body && (
            <div className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed font-body prose prose-gray mx-auto max-w-[60ch]">
              <PortableText value={body} />
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {primaryCta && (
                <Button
                  label={primaryCta.label}
                  href={primaryCta.href}
                  variant="primary"
                />
              )}
              {secondaryCta && (
                <Button
                  label={secondaryCta.label}
                  href={secondaryCta.href}
                  variant="secondary"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
