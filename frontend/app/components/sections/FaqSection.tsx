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
  eyebrow?: string
  heading?: string
}

function FaqRow({item, index}: {item: FaqItem; index: number}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative transition-colors duration-300"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        background: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
      }}
    >
      {/* Lime rail — activates on open */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] bg-lime origin-top transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{transform: isOpen ? 'scaleY(1)' : 'scaleY(0)'}}
      />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full grid grid-cols-12 gap-x-4 md:gap-x-8 items-start py-7 md:py-9 pl-5 md:pl-8 pr-4 md:pr-6 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-lime transition-colors"
      >
        {/* Index */}
        <span
          className="col-span-2 md:col-span-1 font-display font-medium tabular-nums pt-[0.35rem] transition-colors duration-300"
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            color: isOpen ? 'var(--color-lime)' : 'oklch(0.55 0.06 255)',
          }}
          aria-hidden="true"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle transition-colors duration-300"
            style={{background: isOpen ? 'var(--color-lime)' : 'transparent'}}
          />
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className="col-span-9 md:col-span-10 font-display font-medium tracking-[-0.015em] leading-[1.22] text-balance"
          style={{fontSize: 'clamp(1.125rem, 1.55vw, 1.4rem)', color: '#ffffff'}}
        >
          {item.question}
        </span>

        {/* Toggle icon */}
        <span className="col-span-1 flex justify-end pt-[0.2rem]" aria-hidden="true">
          <span
            className="relative flex items-center justify-center size-9 rounded-full transition-[colors,transform,box-shadow] duration-300 ease-out group-active:scale-[0.94]"
            style={{
              background: isOpen ? 'var(--color-lime)' : 'rgba(255,255,255,0.08)',
              border: isOpen ? '1px solid var(--color-lime)' : '1px solid rgba(255,255,255,0.18)',
              color: isOpen ? 'var(--color-dark)' : 'rgba(255,255,255,0.7)',
            }}
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
              className="col-start-3 md:col-start-2 col-span-10 md:col-span-9 font-body text-base md:text-[1.05rem] leading-[1.65] prose max-w-[62ch] prose-strong:font-medium prose-a:no-underline hover:prose-a:underline"
              style={{
                color: 'oklch(0.78 0.04 255)',
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

export default function FaqSection({
  items,
  eyebrow = 'Questions fréquentes',
  heading = "Tout ce qu'il faut savoir avant de jouer.",
}: FaqSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden isolate"
      style={{
        background: 'oklch(0.30 0.14 258)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 28px 56px -14px rgba(0,10,60,0.5)',
      }}
      aria-labelledby="faq-heading"
    >
      {/* Lime bloom — bottom-right, more visible on dark ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-60 -bottom-60 h-[44rem] w-[44rem] rounded-full blur-[160px] opacity-[0.20]"
        style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 60%)'}}
      />

      <Container className="relative z-10">
        <div className="mb-14 md:mb-20 max-w-[62rem]">
          {eyebrow ? (
            <p
              className="mb-6 flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-lime)',
              }}
            >
              <span aria-hidden="true" className="relative inline-flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                <span className="relative inline-block size-2.5 rounded-full bg-lime" />
              </span>
              <span>{eyebrow}</span>
              <span aria-hidden="true" className="inline-block h-px w-10" style={{background: 'rgba(214,253,38,0.4)'}} />
            </p>
          ) : null}
          {heading ? (
            <h2
              id="faq-heading"
              className="font-display font-bold leading-[0.95] tracking-[-0.025em]"
              style={{fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#ffffff'}}
            >
              {heading}
            </h2>
          ) : null}
        </div>

        <div style={{borderTop: '1px solid rgba(255,255,255,0.14)'}}>
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
