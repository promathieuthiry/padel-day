# Research: Padel Day Showcase Website

**Date**: 2026-04-12
**Feature**: 001-padel-day-website

## R1: Existing Project Foundation

**Decision**: Build on the existing `sanity-template-nextjs-clean` monorepo.

**Rationale**: The repo already has a working Next.js 16 + Sanity v5 setup
with workspaces (`frontend/` for Next.js, `studio/` for Sanity Studio).
It includes Tailwind CSS 4, next-sanity v12, visual editing, draft mode,
Vercel Speed Insights, sonner (toasts), and a `[slug]` catch-all page.
This covers 60%+ of the infrastructure needed.

**Alternatives considered**:
- Start from scratch with `create-next-app` — rejected: would lose the
  Sanity integration, visual editing, and type generation pipeline
- Use a different CMS — rejected: Sanity is already configured and the
  constitution mandates CMS-driven content

## R2: Fonts — Fredoka + Poppins

**Decision**: Replace Inter + IBM Plex Mono with Fredoka (headings) and
Poppins (body) via `next/font/google`.

**Rationale**: Constitution mandates Fredoka for headings and Poppins for
body text. `next/font` handles self-hosting, subsetting, and CSS variable
injection automatically with zero layout shift.

**Alternatives considered**:
- Google Fonts CDN link — rejected: worse performance, blocks rendering
- Self-host manually — rejected: `next/font` does this automatically

## R3: Animation — Framer Motion 11

**Decision**: Use Framer Motion 11 exclusively for all animations.

**Rationale**: User specified Framer Motion 11 with explicit patterns:
- `FadeIn` reusable wrapper with `whileInView` for scroll reveals
- `useScroll()` + `useTransform()` for scroll-driven parallax
- `AnimatePresence` for modals, accordions, menus
- `useMotionValue()` + `useAnimationFrame()` for infinite scroll carousels
- Spring physics for 3D coverflow and interactive elements
- `useReducedMotion()` for accessibility
- Pure CSS `@keyframes` only for simple marquee ticker
- `tailwindcss-animate` plugin as a Tailwind extension

**Alternatives considered**:
- CSS-only animations — rejected: insufficient for accordion/menu
  transitions and scroll-driven effects
- GSAP — rejected: user explicitly chose Framer Motion

## R4: Contact Form Handling

**Decision**: Use a Next.js Server Action to process contact form
submissions and send email via Resend (or store in Sanity as a document).

**Rationale**: Server Actions are the idiomatic Next.js 16 pattern for
form handling. They validate server-side, avoid exposing API keys, and
integrate naturally with the `sonner` toast already installed.

For the initial version, contact submissions will be stored as Sanity
documents (type: `contactSubmission`) so the client can see them in the
Studio. Email forwarding via Resend or similar can be added later.

**Alternatives considered**:
- API route handler — rejected: Server Actions are simpler for forms
- Third-party form service (Formspree, etc.) — rejected: adds dependency,
  and Sanity can already store the data
- Client-side email — rejected: constitution forbids this

## R5: Sanity Schema Strategy

**Decision**: Create new Sanity document types for Padel Day content,
remove the template's `post` and `person` schemas, and repurpose `page`
for legal/generic pages.

**Rationale**: The existing template schemas (`post`, `person`, `page`,
`settings`) serve a blog starter. Padel Day needs:
- `homePage` (singleton) — sections with structured fields
- `installerPage` (singleton) — B2B installation page content
- `notreSitePage` (singleton) — court detail page content
- `aProposPage` (singleton) — team/mission page content
- `contactPage` (singleton) — contact page intro/info
- `page` (existing) — repurpose for legal/generic pages
- `faqItem` (document) — FAQ entries
- `teamMember` (document) — team members for À propos
- `siteSettings` (singleton) — nav links, footer, social URLs, SEO defaults
- `contactSubmission` (document) — form submissions

Using singletons for fixed pages ensures a 1:1 mapping between CMS
entries and routes, making the Studio intuitive for the client.

**Alternatives considered**:
- Single `page` type with conditional fields — rejected: too complex for
  the client to navigate, harder to enforce required fields per page type
- Separate Sanity project — rejected: the template already has one

## R6: SEO & Structured Data

**Decision**: Use Next.js `generateMetadata` for per-page meta tags,
JSON-LD for LocalBusiness schema, and `sitemap.ts` (already exists) for
dynamic sitemap.

**Rationale**: The existing template already has `generateMetadata` in
`layout.tsx` and a `sitemap.ts` file. Extend these with per-page
metadata from Sanity and add LocalBusiness structured data on the
homepage via a `<script type="application/ld+json">` tag.

## R7: Static Generation Strategy

**Decision**: Use static generation (SSG) with ISR via Sanity webhooks
for on-demand revalidation.

**Rationale**: Constitution mandates static generation for all public
pages. The site is content-driven with infrequent updates — perfect for
SSG. Sanity's `next-sanity` integration supports revalidation via
webhooks, and the template already includes the `SanityLive` component
for draft mode preview.

## R8: Image Handling

**Decision**: Use `next/image` with Sanity image URLs via
`@sanity/image-url` (already installed).

**Rationale**: Both `next/image` and `@sanity/image-url` are already in
the project dependencies. Placeholder images will use Unsplash via the
Sanity Studio plugin (`sanity-plugin-asset-source-unsplash` is installed).

## R9: Mobile Navigation

**Decision**: Hamburger menu with slide-in drawer, animated with
`AnimatePresence` from Framer Motion 11.

**Rationale**: Matches the spec requirement and the user's animation
strategy. The drawer will use `AnimatePresence` for enter/exit
transitions and trap focus for accessibility.

## R10: Tailwind CSS 4 Configuration

**Decision**: Extend the existing Tailwind config with Padel Day brand
tokens and add `tailwindcss-animate` plugin.

**Rationale**: Tailwind 4 is already configured. Add:
- Brand colors: `lime: #d6fd26`, `blue: #3164d5`, `dark: #1a1a2e`
- Font families: `heading: Fredoka`, `body: Poppins`
- `tailwindcss-animate` for CSS animation utilities
