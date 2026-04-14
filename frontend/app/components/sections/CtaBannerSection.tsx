import Link from 'next/link'
import type {Cta} from '@/sanity.types'
import Container from '@/app/components/ui/Container'

interface CtaBannerSectionProps {
  heading: string
  primaryCta?: Cta | null
  secondaryCta?: Cta | null
}

export default function CtaBannerSection({
  heading,
  primaryCta,
  secondaryCta,
}: CtaBannerSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-dark text-white isolate"
      aria-labelledby="cta-banner-heading"
    >
      {/* Court tramlines — evokes a padel court painted on the floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(33.33% - 0.5px), #fff calc(33.33% - 0.5px), #fff calc(33.33% + 0.5px), transparent calc(33.33% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(66.66% - 0.5px), #fff calc(66.66% - 0.5px), #fff calc(66.66% + 0.5px), transparent calc(66.66% + 0.5px))',
        }}
      />

      {/* Lime bloom — atmospheric glow anchoring the CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[56rem] w-[56rem] rounded-full blur-[140px] opacity-[0.22]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 65%)'}}
      />

      {/* Oversized backdrop wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-0.18em] flex justify-center overflow-hidden select-none"
      >
        <span
          className="font-display font-bold leading-none tracking-[-0.04em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(10rem, 28vw, 26rem)',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            color: 'transparent',
          }}
        >
          padel.
        </span>
      </div>

      <Container className="relative z-10">
        <div className="py-28 md:py-36 lg:py-44 grid grid-cols-12 gap-x-6 gap-y-14 items-end">
          {/* Eyebrow + heading */}
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <span aria-hidden="true" className="relative inline-flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2.5 rounded-full bg-lime" />
              </span>
              <span
                className="text-xs font-medium uppercase tracking-[0.18em] text-lime"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                Prêt à jouer ?
              </span>
            </div>

            <h2
              id="cta-banner-heading"
              className="font-display font-bold leading-[0.92] tracking-[-0.035em] text-balance text-white"
              style={{fontSize: 'clamp(2.75rem, 7vw, 6rem)'}}
            >
              {heading}
              <span aria-hidden="true" className="inline-block ml-[0.08em] translate-y-[-0.05em]">
                <span className="inline-block h-[0.18em] w-[0.5em] bg-lime rounded-[2px] align-middle" />
              </span>
            </h2>
          </div>

          {/* CTA cluster */}
          {(primaryCta || secondaryCta) && (
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 lg:items-end">
              {primaryCta && (
                <Link
                  href={primaryCta.href || '#'}
                  className="group relative inline-flex items-center gap-4 self-start lg:self-end bg-lime text-dark rounded-full pl-7 pr-2 py-2 font-semibold text-base whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                >
                  <span>{primaryCta.label}</span>
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                  >
                    <svg
                      width="18"
                      height="18"
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
              )}

              {secondaryCta && (
                <Link
                  href={secondaryCta.href || '#'}
                  className="group inline-flex items-center gap-2 self-start lg:self-end text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide"
                >
                  <span className="relative">
                    {secondaryCta.label}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-1 h-px bg-white/40 origin-right scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:origin-left group-hover:scale-x-100"
                    />
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    <path d="M3 11L11 3" />
                    <path d="M5 3h6v6" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Bottom hairline echoing the site's existing border language */}
        <div aria-hidden="true" className="border-t border-white/10" />
      </Container>
    </section>
  )
}
