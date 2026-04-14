import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {BlockContent, Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import {urlForImage} from '@/sanity/lib/utils'
import Container from '@/app/components/ui/Container'
import {Stagger, StaggerItem} from '@/app/components/Stagger'

interface ImpactSectionProps {
  heading: string
  body?: BlockContent
  cta?: Cta | null
  image?: {asset?: {_ref: string}} | null
}

export default function ImpactSection({heading, body, cta, image}: ImpactSectionProps) {
  const imageUrl = image?.asset
    ? urlForImage(image).width(1200).height(1500).fit('crop').quality(85).url()
    : null

  return (
    <section className="bg-surface py-24 md:py-36">
      <Container>
        <div className="flex items-baseline justify-between border-t border-hairline pt-6 mb-16 md:mb-20">
          <p className="eyebrow">Notre impact</p>
          <span
            className="font-heading text-ink-faint tabular-nums text-sm"
            aria-hidden="true"
          >
            — II
          </span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-0 items-end">
          <figure className="col-span-12 md:col-span-5 md:col-start-1">
            {imageUrl ? (
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-3">
                <Image
                  src={imageUrl}
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-[4/5] bg-surface-2 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-20 h-20 text-ink-faint" fill="none">
                  <rect x="10" y="30" width="100" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="40" cy="55" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M65 90 L80 60 L100 90" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
            <figcaption className="mt-4 flex items-baseline justify-between border-t border-hairline pt-3 text-xs text-ink-faint font-heading tabular-nums">
              <span>Padel Day — terrain en service</span>
              <span aria-hidden="true">01</span>
            </figcaption>
          </figure>

          <Stagger
            className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col"
            staggerDelay={0.1}
          >
            <StaggerItem as="h2">
              <span
                className="block font-heading font-semibold text-ink tracking-tight leading-[1.02] max-w-[18ch]"
                style={{fontSize: 'clamp(2.25rem, 4.6vw, 3.75rem)'}}
              >
                {heading}
              </span>
            </StaggerItem>

            {body && (
              <StaggerItem className="mt-10 border-t border-hairline pt-8">
                <div className="text-base md:text-lg text-ink-muted leading-relaxed font-body prose max-w-[58ch] prose-strong:text-ink prose-strong:font-medium">
                  <PortableText value={body} />
                </div>
              </StaggerItem>
            )}

            {cta && (
              <StaggerItem className="mt-12">
                <Button
                  label={cta.label}
                  href={cta.href}
                  variant={cta.style === 'secondary' ? 'secondary' : 'primary'}
                />
              </StaggerItem>
            )}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
