interface StatusBadgeProps {
  status: 'coming_soon' | 'open'
  label: string
}

export default function StatusBadge({status, label}: StatusBadgeProps) {
  const styles =
    status === 'open'
      ? 'bg-lime/90 text-dark'
      : 'bg-amber-300/90 text-dark'

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  )
}
