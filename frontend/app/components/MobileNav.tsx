'use client'

import {useState, useEffect, useCallback, useRef} from 'react'
import {usePathname} from 'next/navigation'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
}

export default function MobileNav({navLinks}: {navLinks: NavLink[]}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close on link click handles route change — see onClick={close} on links

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

  // Focus trap
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

  const animationProps = prefersReducedMotion
    ? {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
        transition: {duration: 0.15},
      }
    : {
        initial: {x: '100%'},
        animate: {x: 0},
        exit: {x: '100%'},
        transition: {duration: 0.3, ease: [0.32, 0.72, 0, 1] as const},
      }

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-10 h-10 flex items-center justify-center"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-dark rounded-full transition-transform duration-200 origin-center ${
              isOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-dark rounded-full transition-opacity duration-200 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-dark rounded-full transition-transform duration-200 origin-center ${
              isOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </div>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-dark/60 backdrop-blur-sm"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              onClick={close}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              ref={drawerRef}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-layer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              {...animationProps}
            >
              <div className="flex flex-col h-full">
                {/* Close button */}
                <div className="flex justify-end p-4">
                  <button
                    type="button"
                    onClick={close}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-dark">
                      <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 px-6 py-4">
                  <ul className="space-y-1">
                    {navLinks.map((link) => {
                      const isActive =
                        link.href === '/'
                          ? pathname === '/'
                          : pathname.startsWith(link.href)

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={close}
                            className={`block py-3 px-4 rounded-xl text-base font-medium font-body transition-colors duration-150 ${
                              isActive
                                ? 'bg-lime/10 text-dark'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Bottom CTA */}
                <div className="px-6 pb-8">
                  <Link
                    href="/contact"
                    onClick={close}
                    className="block w-full text-center rounded-full bg-lime text-dark font-semibold text-sm px-6 py-3 transition-colors duration-200 hover:bg-lime/90"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
