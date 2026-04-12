import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'

import {sanityFetch} from '@/sanity/lib/live'
import {pageBySlugQuery, allPageSlugsQuery} from '@/sanity/lib/queries'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: allPageSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: pageBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: page?.metaTitle || page?.title,
    description: page?.metaDescription,
  } satisfies Metadata
}

export default async function SlugPage(props: Props) {
  const params = await props.params
  const {data: page} = await sanityFetch({query: pageBySlugQuery, params})

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="font-heading text-4xl font-bold text-dark mb-8">{page.title}</h1>
        {page.body && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={page.body} />
          </div>
        )}
      </div>
    </div>
  )
}
