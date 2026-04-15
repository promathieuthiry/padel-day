import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {BlockContent, Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import {urlForImage} from '@/sanity/lib/utils'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'
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
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          <Stagger className="flex flex-col" staggerDelay={0.1}>
            <SectionIntro eyebrow={eyebrow} heading={heading} className="mb-8 md:mb-10" />

            {body && (
              <StaggerItem>
                <div className="text-base md:text-lg text-ink-muted leading-relaxed font-body prose max-w-[58ch] prose-strong:text-ink prose-strong:font-medium">
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
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-3">
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
              <div className="aspect-[4/5] bg-surface-2 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-20 h-20 text-ink-faint" fill="none">
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
