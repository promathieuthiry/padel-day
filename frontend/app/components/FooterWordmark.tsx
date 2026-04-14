'use client'

import {useRef} from 'react'
import {motion, useReducedMotion, useScroll, useTransform} from 'framer-motion'

/**
 * FooterWordmark
 *
 * Oversized closing wordmark with a scroll-driven left-to-right fill.
 * Two stacked layers: an outlined base + a clipped lime-filled clone.
 * Only clip-path animates (compositor-friendly). Respects reduced motion.
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  // 100 -> 0: right-side inset collapses, revealing the filled text L→R.
  const rightInset = useTransform(scrollYProgress, [0, 1], [100, 0])
  const clipPath = useTransform(rightInset, (v) => `inset(0 ${v}% 0 0)`)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative mt-4 md:mt-10 select-none overflow-hidden"
    >
      {/* Base: outlined stroke only — always visible */}
      <span
        className="font-display font-bold leading-[0.85] tracking-[-0.045em] whitespace-nowrap block"
        style={{
          fontSize: 'clamp(4rem, 17vw, 15rem)',
          WebkitTextStroke: '1px rgba(255,255,255,0.22)',
          color: 'transparent',
        }}
      >
        Padel Day
      </span>

      {/* Fill layer: lime, clipped from the right */}
      <motion.span
        className="font-display font-bold leading-[0.85] tracking-[-0.045em] whitespace-nowrap block absolute inset-0"
        style={{
          fontSize: 'clamp(4rem, 17vw, 15rem)',
          color: 'var(--color-lime)',
          WebkitTextStroke: '1px rgba(255,255,255,0.22)',
          clipPath: prefersReducedMotion ? 'inset(0 0 0 0)' : clipPath,
          willChange: 'clip-path',
        }}
      >
        Padel Day
      </motion.span>
    </div>
  )
}
