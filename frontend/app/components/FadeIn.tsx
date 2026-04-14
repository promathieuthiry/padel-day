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
  up: {x: 0, y: 32},
  down: {x: 0, y: -32},
  left: {x: 32, y: 0},
  right: {x: -32, y: 0},
}

export default function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
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
      viewport={{once: true, margin: '-10% 0px'}}
      transition={{duration, delay, ease: [0.16, 1, 0.3, 1]}}
    >
      {children}
    </motion.div>
  )
}
