import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {sanityFetch} from '@/sanity/lib/live'
import {notreSitePageQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'

import FadeIn from '@/app/components/FadeIn'
import StatusBadge from '@/app/components/StatusBadge'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: notreSitePageQuery, stega: false})
  return {
    title: page?.metaTitle || 'Notre site',
    description: page?.metaDescription || 'Decouvrez notre terrain de padel.',
  }
}

export default async function NotreSitePage() {
  const {data: page} = await sanityFetch({query: notreSitePageQuery})

  if (!page) {
    notFound()
  }

  const courtImageUrl = page.courtImage?.asset
    ? urlForImage(page.courtImage).width(1200).height(700).fit('crop').quality(80).url()
    : null

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-white tracking-tight max-w-3xl">
              {page.heading || 'Notre site'}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Court image with StatusBadge */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden">
              {courtImageUrl ? (
                <Image
                  src={courtImageUrl}
                  alt={page.heading || 'Terrain de padel'}
                  className="w-full aspect-[16/9] object-cover"
                  priority
                  width={1200}
                  height={700}
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center">
                  <svg viewBox="0 0 200 120" className="w-40 h-24 text-gray-300" fill="none">
                    <rect x="20" y="20" width="160" height="80" rx="4" stroke="currentColor" strokeWidth="2" />
                    <line x1="100" y1="20" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                </div>
              )}

              {/* Status badge overlay */}
              {page.status && page.statusLabel && (
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <StatusBadge status={page.status} label={page.statusLabel} />
                </div>
              )}
            </div>
          </FadeIn>

          {/* Location */}
          {page.locationLabel && (
            <FadeIn delay={0.1}>
              <div className="mt-6 flex items-center gap-2 text-gray-500">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
                  <path d="M10 2 C6 2 3 5 3 9 C3 14 10 18 10 18 C10 18 17 14 17 9 C17 5 14 2 10 2Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="10" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-body">{page.locationLabel}</span>
              </div>
            </FadeIn>
          )}

          {/* Features grid */}
          {page.features && page.features.length > 0 && (
            <FadeIn delay={0.15}>
              <div className="mt-12">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {page.features.map((feature) => (
                    <div
                      key={feature._key}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gray-50"
                    >
                      <div className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
                      <span className="text-sm font-medium text-dark font-body">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Description */}
          {page.description && (
            <FadeIn delay={0.2}>
              <div className="mt-12 text-base md:text-lg text-gray-600 leading-relaxed font-body prose prose-gray max-w-[65ch]">
                <PortableText value={page.description} />
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  )
}
