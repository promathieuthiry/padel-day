'use client'

import {useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {BlockContent} from '@/sanity.types'
import {Stagger, StaggerItem} from '@/app/components/Stagger'
import Container from '@/app/components/ui/Container'

interface FaqItem {
  _id: string
  question: string
  answer: BlockContent
}

interface FaqSectionProps {
  items: FaqItem[]
}

function FaqRow({item, index}: {item: FaqItem; index: number}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-12 gap-x-4 md:gap-x-8 items-start py-7 md:py-8 text-left group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
        aria-expanded={isOpen}
      >
        <span
          className="col-span-2 md:col-span-1 font-heading font-medium text-ink-faint tabular-nums pt-1"
          style={{fontSize: '0.95rem'}}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="col-span-9 md:col-span-10 font-heading font-medium text-ink tracking-tight leading-[1.25]"
          style={{fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)'}}
        >
          {item.question}
        </span>
        <span
          className="col-span-1 flex justify-end pt-2 text-ink-muted group-hover:text-blue transition-colors"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 20 20"
            className={`w-5 h-5 transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : ''}`}
            fill="none"
          >
            <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* grid-template-rows 0fr→1fr animates to intrinsic height; height: auto is not animatable. */}
      <div
        className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-[320ms]"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 pb-8">
            <div className="col-start-3 md:col-start-2 col-span-10 md:col-span-9 font-body text-base md:text-lg text-ink-muted leading-relaxed prose max-w-[62ch] prose-strong:text-ink prose-strong:font-medium">
              <PortableText value={item.answer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FaqSection({items}: FaqSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="bg-surface-2 py-24 md:py-36">
      <Container>
        <header className="max-w-[40ch] mb-12 md:mb-16">
          <p className="eyebrow mb-4">Questions fréquentes</p>
          <h2
            className="font-heading font-semibold text-ink tracking-tight leading-[1.05]"
            style={{fontSize: 'clamp(2rem, 4vw, 3.25rem)'}}
          >
            Tout ce qu'il faut savoir avant de jouer.
          </h2>
        </header>

        <Stagger className="border-t border-hairline" staggerDelay={0.06}>
          {items.map((item, index) => (
            <StaggerItem key={item._id}>
              <FaqRow item={item} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
