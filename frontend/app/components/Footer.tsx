import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import Container from '@/app/components/ui/Container'

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: siteSettingsQuery,
  })

  const footerLinks = settings?.footerLinks ?? []
  const copyrightText = settings?.copyrightText ?? `\u00A9 ${new Date().getFullYear()} Padel Day`
  const contactEmail = settings?.contactEmail
  const socialInstagram = settings?.socialInstagram
  const socialFacebook = settings?.socialFacebook

  return (
    <footer className="bg-dark text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="font-heading text-xl font-semibold">
              Padel Day
            </Link>
            {contactEmail && (
              <p className="mt-4 text-sm text-gray-400">
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                  {contactEmail}
                </a>
              </p>
            )}
            {/* Social links */}
            <div className="mt-4 flex gap-4">
              {socialInstagram && (
                <a
                  href={socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}
              {socialFacebook && (
                <a
                  href={socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Footer links */}
          <div className="md:col-span-2">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-400">
              {footerLinks.map((link: any, index: number) => {
                const href =
                  link.linkType === 'href'
                    ? link.href
                    : link.linkType === 'page' && link.page
                      ? `/${link.page}`
                      : '#'

                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {link.title || href}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          {copyrightText}
        </div>
      </Container>
    </footer>
  )
}
