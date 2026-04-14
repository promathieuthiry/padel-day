import {PortableText} from '@portabletext/react'
import type {BlockContent, Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import Container from '@/app/components/ui/Container'

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
    <section className="bg-surface py-24 md:py-36">
      <Container>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-3 md:pt-3 mb-6 md:mb-0">
            <p className="eyebrow">Le concept</p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-heading font-semibold text-ink tracking-tight leading-[1.05] max-w-[22ch]"
              style={{fontSize: 'clamp(2rem, 4.2vw, 3.75rem)'}}
            >
              {heading}
            </h2>

            {body && (
              <div className="mt-8 md:mt-10 text-lg md:text-xl text-ink-muted leading-[1.65] font-body prose max-w-[62ch] prose-p:my-6 prose-strong:text-ink prose-strong:font-medium">
                <PortableText value={body} />
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Button label={primaryCta.label} href={primaryCta.href} variant="primary" />
                )}
                {secondaryCta && (
                  <Button label={secondaryCta.label} href={secondaryCta.href} variant="secondary" />
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
