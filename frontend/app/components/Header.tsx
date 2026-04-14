import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import Logo from '@/app/components/Logo'
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
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="Padel Day" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 text-[var(--color-blue)]" aria-hidden />
          <span className="font-(family-name:--font-poppins) text-xl font-semibold tracking-tight text-ink">
            Padel Day
          </span>
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
