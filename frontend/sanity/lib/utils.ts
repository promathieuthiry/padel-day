import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

export function resolveOpenGraphImage(
  image?: SanityImageSource | null,
  width = 1200,
  height = 627,
) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: (image as {alt?: string})?.alt || '', width, height}
}

const SINGLETON_PAGE_HREFS: Record<string, string> = {
  homePage: '/',
  installerPage: '/installer-un-terrain',
  notreSitePage: '/notre-site',
  aProposPage: '/a-propos',
  contactPage: '/contact',
}

type ResolvableLinkPage =
  | string
  | {
      _type?: string
      slug?: string | {current?: string} | null
    }
  | null

export function pageHref(page: ResolvableLinkPage): string | null {
  if (!page) return null
  if (typeof page === 'string') return `/${page}`

  if (page._type && SINGLETON_PAGE_HREFS[page._type]) {
    return SINGLETON_PAGE_HREFS[page._type]
  }

  const slug = typeof page.slug === 'string' ? page.slug : (page.slug?.current ?? null)
  return slug ? `/${slug}` : null
}

export function linkResolver(
  link:
    | {
        linkType?: string
        href?: string
        page?: ResolvableLinkPage
      }
    | undefined,
): string | null {
  if (!link) return null

  const effectiveLinkType = link.linkType ?? (link.href ? 'href' : 'page')

  switch (effectiveLinkType) {
    case 'href':
      return link.href || null
    case 'page':
      return pageHref(link.page ?? null)
    default:
      return null
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
