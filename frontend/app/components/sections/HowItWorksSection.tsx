import Image from 'next/image'

import Container from '@/app/components/ui/Container'
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
    <section
      className="py-20 md:py-28"
      style={{
        background: 'oklch(0.42 0.17 258)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 40px -10px rgba(0,15,70,0.3)',
      }}
    >
      <Container>
        <div className="mb-12 md:mb-16 max-w-[62rem]">
          {eyebrow ? (
            <p
              className="mb-6 flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-lime)',
              }}
            >
              <span aria-hidden="true" className="relative inline-flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2.5 rounded-full bg-lime" />
              </span>
              <span>{eyebrow}</span>
              <span aria-hidden="true" className="inline-block h-px w-10" style={{background: 'rgba(214,253,38,0.4)'}} />
            </p>
          ) : null}
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.025em]"
            style={{fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#ffffff'}}
          >
            {heading}
          </h2>
        </div>

        <div className={`grid grid-cols-1 lg:gap-x-12 lg:items-center ${imageUrl ? 'lg:grid-cols-12' : ''}`}>
          {imageUrl ? (
            <aside className="lg:col-span-5 xl:col-span-5 mb-10 lg:mb-0">
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm" style={{border: '1px solid rgba(255,255,255,0.14)', background: 'oklch(0.36 0.14 258)'}}>
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    aria-hidden="true"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 mix-blend-multiply"
                    style={{
                      background:
                        'linear-gradient(160deg, rgba(10,18,28,0.55) 0%, rgba(10,18,28,0.15) 45%, rgba(132,204,22,0.18) 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
                      backgroundSize: '3px 3px',
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 h-6 w-6 border-l border-t border-lime"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-lime"
                  />
                </div>
              </figure>
            </aside>
          ) : null}

          <div className={imageUrl ? 'lg:col-span-7 xl:col-span-7' : ''}>
            <ol style={{borderTop: '1px solid rgba(255,255,255,0.14)'}}>
              {steps.map((step) => (
                <li
                  key={step._key}
                  className="group grid grid-cols-12 gap-x-4 items-start py-6 md:py-7 transition-colors"
                  style={{borderBottom: '1px solid rgba(255,255,255,0.10)'}}
                >
                  <div className="col-span-2 pt-1">
                    <span
                      className="font-heading font-medium tabular-nums"
                      style={{fontSize: 'clamp(1.25rem, 1.6vw, 1.625rem)', color: 'oklch(0.60 0.08 255)'}}
                      aria-hidden="true"
                    >
                      {String(step.number).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="col-span-10">
                    <h3
                      className="font-heading font-medium tracking-tight leading-[1.15]"
                      style={{fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: '#ffffff'}}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed max-w-[60ch]" style={{color: 'oklch(0.76 0.05 255)'}}>
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
