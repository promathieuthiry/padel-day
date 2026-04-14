import type {Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import Container from '@/app/components/ui/Container'

interface CtaBannerSectionProps {
  heading: string
  primaryCta?: Cta | null
  secondaryCta?: Cta | null
}

export default function CtaBannerSection({
  heading,
  primaryCta,
  secondaryCta,
}: CtaBannerSectionProps) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <div className="border-t border-ink/20 pt-12 md:pt-16 grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow mb-5">Prêt à jouer ?</p>
            <h2
              className="font-heading font-semibold text-ink tracking-tight leading-[1]"
              style={{fontSize: 'clamp(2.5rem, 6vw, 5rem)'}}
            >
              {heading}
            </h2>
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="col-span-12 md:col-span-4 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end md:items-end">
              {primaryCta && (
                <Button label={primaryCta.label} href={primaryCta.href} variant="primary" />
              )}
              {secondaryCta && (
                <Button label={secondaryCta.label} href={secondaryCta.href} variant="secondary" />
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
