'use client'

import {motion, useReducedMotion} from 'framer-motion'

interface ValueItem {
  _key: string
  icon: string
  title: string
  description: string
}

interface ValuesSectionProps {
  values: ValueItem[]
}

const iconMap: Record<string, React.ReactNode> = {
  racket: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="24" y1="32" x2="24" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="12" x2="32" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="16" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="20" y1="6" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="28" y1="6" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
  ball: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 24 Q24 16 38 24" stroke="currentColor" strokeWidth="2" />
      <path d="M10 24 Q24 32 38 24" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  court: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <line x1="24" y1="10" x2="24" y2="38" stroke="currentColor" strokeWidth="2" />
      <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 38 C12 30 18 26 24 26 C30 26 36 30 36 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="38" cy="18" r="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="10" cy="18" r="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 6 L28.5 18.5 L42 19.5 L31.5 28 L34.5 42 L24 35 L13.5 42 L16.5 28 L6 19.5 L19.5 18.5 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 42 C14 34 6 26 6 18 C6 12 10 8 16 8 C20 8 23 10 24 12 C25 10 28 8 32 8 C38 8 42 12 42 18 C42 26 34 34 24 42Z" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  lightning: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M28 4 L14 26 H22 L20 44 L34 22 H26 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M12 40 C12 40 10 20 24 8 C38 20 36 40 36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 8 L24 40" stroke="currentColor" strokeWidth="2" />
      <path d="M18 20 L24 26" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 20 L24 26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
}

function getIcon(iconName: string) {
  const key = iconName.toLowerCase().trim()
  return iconMap[key] || iconMap.star || (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  )
}

function ValueCard({item}: {item: ValueItem}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group flex-shrink-0 w-[280px] snap-center md:w-auto bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
      whileHover={prefersReducedMotion ? undefined : {y: -4}}
      transition={{type: 'spring', stiffness: 300, damping: 25}}
    >
      <div className="w-14 h-14 rounded-xl bg-lime/10 flex items-center justify-center text-dark mb-5">
        {getIcon(item.icon)}
      </div>
      <h3 className="font-heading text-lg font-semibold text-dark mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed font-body">
        {item.description}
      </p>
    </motion.div>
  )
}

export default function ValuesSection({values}: ValuesSectionProps) {
  if (!values || values.length === 0) return null

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile: horizontal scroll-snap */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:hidden scrollbar-none"
          style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        >
          {values.map((item) => (
            <ValueCard key={item._key} item={item} />
          ))}
        </div>

        {/* Tablet & Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item) => (
            <ValueCard key={item._key} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
