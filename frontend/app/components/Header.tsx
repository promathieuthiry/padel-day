import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import Button from '@/app/components/Button'
import MobileNav from '@/app/components/MobileNav'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: siteSettingsQuery,
  })

  const rawNavLinks = settings?.navLinks ?? []

  const resolvedLinks = rawNavLinks.map(
    (link: {
      _key: string
      linkType?: string
      href?: string
      page?: unknown
      title?: string
      openInNewTab?: boolean
    }) => {
      const pageSlug = typeof link.page === 'string' ? link.page : null
      const href =
        link.linkType === 'href'
          ? link.href || '#'
          : link.linkType === 'page' && pageSlug
            ? `/${pageSlug}`
            : '#'
      return {
        _key: link._key,
        title: link.title || href,
        href,
        openInNewTab: link.openInNewTab,
      }
    },
  )

  const mobileLinks = resolvedLinks.map((link) => ({
    label: link.title,
    href: link.href,
  }))

  return (
    <header className="fixed z-50 inset-x-0 top-0 h-16 bg-surface/85 backdrop-blur-lg border-b border-hairline">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" aria-label="Padel Day" className="flex h-full items-center gap-2">
          <Image
            src="/logo_padel_day.svg"
            alt=""
            width={64}
            height={64}
            priority
            className="h-full w-auto"
          />
          <span className="font-display text-xl font-semibold tracking-tight">Padel Day</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {resolvedLinks.map((link, index: number) => {
              const href = link.href
              const isLast = index === resolvedLinks.length - 1

              if (isLast) {
                return (
                  <li key={link._key}>
                    <Button
                      label={link.title}
                      href={href}
                      variant="primary"
                      className="text-xs px-4 py-2"
                    />
                  </li>
                )
              }

              return (
                <li key={link._key}>
                  <Link
                    href={href}
                    className="text-ink-muted transition-colors hover:text-ink"
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <MobileNav navLinks={mobileLinks} />
      </div>
    </header>
  )
}
