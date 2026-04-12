import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  label: string
  href?: string
  variant?: ButtonVariant
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-lime text-dark hover:bg-lime/90 border-2 border-lime',
  secondary:
    'bg-transparent text-blue border-2 border-blue hover:bg-blue hover:text-white',
}

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-sm transition-colors duration-200'

export default function Button({
  label,
  href,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles}>
        {label}
      </Link>
    )
  }

  return (
    <button type="button" className={styles}>
      {label}
    </button>
  )
}
