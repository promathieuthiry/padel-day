'use client'

import {useEffect, useRef, useState} from 'react'
import Container from '@/app/components/ui/Container'

type Fact = {
  label: string
  target: number
  suffix?: string
  subline: string
  caption: string
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {threshold: 0.35},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return {ref, inView}
}

function Counter({
  target,
  start,
  duration = 1600,
}: {
  target: number
  start: boolean
  duration?: number
}) {
  const [value, setValue] = useState(0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!start) return
    if (reducedMotion.current) {
      setValue(target)
      return
    }
    let frame = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, duration])

  return <>{value}</>
}

type FactInput = {
  label?: string | null
  target?: number | null
  suffix?: string | null
  subline?: string | null
  caption?: string | null
}

type FactsSectionProps = {
  eyebrow?: string
  heading?: string
  body?: string
  items?: FactInput[] | null
}

export default function FactsSection({eyebrow, heading, body, items}: FactsSectionProps) {
  const {ref, inView} = useInView<HTMLElement>()
  const facts: Fact[] = (items ?? []).map((f) => ({
    label: f.label ?? '',
    target: f.target ?? 0,
    suffix: f.suffix ?? undefined,
    subline: f.subline ?? '',
    caption: f.caption ?? '',
  }))

  if (facts.length === 0) return null

  return (
    <section
      ref={ref}
      aria-labelledby="facts-heading"
      className="relative"
      style={{
        background: 'oklch(0.35 0.15 258)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <Container className="py-20 md:py-28">
        <div className="mb-14 md:mb-20 max-w-[62rem]">
          {eyebrow ? (
            <p
              className="mb-6 flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-lime)',
              }}
            >
              <span aria-hidden="true" className="relative inline-flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2.5 rounded-full bg-lime" />
              </span>
              <span>{eyebrow}</span>
              <span aria-hidden="true" className="inline-block h-px w-10" style={{background: 'rgba(214,253,38,0.4)'}} />
            </p>
          ) : null}
          {heading ? (
            <h2
              id="facts-heading"
              className="font-display font-bold leading-[0.95] tracking-[-0.025em]"
              style={{fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#ffffff'}}
            >
              {heading}
            </h2>
          ) : null}
          {body ? (
            <p className="mt-6 md:mt-8 max-w-[56ch] text-base md:text-lg leading-[1.55]" style={{color: 'oklch(0.78 0.05 255)'}}>
              {body}
            </p>
          ) : null}
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-3">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={[
                'group relative py-8 md:py-10 md:px-10 first:md:pl-0 last:md:pr-0',
                i > 0 ? 'border-t md:border-t-0 md:border-l' : '',
              ].join(' ')}
              style={i > 0 ? {borderColor: 'rgba(255,255,255,0.12)'} : {}}
            >
              <dt
                className="flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'oklch(0.65 0.06 255)',
                }}
              >
                <span className="tabular-nums text-[0.7rem]" style={{color: 'var(--color-lime)', opacity: 0.9}}>0{i + 1}</span>
                <span aria-hidden="true" className="h-px w-6" style={{background: 'rgba(255,255,255,0.18)'}} />
                <span>{fact.label}</span>
              </dt>

              <dd
                className="mt-4 font-display font-bold leading-[0.95] tracking-[-0.03em] tabular-nums"
                style={{fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#ffffff'}}
                aria-label={`${fact.target}${fact.suffix ?? ''}`}
              >
                <span aria-hidden="true">
                  <Counter target={fact.target} start={inView} duration={1400 + i * 200} />
                  <span style={{color: 'var(--color-lime)'}}>{fact.suffix}</span>
                </span>
              </dd>

              <p className="mt-2 font-display text-base md:text-lg" style={{color: 'oklch(0.88 0.04 255)'}}>
                {fact.subline}
              </p>

              <p className="mt-4 text-sm md:text-[0.95rem] leading-[1.55] max-w-[28ch]" style={{color: 'oklch(0.72 0.04 255)'}}>
                {fact.caption}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
