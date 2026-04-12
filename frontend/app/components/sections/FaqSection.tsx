'use client'

import {useState} from 'react'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import {PortableText} from '@portabletext/react'
import type {BlockContent} from '@/sanity.types'

interface FaqItem {
  _id: string
  question: string
  answer: BlockContent
}

interface FaqSectionProps {
  items: FaqItem[]
}

function FaqAccordionItem({item}: {item: FaqItem}) {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-heading text-base md:text-lg font-medium text-dark pr-4">
          {item.question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-lime/20 flex items-center justify-center transition-colors duration-200"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className={`w-4 h-4 text-dark transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          >
            <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? {opacity: 0} : {height: 0, opacity: 0}}
            animate={prefersReducedMotion ? {opacity: 1} : {height: 'auto', opacity: 1}}
            exit={prefersReducedMotion ? {opacity: 0} : {height: 0, opacity: 0}}
            transition={{
              height: {duration: 0.25, ease: [0.23, 1, 0.32, 1]},
              opacity: {duration: 0.2, delay: isOpen ? 0.05 : 0},
            }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm md:text-base text-gray-500 leading-relaxed font-body prose prose-sm prose-gray max-w-[65ch]">
              <PortableText value={item.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection({items}: FaqSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-12">
          Questions frequentes
        </h2>

        <div>
          {items.map((item) => (
            <FaqAccordionItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
