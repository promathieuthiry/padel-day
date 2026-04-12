'use client'

import {motion, useReducedMotion} from 'framer-motion'
import type {ReactNode} from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface FadeInProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
}

const directionOffset: Record<Direction, {x: number; y: number}> = {
  up: {x: 0, y: 24},
  down: {x: 0, y: -24},
  left: {x: 24, y: 0},
  right: {x: -24, y: 0},
}

export default function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const offset = directionOffset[direction]

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, x: offset.x, y: offset.y}}
      whileInView={{opacity: 1, x: 0, y: 0}}
      viewport={{once: true, margin: '-64px'}}
      transition={{duration, delay, ease: 'easeOut'}}
    >
      {children}
    </motion.div>
  )
}
