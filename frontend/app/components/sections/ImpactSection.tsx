import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {BlockContent, Cta} from '@/sanity.types'
import Button from '@/app/components/Button'
import {urlForImage} from '@/sanity/lib/utils'

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
    <section className="bg-surface-2 py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-0 items-center">
          <div className="col-span-12 md:col-span-5 md:col-start-1">
            {imageUrl ? (
              <figure className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  loading="lazy"
                />
              </figure>
            ) : (
              <div className="aspect-[4/5] bg-surface-3 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-20 h-20 text-ink-faint" fill="none">
                  <rect x="10" y="30" width="100" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="40" cy="55" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M65 90 L80 60 L100 90" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-4">Notre impact</p>
            <h2
              className="font-heading font-semibold text-ink tracking-tight leading-[1.05]"
              style={{fontSize: 'clamp(2rem, 4vw, 3.25rem)'}}
            >
              {heading}
            </h2>

            {body && (
              <div className="mt-8 text-base md:text-lg text-ink-muted leading-relaxed font-body prose max-w-[52ch] prose-strong:text-ink prose-strong:font-medium">
                <PortableText value={body} />
              </div>
            )}

            {cta && (
              <div className="mt-10">
                <Button
                  label={cta.label}
                  href={cta.href}
                  variant={cta.style === 'secondary' ? 'secondary' : 'primary'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
