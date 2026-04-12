import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'

interface HeroSectionProps {
  heading: string
  highlightWords?: string[]
  slogan?: string
  image?: {asset?: {_ref: string}} | null
}

function renderHeading(heading: string, highlightWords?: string[]) {
  if (!highlightWords || highlightWords.length === 0) {
    return heading
  }

  const words = heading.split(' ')
  return words.map((word, i) => {
    const isHighlighted = highlightWords.some(
      (hw) => word.toLowerCase().includes(hw.toLowerCase()),
    )
    return (
      <span key={i}>
        {isHighlighted ? (
          <span className="text-lime">{word}</span>
        ) : (
          word
        )}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    )
  })
}

export default function HeroSection({
  heading,
  highlightWords,
  slogan,
  image,
}: HeroSectionProps) {
  const bgUrl = image?.asset
    ? urlForImage(image).width(1920).quality(80).url()
    : null

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-dark"
    >
      {/* Background image layer */}
      {bgUrl && (
        <Image
          src={bgUrl}
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover object-center opacity-20"
          aria-hidden="true"
        />
      )}

      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 40%, oklch(0.85 0.18 120 / 0.06), transparent), radial-gradient(ellipse 50% 50% at 20% 80%, oklch(0.45 0.12 260 / 0.08), transparent)',
        }}
      />

      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Padel ball shape - large */}
        <svg
          className="absolute -right-16 top-1/4 w-64 h-64 md:w-96 md:h-96 opacity-[0.04]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" className="text-lime" />
          <path d="M30 100 Q100 60 170 100" stroke="currentColor" strokeWidth="2" className="text-lime" />
          <path d="M30 100 Q100 140 170 100" stroke="currentColor" strokeWidth="2" className="text-lime" />
        </svg>

        {/* Small accent circle */}
        <div className="absolute left-[10%] bottom-[20%] w-3 h-3 rounded-full bg-lime/20" />
        <div className="absolute right-[25%] top-[15%] w-2 h-2 rounded-full bg-blue/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32 md:py-0">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-[1.08] tracking-tight">
            {renderHeading(heading, highlightWords)}
          </h1>

          {slogan && (
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-gray-300 font-body max-w-xl">
              {slogan}
            </p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
