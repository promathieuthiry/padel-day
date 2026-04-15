import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText, type PortableTextComponents} from '@portabletext/react'

import {sanityFetch} from '@/sanity/lib/live'
import {pageBySlugQuery, allPageSlugsQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'

import FadeIn from '@/app/components/FadeIn'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: allPageSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: pageBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: page?.metaTitle || page?.title,
    description: page?.metaDescription,
  } satisfies Metadata
}

// Editorial prose serializers — headings, lists, blockquote tuned to match
// the rest of the site. Content itself stays in a scoped prose wrapper so
// the first paragraph renders as a lede (see wrapper className below).
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({children}) => (
      <h2
        className="mt-16 md:mt-20 font-display font-semibold text-ink tracking-[-0.02em] leading-[1.1]"
        style={{fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)'}}
      >
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3
        className="mt-12 md:mt-14 font-display font-semibold text-ink tracking-[-0.015em] leading-[1.2]"
        style={{fontSize: 'clamp(1.25rem, 1.9vw, 1.625rem)'}}
      >
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-10 font-display font-semibold text-ink tracking-tight text-lg md:text-xl leading-[1.25]">
        {children}
      </h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-10 md:my-12 pl-6 md:pl-8 font-display text-ink font-medium tracking-[-0.01em] text-xl md:text-2xl leading-[1.35] relative">
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 bottom-2 w-px bg-lime"
        />
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="mt-6 space-y-3 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-lime [&>li]:text-ink-muted [&>li]:leading-[1.6]">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="mt-6 space-y-3 list-decimal pl-6 marker:font-display marker:text-lime marker:font-semibold marker:tabular-nums [&>li]:text-ink-muted [&>li]:leading-[1.6] [&>li]:pl-1">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({value, children}) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-colors"
        >
          {children}
        </a>
      )
    },
    strong: ({children}) => <strong className="text-ink font-semibold">{children}</strong>,
  },
}

export default async function SlugPage(props: Props) {
  const params = await props.params
  const {data: page} = await sanityFetch({query: pageBySlugQuery, params})

  if (!page) {
    notFound()
  }

  const heroImageUrl = page.heroImage?.asset
    ? urlForImage(page.heroImage)?.width(1200).height(1500).fit('crop').quality(88).url()
    : null

  return (
    <>
      {/* HERO — editorial aurora, title-led. Schema has no subtitle/image,
          so we lean on typography + atmospheric backdrop. */}
      <section
        className="relative overflow-hidden bg-surface isolate"
        aria-labelledby="slug-page-heading"
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

        <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
            <div className={heroImageUrl ? 'col-span-12 lg:col-span-7' : 'col-span-12 lg:col-span-9'}>
              <FadeIn>
                <p className="eyebrow mb-8 flex items-center gap-3">
                  <span aria-hidden="true" className="relative inline-flex size-2.5">
                    <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                    <span className="relative inline-block size-2.5 rounded-full bg-lime" />
                  </span>
                  <span>{page.eyebrow || `Padel Day · ${page.title}`}</span>
                  <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  id="slug-page-heading"
                  className="font-display font-bold text-ink leading-[0.94] tracking-[-0.035em] text-balance"
                  style={{fontSize: 'clamp(2.5rem, 6.8vw, 5.75rem)'}}
                >
                  {page.title}
                </h1>
              </FadeIn>

              {page.subtitle && (
                <FadeIn delay={0.15}>
                  <p className="mt-8 md:mt-10 font-body text-ink-muted text-lg md:text-xl leading-[1.5] max-w-[52ch] text-balance">
                    {page.subtitle}
                  </p>
                </FadeIn>
              )}
            </div>

            {heroImageUrl && (
              <div className="col-span-12 lg:col-span-5">
                <FadeIn delay={0.2}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-alt">
                    <Image
                      src={heroImageUrl}
                      alt={page.heroImage?.alt || ''}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      priority
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 ring-1 ring-inset ring-hairline"
                    />
                  </div>
                </FadeIn>
              </div>
            )}
          </div>
        </Container>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-hairline" />
      </section>

      {/* BODY — editorial prose, two-column with sticky eyebrow on desktop */}
      {page.body && (
        <section
          className="relative bg-surface border-b border-hairline py-20 md:py-28 lg:py-32"
          aria-label="Contenu"
        >
          <Container>
            <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-start">
              <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-24">
                <FadeIn>
                  <SectionIntro eyebrow="Lecture" heading="En détail." />
                </FadeIn>
              </div>

              <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                <FadeIn delay={0.1}>
                  <div
                    className={[
                      'font-body text-ink text-lg md:text-xl leading-[1.6] max-w-[64ch]',
                      '[&_p]:mt-6 [&_p:first-child]:mt-0',
                      // First paragraph = editorial lede
                      '[&_p:first-child]:text-xl [&_p:first-child]:md:text-2xl',
                      '[&_p:first-child]:leading-[1.4] [&_p:first-child]:text-ink',
                      '[&_p:first-child]:font-display [&_p:first-child]:font-medium',
                      '[&_p:first-child]:tracking-[-0.01em]',
                      // Subsequent paragraphs softer
                      '[&_p:not(:first-child)]:text-ink-muted',
                    ].join(' ')}
                  >
                    <PortableText value={page.body} components={portableTextComponents} />
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA — B2B close, consistent with other pages */}
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

        <Container className="relative z-10 py-24 md:py-32">
          <FadeIn>
            <p className="eyebrow text-lime/90 mb-8 flex items-center gap-3">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-lime/40" />
              <span>Aller plus loin</span>
            </p>
            <h2
              className="font-display font-semibold text-white leading-[0.98] tracking-[-0.035em] text-balance max-w-[22ch]"
              style={{fontSize: 'clamp(2rem, 5vw, 3.75rem)'}}
            >
              Un projet de terrain de padel&nbsp;?
            </h2>
            <p className="mt-8 md:mt-10 text-base md:text-lg text-white/70 leading-[1.6] font-body max-w-[64ch]">
              Collectivités, clubs, promoteurs : nous accompagnons l&apos;étude, l&apos;installation
              et l&apos;exploitation de votre terrain, de la faisabilité à la première réservation.
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
