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
        className="md:hidden relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 active:scale-[0.97]"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 right-0 top-0 h-px bg-white origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'translate-y-[5px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 right-0 bottom-0 h-px bg-white origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
            className="md:hidden fixed inset-0 z-[60] flex flex-col overflow-hidden bg-blue text-white isolate"
            {...panelAnim}
          >
            {/* Court tramlines — same motif as the Footer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent 0, transparent calc(50% - 0.5px), #fff calc(50% - 0.5px), #fff calc(50% + 0.5px), transparent calc(50% + 0.5px))',
              }}
            />
            {/* Deep blue vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(120% 80% at 50% 0%, transparent 0%, transparent 55%, rgba(10,20,60,0.45) 100%)',
              }}
            />
            {/* Lime bloom */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-40 -bottom-60 h-[36rem] w-[36rem] rounded-full blur-[140px] opacity-[0.14]"
              style={{background: 'radial-gradient(circle, var(--color-lime) 0%, transparent 65%)'}}
            />

            {/* Top bar — mirrors the header */}
            <div className="relative z-10 flex h-16 shrink-0 items-center justify-between px-8 border-b border-white/10">
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="relative inline-flex size-2">
                  <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
                  <span className="relative inline-block size-2 rounded-full bg-lime" />
                </span>
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.22em] text-lime"
                  style={{fontFamily: 'var(--font-poppins), sans-serif'}}
                >
                  Menu
                </span>
              </span>
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 active:scale-[0.97]"
                aria-label="Fermer le menu"
              >
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-px bg-white rotate-45" />
                  <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-px bg-white -rotate-45" />
                </span>
              </button>
            </div>

            {/* Editorial nav list */}
            <nav className="relative z-10 flex flex-1 flex-col justify-center overflow-y-auto px-8 pt-10 pb-8">
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
                      className="border-b border-white/12"
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        className="group relative flex items-baseline gap-4 py-5"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span
                          className="shrink-0 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-white/55 tabular-nums transition-colors duration-300 group-hover:text-lime"
                          style={{fontFamily: 'var(--font-poppins), sans-serif'}}
                          aria-hidden="true"
                        >
                          {index}
                        </span>
                        <span
                          className="font-display font-medium leading-[0.95] tracking-[-0.025em] text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                          style={{fontSize: 'clamp(2.25rem, 8vw, 3.25rem)'}}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="ml-auto self-center h-1.5 w-1.5 rounded-full bg-lime"
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
              className="relative z-10 shrink-0 border-t border-white/15 bg-[rgba(10,20,60,0.25)] px-8 pt-7 pb-9"
            >
              <p
                className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/60"
                style={{fontFamily: 'var(--font-poppins), sans-serif'}}
              >
                <span>Pour les pros</span>
                <span aria-hidden="true" className="inline-block h-px w-6 bg-lime/70" />
              </p>

              <Link
                href={installerLink.href}
                onClick={close}
                className="group relative flex items-center justify-between gap-4 bg-lime text-dark rounded-full pl-6 pr-2 py-2 font-semibold transition-transform duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                <span className="font-display text-base leading-tight tracking-[-0.01em]">
                  {installerLink.label}
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dark text-lime transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 9h10" />
                    <path d="M10 4l5 5-5 5" />
                  </svg>
                </span>
              </Link>

              <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
                <div className="flex flex-col gap-1.5">
                  <dt
                    className="text-[0.65rem] font-medium tracking-[0.16em] uppercase text-white/55"
                    style={{fontFamily: 'var(--font-poppins), sans-serif'}}
                  >
                    Écrire
                  </dt>
                  <dd>
                    <a
                      href="mailto:contact@padel-day.fr"
                      className="text-white transition-colors duration-200 hover:text-lime break-all"
                    >
                      contact@padel-day.fr
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt
                    className="text-[0.65rem] font-medium tracking-[0.16em] uppercase text-white/55"
                    style={{fontFamily: 'var(--font-poppins), sans-serif'}}
                  >
                    Horaires
                  </dt>
                  <dd className="text-white/75 leading-snug">
                    Ouvert 7 j/7
                    <br />
                    <span className="text-white/50">8h — 23h</span>
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
