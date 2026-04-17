import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {BlockContent, Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import {urlForImage} from '@/sanity/lib/utils'
import Container from '@/app/components/ui/Container'
import {Stagger, StaggerItem} from '@/app/components/Stagger'

interface ImpactSectionProps {
  heading: string
  eyebrow?: string
  body?: BlockContent
  cta?: Cta | null
  image?: {asset?: {_ref: string}} | null
}

export default function ImpactSection({
  heading,
  eyebrow = 'Notre impact',
  body,
  cta,
  image,
}: ImpactSectionProps) {
  const imageUrl = image?.asset
    ? urlForImage(image).width(1200).height(1500).fit('crop').quality(85).url()
    : null

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: 'oklch(0.48 0.18 258)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 16px 32px -8px rgba(10,20,80,0.25)',
      }}
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          <Stagger className="flex flex-col" staggerDelay={0.1}>
            <div className="mb-8 md:mb-10 max-w-[62rem]">
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

            {body && (
              <StaggerItem>
                <div
                  className="text-base md:text-lg leading-relaxed font-body prose max-w-[58ch] prose-strong:font-medium"
                  style={{
                    color: 'oklch(0.82 0.04 255)',
                  }}
                >
                  <PortableText value={body} />
                </div>
              </StaggerItem>
            )}

            {cta && (
              <StaggerItem className="mt-10">
                <Button
                  label={cta.label}
                  href={cta.href}
                  variant={cta.style === 'secondary' ? 'secondary' : 'primary'}
                />
              </StaggerItem>
            )}
          </Stagger>

          <StaggerItem as="figure">
            {imageUrl ? (
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{background: 'oklch(0.40 0.15 258)'}}
              >
                <Image
                  src={imageUrl}
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className="aspect-[4/5] flex items-center justify-center"
                style={{background: 'oklch(0.40 0.15 258)'}}
              >
                <svg viewBox="0 0 120 120" className="w-20 h-20" style={{color: 'rgba(255,255,255,0.25)'}} fill="none">
                  <rect
                    x="10"
                    y="30"
                    width="100"
                    height="60"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="40" cy="55" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M65 90 L80 60 L100 90" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </StaggerItem>
        </div>
      </Container>
    </section>
  )
}
