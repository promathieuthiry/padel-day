import Link from 'next/link'
import type {ReactNode} from 'react'

type HeroCtaVariant = 'primary' | 'secondary'

type ArrowDirection = 'right' | 'down'

interface HeroCtaProps {
  label: string
  href?: string
  variant?: HeroCtaVariant
  arrow?: ArrowDirection
  className?: string
}

const ARROWS: Record<ArrowDirection, ReactNode> = {
  right: (
    <>
      <path d="M4 9h10" />
      <path d="M10 4l5 5-5 5" />
    </>
  ),
  down: (
    <>
      <path d="M9 4v10" />
      <path d="M4 10l5 5 5-5" />
    </>
  ),
}

const PRIMARY_CLASSES =
  'group relative inline-flex items-center gap-3 self-start bg-dark text-lime rounded-full pl-7 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue'

const SECONDARY_CLASSES =
  'inline-flex h-14 items-center self-start border-2 border-dark text-dark bg-transparent rounded-full px-7 font-semibold text-[0.95rem] whitespace-nowrap transition-colors duration-200 ease-out active:scale-[0.97] hover:bg-dark hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue'

export default function HeroCta({
  label,
  href = '#',
  variant = 'primary',
  arrow = 'right',
  className,
}: HeroCtaProps) {
  if (variant === 'secondary') {
    return (
      <Link
        href={href}
        className={className ? `${SECONDARY_CLASSES} ${className}` : SECONDARY_CLASSES}
      >
        {label}
      </Link>
    )
  }

  const arrowTranslate =
    arrow === 'down' ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-1'

  return (
    <Link
      href={href}
      className={className ? `${PRIMARY_CLASSES} ${className}` : PRIMARY_CLASSES}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-dark transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${arrowTranslate}`}
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
          {ARROWS[arrow]}
        </svg>
      </span>
    </Link>
  )
}
