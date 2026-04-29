import Container from '@/app/components/ui/Container'
import SectionCta from '@/app/components/ui/SectionCta'

type BannerCta = {label?: string; href?: string}

interface CtaBannerSectionProps {
  heading: string
  eyebrow?: string
  primaryCta?: BannerCta | null
  secondaryCta?: BannerCta | null
}

export default function CtaBannerSection({
  heading,
  eyebrow = 'Prêt à jouer ?',
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
                {eyebrow}
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
              {primaryCta && primaryCta.label && (
                <SectionCta
                  label={primaryCta.label}
                  href={primaryCta.href || '#'}
                  className="lg:self-end"
                />
              )}

              {secondaryCta && secondaryCta.label && (
                <SectionCta
                  variant="secondary"
                  label={secondaryCta.label}
                  href={secondaryCta.href || '#'}
                  className="lg:self-end"
                />
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
