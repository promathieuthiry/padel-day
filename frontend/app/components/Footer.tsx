import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {siteSettingsQuery} from '@/sanity/lib/queries'

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: siteSettingsQuery,
  })

  const footerLinks = settings?.footerLinks ?? []
  const copyrightText = settings?.copyrightText ?? `\u00A9 ${new Date().getFullYear()} Padel Day`
  const contactEmail = settings?.contactEmail
  const socialInstagram = settings?.socialInstagram
  const socialFacebook = settings?.socialFacebook

  const resolveHref = (link: any) =>
    link.linkType === 'href'
      ? link.href || '#'
      : link.linkType === 'page' && link.page
        ? `/${link.page}`
        : '#'

  return (
    <footer
      className="relative overflow-hidden bg-dark text-white isolate"
      aria-labelledby="footer-heading"
    >
      {/* Court tramlines — echoes CtaBannerSection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        }}
      />

      {/* Lime bloom — anchored bottom-left, opposite to CtaBanner's right-side bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 -bottom-80 h-[50rem] w-[50rem] rounded-full blur-[160px] opacity-[0.18]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 65%)'}}
      />

      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
        {/* Top editorial band */}
        <div className="pt-24 md:pt-32 pb-16 md:pb-20 grid grid-cols-12 gap-x-6 gap-y-14">
          {/* Brand block */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden="true" className="relative inline-flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2.5 rounded-full bg-lime" />
              </span>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-lime"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                Padel Day · Automated courts
              </span>
            </div>

            <Link
              href="/"
              className="inline-block font-display font-bold leading-[0.9] tracking-[-0.035em] text-white"
              style={{fontSize: 'clamp(3rem, 6vw, 5rem)'}}
            >
              Padel<span className="text-lime">.</span>Day
            </Link>

            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/65 text-balance">
              Des complexes de padel automatisés, pensés pour les municipalités et les clubs qui
              veulent ouvrir un terrain sans complexité opérationnelle.
            </p>
          </div>

          {/* Contact column */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7">
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 mb-5"
              style={{fontFamily: 'var(--font-poppins), sans-serif'}}
            >
              Contact
            </h3>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-baseline gap-2 font-display text-xl md:text-2xl tracking-[-0.02em] text-white hover:text-lime transition-colors duration-200"
              >
                <span className="relative">
                  {contactEmail}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-white/20 group-hover:bg-lime/60 transition-colors duration-200"
                  />
                </span>
              </a>
            )}

            {(socialInstagram || socialFacebook) && (
              <div className="mt-8 flex items-center gap-3">
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-dark hover:bg-lime hover:border-lime transition-colors duration-200 active:scale-[0.97]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
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
                    className="group flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-dark hover:bg-lime hover:border-lime transition-colors duration-200 active:scale-[0.97]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Nav column */}
          {footerLinks.length > 0 && (
            <nav
              aria-label="Liens de pied de page"
              className="col-span-12 sm:col-span-6 lg:col-span-2 lg:col-start-10"
            >
              <h3
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 mb-5"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                Navigation
              </h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.map((link: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={resolveHref(link)}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2 text-[0.95rem] text-white/75 hover:text-white transition-colors duration-200"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-px w-3 bg-white/25 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-6 group-hover:bg-lime"
                      />
                      <span>{link.title || resolveHref(link)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Oversized wordmark — closing statement */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative mt-4 md:mt-10 select-none overflow-hidden"
        >
          <span
            className="font-display font-bold leading-[0.85] tracking-[-0.045em] whitespace-nowrap block"
            style={{
              fontSize: 'clamp(5rem, 19vw, 18rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              color: 'transparent',
            }}
          >
            padel.day
          </span>
        </div>

        {/* Base line — copyright + meta */}
        <div className="border-t border-white/10 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/45 tracking-wide">{copyrightText}</p>
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-white/35"
            style={{fontFamily: 'var(--font-poppins), sans-serif'}}
          >
            Conçu en France · Jouez partout
          </p>
        </div>
      </div>
    </footer>
  )
}
