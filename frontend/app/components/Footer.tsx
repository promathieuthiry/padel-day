import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {siteSettingsQuery} from '@/sanity/lib/queries'
import Container from './ui/Container'
import FooterWordmark from './FooterWordmark'

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

  const contactHref = contactEmail ? `mailto:${contactEmail}` : '#contact'

  return (
    <footer
      className="relative overflow-hidden bg-blue text-white isolate"
      aria-labelledby="footer-heading"
    >
      {/* Court tramlines — echoes CtaBannerSection (softened for blue ground) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        }}
      />

      {/* Deep blue vignette — adds depth on the otherwise flat brand blue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, transparent 0%, transparent 55%, rgba(10,20,60,0.45) 100%)',
        }}
      />

      {/* Lime bloom — anchored bottom-left. Lower opacity: lime on blue is already vivid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 -bottom-80 h-[50rem] w-[50rem] rounded-full blur-[160px] opacity-[0.14]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 65%)'}}
      />

      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>

      <Container className="relative z-10">
        {/* Top editorial band */}
        <div className="pt-24 md:pt-32 pb-16 md:pb-20 grid grid-cols-12 gap-x-6 gap-y-14">
          {/* Brand block */}
          <div className="col-span-12 lg:col-span-5 min-w-0">
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
              aria-label="Padel Day — Accueil"
              className="group inline-flex items-center gap-4"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex size-14 md:size-16 shrink-0 items-center justify-center rounded-full bg-lime ring-1 ring-lime text-dark"
              >
                <Image
                  src="/logo_padel_day.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-8 md:size-10"
                  style={{filter: 'none'}}
                />
              </span>
              <span
                className="font-display font-bold leading-[0.9] tracking-[-0.035em] text-white"
                style={{fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)'}}
              >
                Padel Day
              </span>
            </Link>

            <p className="mt-6 block w-full max-w-[42ch] text-[0.95rem] leading-relaxed text-white/80">
              Des complexes de padel automatisés, pensés pour les municipalités et les clubs qui
              veulent ouvrir un terrain sans complexité opérationnelle.
            </p>
          </div>

          {/* Contact column */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7 min-w-0">
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 mb-5"
              style={{fontFamily: 'var(--font-poppins), sans-serif'}}
            >
              Contact
            </h3>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="group block max-w-full font-display text-base md:text-lg tracking-[-0.015em] text-white hover:text-lime transition-colors duration-200 break-words min-w-0"
              >
                <span className="relative inline-block max-w-full break-words">
                  {contactEmail}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-white/30 group-hover:bg-lime transition-colors duration-200"
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
                    className="group flex size-11 items-center justify-center rounded-full border border-white/20 text-white/85 hover:text-dark hover:bg-lime hover:border-lime transition-colors duration-200 active:scale-[0.97]"
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
                    className="group flex size-11 items-center justify-center rounded-full border border-white/20 text-white/85 hover:text-dark hover:bg-lime hover:border-lime transition-colors duration-200 active:scale-[0.97]"
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
            {/* Contact CTA */}
            <Link
              href={contactHref}
              className="group relative mt-8 inline-flex items-center gap-4 bg-lime text-dark rounded-full pl-6 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              <span>Nous contacter</span>
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
              >
                <svg
                  width="16"
                  height="16"
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
          </div>

          {/* Nav column */}
          {footerLinks.length > 0 && (
            <nav
              aria-label="Liens de pied de page"
              className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-10 min-w-0"
            >
              <h3
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 mb-5"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                Navigation
              </h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.map((link: any, index: number) => (
                  <li key={index} className="min-w-0">
                    <Link
                      href={resolveHref(link)}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2 text-[0.95rem] text-white/85 hover:text-white transition-colors duration-200"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-px w-3 shrink-0 bg-white/35 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-6 group-hover:bg-lime"
                      />
                      <span className="break-words">{link.title || resolveHref(link)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Oversized wordmark — scroll-driven left→right lime fill */}
        <FooterWordmark />

        {/* Base line — copyright + meta */}
        <div className="border-t border-white/15 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/60 tracking-wide">{copyrightText}</p>
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-white/50"
            style={{fontFamily: 'var(--font-poppins), sans-serif'}}
          >
            Made with{' '}
            <span aria-hidden="true" className="heart-beat">
              ❤️
            </span>
            <span className="sr-only">love</span> by{' '}
            <a
              href="https://github.com/promathieuthiry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-lime transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Mathieu Thiry
            </a>{' '}
          </p>
        </div>
      </Container>
    </footer>
  )
}
