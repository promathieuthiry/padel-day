'use client'

import {useEffect, useRef, useState} from 'react'

type Fact = {
  label: string
  target: number
  suffix?: string
  subline: string
  caption: string
}

const FACTS: Fact[] = [
  {
    label: 'Horaires',
    target: 17,
    suffix: 'h',
    subline: '7h → minuit',
    caption: 'Plage d’ouverture quotidienne, sans personnel sur place.',
  },
  {
    label: 'Accès',
    target: 100,
    suffix: '%',
    subline: 'Autonome',
    caption: 'Réservation, ouverture et éclairage gérés par smartphone.',
  },
  {
    label: 'Ouverture',
    target: 7,
    suffix: 'J',
    subline: 'Jours fériés inclus',
    caption: 'Tous les jours de l’année. Zéro interruption.',
  },
]

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

export default function FactsSection() {
  const {ref, inView} = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      aria-labelledby="facts-heading"
      className="relative bg-surface border-t border-hairline"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="mb-14 md:mb-20 max-w-[62rem]">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="relative inline-flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
              <span className="relative inline-block size-2.5 rounded-full bg-lime" />
            </span>
            <span>Notre ambition</span>
            <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
          </p>
          <h2
            id="facts-heading"
            className="font-display font-bold text-ink leading-[0.95] tracking-[-0.025em]"
            style={{fontSize: 'clamp(1.75rem, 4vw, 3rem)'}}
          >
            Démocratiser le padel.
          </h2>
          <p className="mt-6 md:mt-8 text-ink-muted max-w-[56ch] text-base md:text-lg leading-[1.55]">
            Fini les trajets d’une heure pour un terrain libre. Padel Day apporte le jeu dans les
            villes moyennes, au plus près des joueurs.
          </p>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-3">
          {FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={[
                'group relative py-8 md:py-10 md:px-10 first:md:pl-0 last:md:pr-0',
                i > 0 ? 'border-t md:border-t-0 md:border-l border-hairline' : '',
              ].join(' ')}
            >
              <dt className="eyebrow text-ink-faint flex items-center gap-2">
                <span className="tabular-nums text-[0.7rem] text-blue/80">0{i + 1}</span>
                <span aria-hidden="true" className="h-px w-6 bg-hairline" />
                <span>{fact.label}</span>
              </dt>

              <dd
                className="mt-4 font-display font-bold text-blue leading-[0.95] tracking-[-0.03em] tabular-nums"
                style={{fontSize: 'clamp(3rem, 6vw, 5rem)'}}
                aria-label={`${fact.target}${fact.suffix ?? ''}`}
              >
                <span aria-hidden="true">
                  <Counter target={fact.target} start={inView} duration={1400 + i * 200} />
                  {fact.suffix}
                </span>
              </dd>

              <p className="mt-2 font-display text-ink-muted text-base md:text-lg">
                {fact.subline}
              </p>

              <p className="mt-4 text-ink-muted text-sm md:text-[0.95rem] leading-[1.55] max-w-[28ch]">
                {fact.caption}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
