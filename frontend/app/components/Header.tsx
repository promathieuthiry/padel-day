import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import Logo from '@/app/components/Logo'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import MobileNav from '@/app/components/MobileNav'
import Container from '@/app/components/ui/Container'

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
    <header className="fixed z-50 inset-x-0 top-0 h-16 bg-blue/92 backdrop-blur-lg border-b border-white/10 text-white isolate">
      <Container className="relative flex h-full items-center justify-between">
        <Link href="/" aria-label="Padel Day — Accueil" className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="relative inline-flex size-9 shrink-0 items-center justify-center text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-6"
          >
            <Logo className="h-10 w-10 text-lime" aria-hidden />
          </span>
          <span className="font-heading text-2xl font-semibold uppercase tracking-[-0.02em] text-white">
            Padel Day
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {resolvedLinks.map((link, index: number) => {
              const isLast = index === resolvedLinks.length - 1

              if (isLast) {
                return (
                  <li key={link._key}>
                    <Link
                      href={link.href}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="group relative inline-flex items-center gap-2 bg-lime text-dark rounded-full pl-4 pr-1 py-1 font-semibold text-[0.8rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    >
                      <span>{link.title}</span>
                      <span
                        aria-hidden="true"
                        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 18 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 9h10" />
                          <path d="M10 4l5 5-5 5" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                )
              }

              return (
                <li key={link._key}>
                  <Link
                    href={link.href}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2 text-white/85 transition-colors duration-200 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-0 bg-lime transition-[width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-4"
                    />
                    <span>{link.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <MobileNav navLinks={mobileLinks} />
      </Container>
    </header>
  )
}
