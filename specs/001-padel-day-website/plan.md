# Implementation Plan: Padel Day Showcase Website

**Branch**: `001-padel-day-website` | **Date**: 2026-04-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-padel-day-website/spec.md`

## Summary

Build the Padel Day showcase website on top of the existing Sanity +
Next.js 16 monorepo template. The site has 7 pages mirroring YYP's
structure (homepage, installer-un-terrain, notre-site, a-propos, contact,
plus legal pages via `[slug]`). All content is CMS-driven via Sanity
singletons and documents. Animations use Framer Motion 11 exclusively.
The primary audience at launch is B2B (municipal officials, clubs).

## Technical Context

**Language/Version**: TypeScript 5.9, Node.js 24 LTS
**Primary Dependencies**: Next.js 16.2, React 19.2, Sanity v5 (next-sanity v12), Tailwind CSS 4, Framer Motion 11, tailwindcss-animate, sonner (toasts)
**Storage**: Sanity Content Lake (hosted)
**Testing**: Manual browser testing + Lighthouse audits
**Target Platform**: Web (Vercel deployment), responsive 375px–1920px
**Project Type**: Showcase website (site vitrine)
**Performance Goals**: Lighthouse 90+ all categories, LCP < 2.5s, CLS < 0.1, INP < 200ms
**Constraints**: All content CMS-editable, French only, no auth, no booking flow
**Scale/Scope**: 7 pages, ~15 Sanity schema types, single-site

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. CMS-Driven Content | PASS | All text from Sanity singletons/documents |
| II. Brand Consistency | PASS | Tailwind config with brand tokens, Fredoka + Poppins via next/font |
| III. Mobile-First Responsive | PASS | Mobile-first Tailwind, 3 breakpoints, hamburger nav, scroll-snap cards |
| IV. Performance & SEO | PASS | SSG + ISR, LocalBusiness JSON-LD, generateMetadata per page, sitemap.ts, lang="fr", next/image |
| V. Simplicity & Scope Discipline | PASS | 7 pages, no blog/auth/booking/pricing/newsletter |
| VI. Accessibility & Standards | PASS | useReducedMotion(), semantic HTML, focus management, WCAG AA contrast checks |

## Project Structure

### Documentation (this feature)

```text
specs/001-padel-day-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── routes.md        # Route contracts
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── app/
│   ├── layout.tsx                    # Root layout (Fredoka + Poppins, lang="fr", Header, Footer)
│   ├── page.tsx                      # Homepage (7 sections)
│   ├── globals.css                   # Tailwind base + brand CSS variables
│   ├── actions.ts                    # Server action: submitContactForm
│   ├── sitemap.ts                    # Dynamic sitemap (extend existing)
│   ├── not-found.tsx                 # Custom 404 page
│   ├── installer-un-terrain/
│   │   └── page.tsx                  # B2B installation page
│   ├── notre-site/
│   │   └── page.tsx                  # Court detail page
│   ├── a-propos/
│   │   └── page.tsx                  # Team & mission page
│   ├── contact/
│   │   └── page.tsx                  # Contact form page
│   ├── [slug]/
│   │   └── page.tsx                  # Generic pages (legal — existing, adapt)
│   └── components/
│       ├── Header.tsx                # Fixed nav with backdrop blur (replace existing)
│       ├── MobileNav.tsx             # Hamburger + drawer (AnimatePresence)
│       ├── Footer.tsx                # Footer with links + social (replace existing)
│       ├── FadeIn.tsx                # Reusable scroll-reveal wrapper (whileInView)
│       ├── sections/
│       │   ├── HeroSection.tsx       # Hero with lime highlights
│       │   ├── IntroSection.tsx      # Centered intro + 2 CTAs
│       │   ├── ValuesSection.tsx     # 4-card grid / scroll-snap
│       │   ├── HowItWorksSection.tsx # 3 numbered steps
│       │   ├── ImpactSection.tsx     # 2-column text + image
│       │   ├── CtaBannerSection.tsx  # Full-width CTA band
│       │   └── FaqSection.tsx        # Accordion (AnimatePresence)
│       ├── ContactForm.tsx           # Client component with validation
│       ├── Button.tsx                # CTA button (primary lime / secondary blue)
│       ├── StatusBadge.tsx           # "Bientôt disponible" / "Ouvert" badge
│       └── StructuredData.tsx        # JSON-LD script tag
├── sanity/
│   ├── lib/
│   │   ├── queries.ts               # GROQ queries (extend existing)
│   │   ├── live.ts                   # SanityLive (existing)
│   │   └── utils.ts                  # Utilities (existing)
│   └── ...
├── tailwind.config.ts                # Brand colors, fonts, tailwindcss-animate
├── next.config.ts                    # Next.js config (existing)
└── package.json                      # + framer-motion, tailwindcss-animate

studio/
├── src/
│   ├── schemaTypes/
│   │   ├── index.ts                  # Schema registry (replace existing)
│   │   ├── singletons/
│   │   │   ├── settings.tsx          # siteSettings (replace existing)
│   │   │   ├── homePage.ts           # Homepage content
│   │   │   ├── installerPage.ts      # B2B installation page
│   │   │   ├── notreSitePage.ts      # Court detail page
│   │   │   ├── aProposPage.ts        # Team & mission page
│   │   │   └── contactPage.ts        # Contact page content
│   │   ├── documents/
│   │   │   ├── page.ts               # Generic page (existing, adapt)
│   │   │   ├── faqItem.ts            # FAQ entries
│   │   │   ├── teamMember.ts         # Team members
│   │   │   └── contactSubmission.ts  # Form submissions (read-only)
│   │   └── objects/
│   │       ├── cta.ts                # CTA button object
│   │       ├── valueCard.ts          # Value card object
│   │       ├── step.ts               # Numbered step object
│   │       ├── benefit.ts            # Municipality benefit object
│   │       ├── feature.ts            # Court feature object
│   │       ├── missionCard.ts        # Mission/vision/promise card
│   │       ├── blockContent.tsx      # Rich text (existing, adapt)
│   │       └── link.ts               # Nav link (existing)
│   └── structure/
│       └── index.ts                  # Studio desk structure (replace)
└── package.json
```

**Structure Decision**: Monorepo with `frontend/` (Next.js 16 App Router)
and `studio/` (Sanity Studio v5) workspaces. This matches the existing
template structure. All new frontend code goes under `frontend/app/`,
all new Sanity schemas under `studio/src/schemaTypes/`.

## Complexity Tracking

No constitution violations. No complexity justification needed.
