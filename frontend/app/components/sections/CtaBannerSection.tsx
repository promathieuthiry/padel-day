import type {Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

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
          <SectionIntro
            eyebrow="Prêt à jouer ?"
            heading={heading}
            className="col-span-12 md:col-span-8"
          />

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
