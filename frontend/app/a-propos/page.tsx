import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import {sanityFetch} from '@/sanity/lib/live'
import {aProposPageQuery, teamMembersQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'

import FadeIn from '@/app/components/FadeIn'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: aProposPageQuery, stega: false})
  return {
    title: page?.metaTitle || 'A propos',
    description: page?.metaDescription || "Decouvrez l'equipe et la mission de Padel Day.",
  }
}

export default async function AProposPage() {
  const [{data: page}, {data: teamMembers}] = await Promise.all([
    sanityFetch({query: aProposPageQuery}),
    sanityFetch({query: teamMembersQuery, stega: false}),
  ])

  const founder = teamMembers?.[0]
  const founderPhoto = founder?.photo?.asset
    ? urlForImage(founder.photo).width(900).height(1125).fit('crop').quality(88).url()
    : null

  const storyImageUrl = page?.storyImage?.asset
    ? urlForImage(page.storyImage).width(1200).height(1500).fit('crop').quality(88).url()
    : null

  const missionCards = page?.missionCards ?? []

  return (
    <>
      {/* HERO — editorial aurora, story lede */}
      <section
        className="relative overflow-hidden bg-surface isolate"
        aria-labelledby="a-propos-heading"
      >
        <div aria-hidden="true" className="hero-aurora-layer">
          <div className="hero-aurora-blob hero-aurora-blob--a" />
          <div className="hero-aurora-blob hero-aurora-blob--b" />
          <div className="hero-aurora-blob hero-aurora-blob--c" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), var(--color-blue) calc(50% - 0.5px), var(--color-blue) calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(50% - 0.5px), var(--color-blue) calc(50% - 0.5px), var(--color-blue) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full blur-[150px] opacity-[0.20]"
          style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
        />

        <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32">
          <div className="grid grid-cols-12 gap-x-6 gap-y-14 items-center">
            <div className="col-span-12 lg:col-span-7">
              <FadeIn>
                <p className="eyebrow mb-8 flex items-center gap-3">
                  <span aria-hidden="true" className="relative inline-flex size-2.5">
                    <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                    <span className="relative inline-block size-2.5 rounded-full bg-lime" />
                  </span>
                  <span>À propos · Notre histoire</span>
                  <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  id="a-propos-heading"
                  className="font-display font-bold text-ink leading-[0.94] tracking-[-0.035em] text-balance"
                  style={{fontSize: 'clamp(2.5rem, 6.8vw, 5.75rem)'}}
                >
                  {page?.storyHeading || 'Notre histoire'}
                </h1>
              </FadeIn>

              {page?.storyBody && (
                <FadeIn delay={0.2}>
                  <div className="mt-8 md:mt-10 font-body text-ink text-lg md:text-xl leading-[1.55] max-w-[58ch] [&_p]:mt-5 [&_p:first-child]:mt-0 [&_p:first-child]:text-xl [&_p:first-child]:md:text-2xl [&_p:first-child]:leading-[1.4] [&_p:first-child]:text-ink [&_p:first-child]:font-display [&_p:first-child]:font-medium [&_p:first-child]:tracking-[-0.01em] [&_p:not(:first-child)]:text-ink-muted [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-ink [&_strong]:font-semibold">
                    <PortableText value={page.storyBody} />
                  </div>
                </FadeIn>
              )}
            </div>

            <div className="col-span-12 lg:col-span-5">
              <FadeIn delay={0.15} direction="right">
                <div className="relative aspect-[4/5] w-full">
                  <div className="absolute inset-0 rounded-[28px] overflow-hidden bg-blue ring-1 ring-dark/10 shadow-[0_30px_60px_-25px_rgba(10,20,60,0.45)]">
                    {storyImageUrl ? (
                      <Image
                        src={storyImageUrl}
                        alt={page?.storyImage?.alt || ''}
                        fill
                        priority
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover object-center"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(160deg, var(--color-blue) 0%, oklch(0.35 0.13 258) 100%)',
                        }}
                      />
                    )}

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full opacity-[0.5] mix-blend-screen"
                    >
                      <g
                        fill="none"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="0.25"
                        vectorEffect="non-scaling-stroke"
                      >
                        <rect x="6" y="6" width="88" height="88" />
                        <line x1="12" y1="6" x2="12" y2="94" />
                        <line x1="88" y1="6" x2="88" y2="94" />
                        <line x1="6" y1="50" x2="94" y2="50" strokeWidth="0.4" />
                        <line x1="6" y1="22" x2="94" y2="22" strokeDasharray="1 1.5" />
                        <line x1="6" y1="78" x2="94" y2="78" strokeDasharray="1 1.5" />
                      </g>
                    </svg>

                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(120% 80% at 50% 30%, transparent 0%, transparent 55%, rgba(10,20,60,0.45) 100%)',
                      }}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 flex size-12 sm:size-14 items-center justify-center rounded-full bg-lime ring-4 ring-surface text-dark"
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
                      <path d="M3 9.5l4 4 8-9" />
                    </svg>
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-hairline" />
      </section>

      {/* FOUNDER — single portrait, editorial treatment */}
      {founder && (
        <section
          className="relative bg-surface-2 border-b border-hairline py-24 md:py-32 overflow-hidden"
          aria-labelledby="founder-heading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full blur-[140px] opacity-[0.12]"
            style={{background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 60%)'}}
          />

          <Container className="relative">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:items-center">
              {/* Header: mobile 1st, desktop top-right */}
              <div className="md:col-span-7 md:col-start-6 md:row-start-1 md:pl-8 lg:pl-14">
                <FadeIn delay={0.1}>
                  <p className="eyebrow mb-6 flex items-center gap-3">
                    <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                    <span>{page?.teamHeading || 'Le fondateur'}</span>
                  </p>

                  <h2
                    id="founder-heading"
                    className="font-display font-bold text-ink leading-[0.98] tracking-[-0.03em] text-balance"
                    style={{fontSize: 'clamp(2rem, 4.8vw, 3.75rem)'}}
                  >
                    {founder.name}
                  </h2>

                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-dark text-lime px-4 py-1.5 font-body font-semibold text-sm md:text-base tracking-tight">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-lime" />
                    {founder.role}
                  </p>
                </FadeIn>
              </div>

              {/* Image: mobile middle, desktop full-left spanning both rows */}
              <div className="md:col-span-5 md:col-start-1 md:row-start-1 md:row-span-2 flex justify-center">
                <div className="relative aspect-square w-full max-w-[20rem] md:max-w-none">
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-dark ring-1 ring-dark/10 shadow-[0_30px_60px_-25px_rgba(10,20,60,0.45)]">
                    {founderPhoto ? (
                      <Image
                        src={founderPhoto}
                        alt={founder.name}
                        fill
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-7xl font-semibold text-lime/60">
                          {founder.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio: mobile last, desktop bottom-right */}
              {founder.bio && (
                <div className="md:col-span-7 md:col-start-6 md:row-start-2 md:pl-8 lg:pl-14">
                  <FadeIn delay={0.15}>
                    <p className="font-body text-ink-muted text-base md:text-lg leading-[1.65] max-w-[60ch]">
                      {founder.bio}
                    </p>
                  </FadeIn>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* MISSION — editorial numbered callouts */}
      {missionCards.length > 0 && (
        <section className="relative bg-surface border-b border-hairline py-24 md:py-32">
          <Container>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
              <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24">
                <FadeIn>
                  <SectionIntro
                    eyebrow="Notre mission"
                    heading={page?.missionHeading || 'Ce qui nous guide.'}
                    body="Les principes qui orientent chacune de nos décisions, de la conception du terrain à l'expérience joueur."
                  />
                </FadeIn>
              </div>

              <div className="col-span-12 lg:col-span-8">
                <ol className="border-t border-hairline">
                  {missionCards.map((card, i) => (
                    <FadeIn key={card._key} delay={i * 0.05}>
                      <li className="group grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-8 md:py-10 border-b border-hairline transition-colors hover:bg-surface-2/60">
                        <div className="col-span-12 sm:col-span-2">
                          <span
                            aria-hidden="true"
                            className="font-display text-lime font-semibold tabular-nums"
                            style={{fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)'}}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="col-span-12 sm:col-span-10">
                          <h3
                            className="font-display font-semibold text-ink tracking-tight leading-[1.2]"
                            style={{fontSize: 'clamp(1.25rem, 2vw, 1.75rem)'}}
                          >
                            {card.title}
                          </h3>
                          {card.body && (
                            <p className="mt-3 font-body text-ink-muted text-base md:text-[1.05rem] leading-[1.6] max-w-[52ch]">
                              {card.body}
                            </p>
                          )}
                        </div>
                      </li>
                    </FadeIn>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA — B2B close */}
      <section className="relative bg-dark overflow-hidden isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] w-[50rem] rounded-full blur-[180px] opacity-[0.28]"
            style={{
              background:
                'radial-gradient(circle, var(--color-lime) 0%, var(--color-blue) 45%, transparent 70%)',
            }}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), rgba(255,255,255,0.9) calc(50% - 0.5px), rgba(255,255,255,0.9) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
          }}
        />

        <Container className="relative z-10 py-24 md:py-36">
          <FadeIn>
            <p className="eyebrow text-lime/90 mb-8 flex items-center gap-3">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-lime/40" />
              <span>Travaillons ensemble</span>
            </p>
            <h2
              className="font-display font-semibold text-white leading-[0.98] tracking-[-0.035em] text-balance max-w-[20ch]"
              style={{fontSize: 'clamp(2rem, 5.4vw, 4.25rem)'}}
            >
              Un projet de terrain dans votre commune&nbsp;?
            </h2>
            <p className="mt-8 md:mt-10 text-base md:text-lg text-white/70 leading-[1.6] font-body max-w-[64ch]">
              Collectivités, clubs, promoteurs : parlons de votre projet. Nous accompagnons
              l&apos;étude, l&apos;installation et l&apos;exploitation de votre terrain de padel.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-12 md:mt-14 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-8">
              <Link
                href="/installer-un-terrain"
                className="group relative inline-flex items-center gap-3 self-start bg-lime text-dark rounded-full pl-7 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                <span>Installer un terrain</span>
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
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
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 self-start text-white/85 font-semibold text-[0.95rem] py-2 transition-colors duration-200 hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime rounded-sm"
              >
                <span className="relative">
                  Nous contacter
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-1 h-px bg-current"
                  />
                </span>
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                >
                  <path d="M4 9h10" />
                  <path d="M10 4l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
