'use client'

import {useState, useEffect, useCallback, useRef} from 'react'
import {createPortal} from 'react-dom'
import {usePathname} from 'next/navigation'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function MobileNav({navLinks}: {navLinks: NavLink[]}) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])
  const prefersReducedMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Focus trap + escape handling
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    firstFocusable?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const close = useCallback(() => setIsOpen(false), [])

  // Filter out the "Installer un terrain" link from primary nav so we can feature it
  // in the meta footer as the prominent B2B CTA. Fall back gracefully if absent.
  const installerLink =
    navLinks.find((l) => l.href.includes('installer-un-terrain')) ?? {
      label: 'Installer un terrain',
      href: '/installer-un-terrain',
    }
  const primaryLinks = navLinks.filter(
    (l) => !l.href.includes('installer-un-terrain'),
  )

  const panelAnim = prefersReducedMotion
    ? {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
        transition: {duration: 0.18},
      }
    : {
        initial: {opacity: 0, y: -8},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -8},
        transition: {duration: 0.42, ease: EASE_OUT_EXPO},
      }

  return (
    <>
      {/* Trigger — minimal two-line glyph, more editorial than the classic three-bar */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface-2 active:scale-[0.97]"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 right-0 top-0 h-px bg-ink origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'translate-y-[5px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 right-0 bottom-0 h-px bg-ink origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="md:hidden fixed inset-0 z-[60] flex flex-col bg-white"
            {...panelAnim}
          >
            {/* Top bar — mirrors the header height & paddings to keep the close glyph in place */}
            <div className="relative flex h-16 shrink-0 items-center justify-between px-8 border-b border-hairline">
              <span className="eyebrow text-ink-faint">Menu</span>
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface-2 active:scale-[0.97]"
                aria-label="Fermer le menu"
              >
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-px bg-ink rotate-45" />
                  <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-px bg-ink -rotate-45" />
                </span>
              </button>
            </div>

            {/* Editorial nav list */}
            <nav className="flex-1 overflow-y-auto px-8 pt-10 pb-8">
              <ul className="flex flex-col">
                {primaryLinks.map((link, i) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href)
                  const index = String(i + 1).padStart(2, '0')

                  return (
                    <motion.li
                      key={link.href}
                      initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
                      animate={{opacity: 1, y: 0}}
                      transition={{
                        duration: 0.55,
                        delay: 0.12 + i * 0.06,
                        ease: EASE_OUT_EXPO,
                      }}
                      className="border-b border-hairline"
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        className="group relative flex items-baseline gap-4 py-5"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span
                          className="font-(family-name:--font-poppins) shrink-0 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-ink-faint tabular-nums"
                          aria-hidden="true"
                        >
                          {index}
                        </span>
                        <span
                          className="font-display font-medium leading-[0.95] tracking-[-0.025em] text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                          style={{fontSize: 'clamp(2.25rem, 8vw, 3.25rem)'}}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="ml-auto self-center h-1.5 w-1.5 rounded-full bg-blue"
                          />
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Meta footer — B2B CTA + contact strip */}
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{
                duration: 0.55,
                delay: 0.12 + primaryLinks.length * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className="shrink-0 border-t border-hairline bg-surface-2/60 px-8 pt-7 pb-9"
            >
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span>Pour les pros</span>
                <span aria-hidden="true" className="inline-block h-px w-6 bg-blue/60" />
              </p>

              <Link
                href={installerLink.href}
                onClick={close}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-ink px-5 py-4 text-surface transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
              >
                <span className="font-display text-lg font-medium leading-tight tracking-[-0.015em]">
                  {installerLink.label}
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>

              <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
                <div className="flex flex-col gap-1.5">
                  <dt className="font-(family-name:--font-poppins) text-[0.65rem] font-medium tracking-[0.16em] uppercase text-ink-faint">
                    Écrire
                  </dt>
                  <dd>
                    <a
                      href="mailto:contact@padel-day.fr"
                      className="font-body text-ink transition-colors duration-200 hover:text-blue break-all"
                    >
                      contact@padel-day.fr
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt className="font-(family-name:--font-poppins) text-[0.65rem] font-medium tracking-[0.16em] uppercase text-ink-faint">
                    Horaires
                  </dt>
                  <dd className="font-body text-ink-muted leading-snug">
                    Ouvert 7 j/7
                    <br />
                    <span className="text-ink-faint">8h — 23h</span>
                  </dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
