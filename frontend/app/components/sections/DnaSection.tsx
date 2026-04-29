import {Stagger, StaggerItem} from '@/app/components/Stagger'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'
import type {DnaCard} from '@/sanity.types'

type DnaCardInput = DnaCard & {_key: string}
type IconKey = NonNullable<DnaCard['icon']>

interface DnaSectionProps {
  heading: string
  eyebrow?: string
  cards: DnaCardInput[]
}

type IconProps = {className?: string}

const SVG_PROPS = {
  width: 28,
  height: 28,
  viewBox: '0 0 28 28',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function IconMap({className}: IconProps) {
  return (
    <svg className={className} {...SVG_PROPS}>
      <path d="M14 3C10.134 3 7 6.134 7 10c0 5.25 7 15 7 15s7-9.75 7-15c0-3.866-3.134-7-7-7Z" />
      <circle cx="14" cy="10" r="2.5" />
      <path d="M3 22l5-2 6 3 6-3 5 2" />
    </svg>
  )
}

function IconCourt({className}: IconProps) {
  return (
    <svg className={className} {...SVG_PROPS}>
      <rect x="3" y="8" width="22" height="14" rx="1.5" />
      <line x1="14" y1="8" x2="14" y2="22" />
      <line x1="3" y1="15" x2="25" y2="15" />
      <circle cx="14" cy="4.5" r="2" />
      <line x1="12" y1="6" x2="14" y2="8" />
      <line x1="16" y1="6" x2="14" y2="8" />
    </svg>
  )
}

function IconCoins({className}: IconProps) {
  return (
    <svg className={className} {...SVG_PROPS}>
      <ellipse cx="11" cy="9" rx="7" ry="3.5" />
      <path d="M4 9v4c0 1.933 3.134 3.5 7 3.5S18 14.933 18 13V9" />
      <path d="M4 13v4c0 1.933 3.134 3.5 7 3.5" />
      <circle cx="20" cy="19" r="4.5" />
      <line x1="20" y1="16.5" x2="20" y2="17.5" />
      <line x1="20" y1="20.5" x2="20" y2="21.5" />
      <path d="M18.5 18.5c0-.828.672-1.5 1.5-1.5s1.5.448 1.5 1s-.5 1-1.5 1.25S18.5 20 18.5 20.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5" />
    </svg>
  )
}

function IconRacket({className}: IconProps) {
  return (
    <svg className={className} {...SVG_PROPS}>
      <circle cx="11" cy="11" r="7" />
      <line x1="11" y1="4" x2="11" y2="18" />
      <line x1="4" y1="11" x2="18" y2="11" />
      <line x1="6" y1="6" x2="16" y2="16" />
      <line x1="16" y1="6" x2="6" y2="16" />
      <line x1="16" y1="16" x2="24" y2="24" />
    </svg>
  )
}

const ICONS: Record<IconKey, (props: IconProps) => React.JSX.Element> = {
  map: IconMap,
  court: IconCourt,
  coins: IconCoins,
  racket: IconRacket,
}

function DnaCardIcon({icon, className}: {icon?: IconKey; className?: string}) {
  const Icon = icon ? ICONS[icon] : IconMap
  return <Icon className={className} />
}

export default function DnaSection({heading, eyebrow, cards}: DnaSectionProps) {
  if (!cards || cards.length === 0) return null

  return (
    <section aria-labelledby="dna-heading" className="bg-surface border-t border-hairline">
      <Container className="py-20 md:py-28">
        <SectionIntro
          eyebrow={eyebrow}
          heading={heading}
          headingId="dna-heading"
          className="mb-14 md:mb-20"
        />

        <Stagger
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline rounded-sm overflow-hidden border border-hairline"
          staggerDelay={0.1}
        >
          {cards.map((card) => (
            <StaggerItem
              key={card._key}
              className="bg-surface p-8 md:p-10 flex flex-col gap-6 transition-colors duration-200 hover:bg-surface-2"
            >
              <DnaCardIcon icon={card.icon} className="text-blue w-7 h-7 shrink-0" />

              <div className="flex flex-col gap-3">
                <h3
                  className="font-heading font-semibold text-ink tracking-tight leading-[1.2]"
                  style={{fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)'}}
                >
                  {card.title}
                </h3>
                <p className="font-body text-ink-muted text-[0.95rem] leading-[1.65] max-w-[52ch]">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
