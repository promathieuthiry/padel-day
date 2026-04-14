'use client'

import {motion, useReducedMotion, type Variants} from 'framer-motion'
import type {ElementType, ReactNode} from 'react'

interface StaggerProps {
  children: ReactNode
  className?: string
  as?: ElementType
  staggerDelay?: number
  initialDelay?: number
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

const containerVariants = (staggerDelay: number, initialDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
})

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.7, ease: [0.16, 1, 0.3, 1]},
  },
}

export function Stagger({
  children,
  className,
  as = 'div',
  staggerDelay = 0.08,
  initialDelay = 0.05,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion.create(as)

  if (prefersReducedMotion) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  return (
    <MotionComponent
      className={className}
      variants={containerVariants(staggerDelay, initialDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-10% 0px'}}
    >
      {children}
    </MotionComponent>
  )
}

export function StaggerItem({children, className, as = 'div'}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = motion.create(as)

  if (prefersReducedMotion) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  return (
    <MotionComponent className={className} variants={itemVariants}>
      {children}
    </MotionComponent>
  )
}
