import type {Cta} from '@/sanity.types'
import Button from '@/app/components/Button'

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
    <section className="bg-lime py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark tracking-tight max-w-3xl mx-auto">
          {heading}
        </h2>

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              <Button
                label={primaryCta.label}
                href={primaryCta.href}
                variant="primary"
                className="bg-dark text-white border-dark hover:bg-dark/90 hover:border-dark/90"
              />
            )}
            {secondaryCta && (
              <Button
                label={secondaryCta.label}
                href={secondaryCta.href}
                variant="secondary"
                className="border-dark text-dark hover:bg-dark hover:text-white"
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
