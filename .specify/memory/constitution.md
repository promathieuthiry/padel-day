<!--
  Sync Impact Report
  ===================
  Version change: 0.0.0 → 1.0.0 (initial ratification)
  Modified principles: N/A (first version)
  Added sections:
    - Core Principles (6 principles)
    - Technical Standards
    - Content & Localization
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md — ✅ compatible (no changes needed)
    - .specify/templates/spec-template.md — ✅ compatible (no changes needed)
    - .specify/templates/tasks-template.md — ✅ compatible (no changes needed)
  Follow-up TODOs: None
-->

# Padel Day Constitution

## Core Principles

### I. CMS-Driven Content

All user-facing text content MUST be managed through Sanity CMS.
No hardcoded copy in components — all headings, descriptions,
labels, and FAQ entries MUST be fetched from the CMS at build
or request time. This ensures the client can update content
without developer intervention.

### II. Brand Consistency

The visual identity MUST be strictly enforced across all pages:

- Primary CTA color: `#d6fd26` (lime/neon green) with dark text
- Secondary color: `#3164d5` (blue)
- Heading font: Fredoka (bold, large sizes)
- Body font: Poppins (regular weight, 16-18px base)
- Backgrounds alternate between white, dark (`#1a1a2e`),
  and subtle grays
- Key words in dark headings MUST be highlighted in lime

Deviations from the brand palette or typography require explicit
client approval.

### III. Mobile-First Responsive Design

All components MUST be designed mobile-first and adapt to three
breakpoints: mobile, tablet, and desktop. Specific patterns:

- Navigation: hamburger drawer on mobile, fixed header on desktop
- Value cards: horizontal scroll-snap on mobile, 2x2 on tablet,
  4-column grid on desktop
- Full-width sections with generous whitespace at all sizes

No component may be desktop-only. Every section MUST be usable
on a 375px-wide viewport.

### IV. Performance & SEO

The site MUST be optimized for local SEO and fast load times:

- Static generation for all public pages
- Structured data (LocalBusiness schema) on the homepage
- Meta titles and descriptions on every page
- Dynamic sitemap generation
- `lang="fr"` on the HTML element
- Open Graph meta tags with brand imagery
- Images MUST use next/image or equivalent optimization
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

### V. Simplicity & Scope Discipline

The site is a showcase (site vitrine) — not a web application.
Features NOT in the specification MUST NOT be added:

- No blog, no testimonials, no pricing page, no newsletter
- No authentication or user accounts
- No booking/payment flow (the site explains, not executes)
- No multi-site/multi-court logic

Every component and page MUST serve the single goal of explaining
the Padel Day concept and driving contact conversions.

### VI. Accessibility & Standards

All interactive elements MUST meet WCAG 2.1 AA:

- Sufficient color contrast (lime `#d6fd26` on dark backgrounds
  meets AA for large text — verify all combinations)
- Keyboard-navigable FAQ accordion and mobile menu
- Semantic HTML: proper heading hierarchy, landmark regions,
  form labels
- Focus indicators on all interactive elements

## Technical Standards

- **Framework**: Next.js (App Router) deployed on Vercel
- **CMS**: Sanity for all editable content
- **Language**: TypeScript — strict mode, no `any` types
- **Styling**: Tailwind CSS with design tokens matching the brand
- **Contact form**: server action or API route — no client-side
  email sending; validate inputs server-side
- **Analytics**: Google Analytics integration (defer loading)
- **Images**: placeholder/illustration assets until professional
  photos are available; all images MUST have alt text

## Content & Localization

- All text MUST be in French (`lang="fr"`)
- Contact email: `contact@padelday.fr`
- Social links: Instagram and Facebook (in footer and contact)
- Copyright: &copy; 2026 Padel Day. Tous droits réservés.

## Governance

This constitution defines the non-negotiable rules for the
Padel Day website project. All implementation decisions,
pull requests, and code reviews MUST verify compliance with
these principles.

**Amendment procedure**: Any principle change requires
documentation of what changed, why, and a version bump.

- MAJOR bump: removing or redefining a principle
- MINOR bump: adding a principle or expanding scope
- PATCH bump: wording clarifications, typo fixes

**Compliance review**: Every PR MUST be checked against the
constitution principles before merge. The plan-template
Constitution Check gate enforces this.

**Version**: 1.0.0 | **Ratified**: 2026-04-12 | **Last Amended**: 2026-04-12
