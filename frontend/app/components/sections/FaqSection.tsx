'use client'

import {useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {BlockContent} from '@/sanity.types'
import {Stagger, StaggerItem} from '@/app/components/Stagger'
import Container from '@/app/components/ui/Container'
import SectionIntro from '@/app/components/ui/SectionIntro'

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
    <div
      className={`relative border-b border-hairline transition-colors duration-300 ${
        isOpen ? 'bg-surface' : 'hover:bg-surface/60'
      }`}
    >
      {/* Lime rail — activates on open, echoes the court-line language */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] bg-lime origin-top transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{transform: isOpen ? 'scaleY(1)' : 'scaleY(0)'}}
      />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full grid grid-cols-12 gap-x-4 md:gap-x-8 items-start py-7 md:py-9 pl-5 md:pl-8 pr-4 md:pr-6 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue transition-colors"
      >
        {/* Index — tabular, restrained, lime when active */}
        <span
          className={`col-span-2 md:col-span-1 font-display font-medium tabular-nums pt-[0.35rem] transition-colors duration-300 ${
            isOpen ? 'text-ink' : 'text-ink-faint group-hover:text-ink-muted'
          }`}
          style={{fontSize: '0.8rem', letterSpacing: '0.04em'}}
          aria-hidden="true"
        >
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle transition-colors duration-300 ${
              isOpen ? 'bg-lime' : 'bg-transparent'
            }`}
          />
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className="col-span-9 md:col-span-10 font-display font-medium text-ink tracking-[-0.015em] leading-[1.22] text-balance"
          style={{fontSize: 'clamp(1.125rem, 1.55vw, 1.4rem)'}}
        >
          {item.question}
        </span>

        {/* Toggle icon — morphing plus/minus inside a subtle chip */}
        <span className="col-span-1 flex justify-end pt-[0.2rem]" aria-hidden="true">
          <span
            className={`relative flex items-center justify-center size-9 rounded-full border transition-[colors,transform,box-shadow] duration-300 ease-out ${
              isOpen
                ? 'bg-dark border-dark text-lime'
                : 'bg-transparent border-hairline text-ink-muted group-hover:border-ink group-hover:text-ink group-active:scale-[0.94]'
            }`}
          >
            {/* Horizontal bar — always visible */}
            <span className="absolute h-[1.5px] w-3.5 bg-current rounded-full" />
            {/* Vertical bar — collapses when open, forming a minus */}
            <span
              className="absolute h-3.5 w-[1.5px] bg-current rounded-full transition-transform duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{transform: isOpen ? 'scaleY(0)' : 'scaleY(1)'}}
            />
          </span>
        </span>
      </button>

      {/* Answer — grid-rows 0fr→1fr animates to intrinsic height. */}
      <div
        className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-[380ms]"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 pb-10 md:pb-12 pl-5 md:pl-8 pr-4 md:pr-6">
            <div
              className="col-start-3 md:col-start-2 col-span-10 md:col-span-9 font-body text-base md:text-[1.05rem] text-ink-muted leading-[1.65] prose max-w-[62ch] prose-strong:text-ink prose-strong:font-medium prose-a:text-blue prose-a:no-underline hover:prose-a:underline"
              style={{
                transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
                transition: 'transform 420ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
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
    <section
      className="relative bg-surface-2 py-24 md:py-36 overflow-hidden isolate"
      aria-labelledby="faq-heading"
    >
      {/* Atmospheric lime bloom — very subtle, anchored bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-60 -bottom-60 h-[44rem] w-[44rem] rounded-full blur-[160px] opacity-[0.18]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
      />

      <Container className="relative z-10">
        <div className="mb-14 md:mb-20">
          <SectionIntro
            eyebrow="Questions fréquentes"
            heading="Tout ce qu'il faut savoir avant de jouer."
            headingId="faq-heading"
          />
        </div>

        {/* Accordion shell — hairline top + soft surface shift on open items */}
        <div className="border-t border-hairline">
          <Stagger staggerDelay={0.05}>
            {items.map((item, index) => (
              <StaggerItem key={item._id}>
                <FaqRow item={item} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
