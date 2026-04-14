import {Stagger, StaggerItem} from '@/app/components/Stagger'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

interface StepItem {
  _key: string
  number: number
  title: string
  description: string
}

interface HowItWorksSectionProps {
  heading: string
  steps: StepItem[]
}

export default function HowItWorksSection({heading, steps}: HowItWorksSectionProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="bg-surface-2 border-y border-hairline py-20 md:py-28">
      <Container>
        <SectionIntro eyebrow="Le parcours" heading={heading} className="mb-12 md:mb-16" />

        <Stagger as="ol" className="border-t border-hairline" staggerDelay={0.08}>
          {steps.map((step) => (
            <StaggerItem
              as="li"
              key={step._key}
              className="group grid grid-cols-12 gap-x-4 md:gap-x-8 items-start py-6 md:py-8 border-b border-hairline transition-colors hover:bg-surface-2/50"
            >
              <div className="col-span-2 md:col-span-1 pt-1">
                <span
                  className="font-heading font-medium text-ink-faint tabular-nums"
                  style={{fontSize: 'clamp(1.25rem, 1.6vw, 1.625rem)'}}
                  aria-hidden="true"
                >
                  {String(step.number).padStart(2, '0')}
                </span>
              </div>

              <h3
                className="col-span-10 md:col-span-5 font-heading font-medium text-ink tracking-tight leading-[1.15]"
                style={{fontSize: 'clamp(1.25rem, 2vw, 1.75rem)'}}
              >
                {step.title}
              </h3>

              <p className="col-start-3 md:col-start-auto md:col-span-6 mt-2 md:mt-0 md:pt-2 font-body text-base text-ink-muted leading-relaxed max-w-[60ch]">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
