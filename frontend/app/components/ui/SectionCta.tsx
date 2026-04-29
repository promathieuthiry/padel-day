import Link from 'next/link'

type SectionCtaVariant = 'primary' | 'secondary'

interface SectionCtaProps {
  label: string
  href?: string
  variant?: SectionCtaVariant
  className?: string
}

const PRIMARY_CLASSES =
  'group relative inline-flex items-center gap-3 self-start bg-lime text-dark rounded-full pl-7 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime'

const SECONDARY_CLASSES =
  'inline-flex h-14 items-center self-start border-2 border-white text-white bg-transparent rounded-full px-7 font-semibold text-[0.95rem] whitespace-nowrap transition-colors duration-200 ease-out active:scale-[0.97] hover:bg-white hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime'

const ARROW_PATHS = (
  <>
    <path d="M4 9h10" />
    <path d="M10 4l5 5-5 5" />
  </>
)

export default function SectionCta({
  label,
  href = '#',
  variant = 'primary',
  className,
}: SectionCtaProps) {
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

  return (
    <Link
      href={href}
      className={className ? `${PRIMARY_CLASSES} ${className}` : PRIMARY_CLASSES}
    >
      <span>{label}</span>
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
          {ARROW_PATHS}
        </svg>
      </span>
    </Link>
  )
}
