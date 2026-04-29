import {cache} from 'react'
import {defineQuery} from 'next-sanity'
import {sanityFetch} from '@/sanity/lib/live'

export const siteSettingsQuery = defineQuery(`*[_type == "settings"][0]{
  ...,
  navLinks[]{
    ...,
    page->{_id, _type, "slug": slug.current}
  },
  footerLinks[]{
    ...,
    page->{_id, _type, "slug": slug.current}
  }
}`)

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]`)

export const faqItemsQuery = defineQuery(`*[_type == "faqItem"] | order(order asc)`)

export const installerPageQuery = defineQuery(`*[_type == "installerPage"][0]`)

export const notreSitePageQuery = defineQuery(`*[_type == "notreSitePage"][0]`)

export const aProposPageQuery = defineQuery(`*[_type == "aProposPage"][0]`)

export const teamMembersQuery = defineQuery(`*[_type == "teamMember"] | order(order asc)`)

export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]`)

export const pageBySlugQuery = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    eyebrow,
    subtitle,
    heroImage{..., asset->{_id, url, metadata{lqip, dimensions}}},
    metaTitle,
    metaDescription,
    body
  }`,
)

export const allPageSlugsQuery = defineQuery(
  `*[_type == "page" && defined(slug.current)]{"slug": slug.current}`,
)

export const sitemapDataQuery = defineQuery(
  `*[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
)

export const getSiteSettings = cache(() => sanityFetch({query: siteSettingsQuery}))
