import Link from 'next/link'
import {getSiteSettings} from '@/sanity/lib/queries'
import {linkResolver} from '@/sanity/lib/utils'
import Container from './ui/Container'
import Logo from './Logo'

export default async function Footer() {
  const {data: settings} = await getSiteSettings()

  const footerLinks = settings?.footerLinks ?? []
  const copyrightText = settings?.copyrightText ?? `\u00A9 ${new Date().getFullYear()} Padel Day`
  const contactEmail = settings?.contactEmail
  const socialInstagram = settings?.socialInstagram
  const socialFacebook = settings?.socialFacebook
  const eyebrow = settings?.footerEyebrow ?? 'Padel Day · Terrains automatisés'
  const tagline =
    settings?.footerTagline ??
    'Des complexes de padel automatisés, pensés pour les municipalités et les clubs qui veulent ouvrir un terrain sans complexité opérationnelle.'
  const contactLabel = settings?.footerContactLabel ?? 'Contact'
  const navLabel = settings?.footerNavLabel ?? 'Navigation'
  const contactCtaLabel = settings?.footerContactCtaLabel ?? 'Nous contacter'
  const credit = settings?.footerCredit
  const creditPrefix = credit?.prefix ?? 'Made with'
  const creditSuffix = credit?.suffix ?? 'by'
  const creditName = credit?.name ?? 'Mathieu Thiry'
  const creditUrl = credit?.url ?? 'https://github.com/promathieuthiry'

  const contactHref = '/contact'

  return (
    <footer
      className="relative overflow-hidden bg-blue text-white isolate"
      aria-labelledby="footer-heading"
    >
      {/* Deep blue vignette — adds depth on the otherwise flat brand blue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, transparent 0%, transparent 55%, rgba(10,20,60,0.45) 100%)',
        }}
      />

      {/* Lime bloom — anchored bottom-right for compositional balance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -bottom-72 h-[44rem] w-[44rem] rounded-full blur-[140px] opacity-[0.12]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 65%)'}}
      />

      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>

      <Container className="relative z-10">
        {/* ── Main editorial grid ── */}
        <div className="pt-20 md:pt-28 pb-14 md:pb-20 grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-y-0">

          {/* ── Col 1 · Brand block ── */}
          <div className="col-span-12 lg:col-span-5 flex flex-col min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span aria-hidden="true" className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2 rounded-full bg-lime" />
              </span>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-lime"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                {eyebrow}
              </span>
            </div>

            {/* Logo lockup */}
            <Link
              href="/"
              aria-label="Padel Day — Accueil"
              className="group inline-flex items-center gap-3.5 self-start mb-4"
            >
              <Logo
                className="size-10 md:size-12 shrink-0 text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                aria-hidden
              />
              <span
                className="font-heading font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
                style={{fontSize: 'clamp(2rem, 3.5vw, 2.75rem)'}}
              >
                Padel Day
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-[0.925rem] leading-[1.65] text-white/75 max-w-[44ch]">
              {tagline}
            </p>
          </div>

          {/* ── Col 2 · Contact ── */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7 min-w-0">
            <h3
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-6"
              style={{fontFamily: 'var(--font-poppins), sans-serif'}}
            >
              {contactLabel}
            </h3>

            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="group block max-w-full font-heading text-[1.05rem] tracking-[-0.01em] text-white hover:text-lime transition-colors duration-200 break-words min-w-0 mb-7"
              >
                <span className="relative inline-block max-w-full break-words">
                  {contactEmail}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-white/25 group-hover:bg-lime transition-colors duration-200"
                  />
                </span>
              </a>
            )}

            {/* Social icons */}
            {(socialInstagram || socialFacebook) && (
              <div className="flex items-center gap-2.5 mb-8">
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-dark hover:bg-lime hover:border-lime transition-colors duration-200 active:scale-[0.97]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
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
                    className="group flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-dark hover:bg-lime hover:border-lime transition-colors duration-200 active:scale-[0.97]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* CTA button */}
            <Link
              href={contactHref}
              className="group relative inline-flex items-center gap-3.5 bg-lime text-dark rounded-full pl-5 pr-1.5 py-1.5 font-semibold text-[0.875rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              <span>{contactCtaLabel}</span>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 9h10" />
                  <path d="M10 4l5 5-5 5" />
                </svg>
              </span>
            </Link>
          </div>

          {/* ── Col 3 · Navigation ── */}
          {footerLinks.length > 0 && (
            <nav
              aria-label="Liens de pied de page"
              className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-10 min-w-0"
            >
              <h3
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-6"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                {navLabel}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.map((link) => {
                  const href = linkResolver(link) ?? '#'
                  return (
                    <li key={link._key} className="min-w-0">
                      <Link
                        href={href}
                        target={link.openInNewTab ? '_blank' : undefined}
                        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="group inline-flex items-center gap-2 text-[0.9rem] text-white/75 hover:text-white transition-colors duration-200"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block h-px w-3 shrink-0 bg-white/30 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-5 group-hover:bg-lime"
                        />
                        <span className="break-words">{link.title || href}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>

        {/* ── Divider with lime accent ── */}
        <div aria-hidden="true" className="relative h-px w-full bg-white/10 mb-0">
          <span className="absolute left-0 top-0 h-px w-16 bg-lime opacity-70" />
        </div>

        {/* ── Base line — copyright + credit ── */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-[11px] text-white/50 tracking-wide"
            style={{fontFamily: 'var(--font-poppins), sans-serif'}}
          >
            {copyrightText}
          </p>
          <p
            className="text-[11px] uppercase tracking-[0.16em] text-white/40"
            style={{fontFamily: 'var(--font-poppins), sans-serif'}}
          >
            {creditPrefix}{' '}
            <span aria-hidden="true" className="heart-beat">
              ❤️
            </span>
            <span className="sr-only">love</span> {creditSuffix}{' '}
            <a
              href={creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-lime transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {creditName}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
