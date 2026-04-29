import Image from 'next/image'

import {Stagger, StaggerItem} from '@/app/components/Stagger'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'
import {urlForImage} from '@/sanity/lib/utils'

interface StepItem {
  _key: string
  number: number
  title: string
  description: string
}

interface HowItWorksSectionProps {
  heading: string
  eyebrow?: string
  steps: StepItem[]
  image?: {asset?: {_ref: string}} | null
}

export default function HowItWorksSection({
  heading,
  eyebrow = 'Le parcours',
  steps,
  image,
}: HowItWorksSectionProps) {
  if (!steps || steps.length === 0) return null

  const imageUrl = image?.asset
    ? urlForImage(image).width(800).height(1000).fit('crop').quality(85).url()
    : null

  return (
    <section className="bg-surface-2 border-y border-hairline py-20 md:py-28">
      <Container>
        <SectionIntro eyebrow={eyebrow} heading={heading} className="mb-12 md:mb-16" />

        <div className={`grid grid-cols-1 lg:gap-x-12 lg:items-center ${imageUrl ? 'lg:grid-cols-12' : ''}`}>
          {imageUrl ? (
            <aside className="lg:col-span-5 xl:col-span-5 mb-10 lg:mb-0">
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-hairline bg-surface-2">
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>
              </figure>
            </aside>
          ) : null}

          <div className={imageUrl ? 'lg:col-span-7 xl:col-span-7' : ''}>
            <Stagger as="ol" className="border-t border-hairline" staggerDelay={0.08}>
              {steps.map((step) => (
                <StaggerItem
                  as="li"
                  key={step._key}
                  className="group grid grid-cols-12 gap-x-4 items-start py-6 md:py-7 border-b border-hairline transition-colors hover:bg-surface-2/50"
                >
                  <div className="col-span-2 pt-1">
                    <span
                      className="font-heading font-medium text-ink-faint tabular-nums"
                      style={{fontSize: 'clamp(1.25rem, 1.6vw, 1.625rem)'}}
                      aria-hidden="true"
                    >
                      {String(step.number).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="col-span-10">
                    <h3
                      className="font-heading font-medium text-ink tracking-tight leading-[1.15]"
                      style={{fontSize: 'clamp(1.25rem, 2vw, 1.75rem)'}}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-base text-ink-muted leading-relaxed max-w-[60ch]">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  )
}
