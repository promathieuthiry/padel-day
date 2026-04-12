import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapDataQuery} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data: pages} = await sanityFetch({query: sitemapDataQuery})
  const headersList = await headers()
  const domain = headersList.get('host') || 'localhost:3000'
  const protocol = domain.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${domain}`

  const staticRoutes: MetadataRoute.Sitemap = [
    {url: baseUrl, lastModified: new Date(), priority: 1, changeFrequency: 'monthly'},
    {url: `${baseUrl}/installer-un-terrain`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly'},
    {url: `${baseUrl}/notre-site`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly'},
    {url: `${baseUrl}/a-propos`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly'},
    {url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly'},
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = (pages || []).map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...dynamicRoutes]
}
