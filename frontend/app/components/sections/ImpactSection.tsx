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

export default function ImpactSection({
  heading,
  body,
  cta,
  image,
}: ImpactSectionProps) {
  const imageUrl = image?.asset
    ? urlForImage(image).width(800).height(600).fit('crop').quality(80).url()
    : null

  return (
    <section className="bg-dark py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center">
          {/* Image - shows first on mobile */}
          <div className="order-first md:order-last">
            {imageUrl ? (
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                {/* Subtle overlay for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.2 0.02 260 / 0.3), transparent 60%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-800/50 aspect-[4/3] flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-24 h-24 text-gray-700" fill="none">
                  <rect x="10" y="30" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="40" cy="55" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M65 90 L80 60 L100 90" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>

          {/* Text content */}
          <div>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white tracking-tight">
              {heading}
            </h2>

            {body && (
              <div className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed font-body prose prose-invert max-w-[55ch]">
                <PortableText value={body} />
              </div>
            )}

            {cta && (
              <div className="mt-8">
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
