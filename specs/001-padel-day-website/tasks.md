# Tasks: Padel Day Showcase Website

**Input**: Design documents from `specs/001-padel-day-website/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/routes.md, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Install dependencies and configure brand foundation

- [ ] T001 Install framer-motion and tailwindcss-animate in `frontend/package.json`
- [ ] T002 [P] Configure brand colors (lime `#d6fd26`, blue `#3164d5`, dark `#1a1a2e`), font families (heading: Fredoka, body: Poppins), and tailwindcss-animate plugin in `frontend/tailwind.config.ts`
- [ ] T003 [P] Replace Inter + IBM Plex Mono with Fredoka (headings) + Poppins (body) via next/font/google, set `lang="fr"` on HTML element in `frontend/app/layout.tsx`
- [ ] T004 [P] Update `frontend/app/globals.css` with brand CSS variables and base styles (dark bg sections, lime accent utilities)
- [ ] T005 [P] Create reusable FadeIn scroll-reveal wrapper component using Framer Motion `whileInView` and `useReducedMotion()` in `frontend/app/components/FadeIn.tsx`
- [ ] T006 [P] Create reusable Button component (primary lime / secondary blue outline variants) in `frontend/app/components/Button.tsx`

---

## Phase 2: Foundational (Sanity Schemas + Shared Infrastructure)

**Purpose**: Create all Sanity schemas and shared GROQ queries. MUST complete before any page implementation.

**CRITICAL**: No user story work can begin until this phase is complete.

### Sanity Object Types (shared across schemas)

- [ ] T007 [P] Create `cta` object schema (label, href, style enum) in `studio/src/schemaTypes/objects/cta.ts`
- [ ] T008 [P] Create `valueCard` object schema (icon, title, description) in `studio/src/schemaTypes/objects/valueCard.ts`
- [ ] T009 [P] Create `step` object schema (number, title, description, icon) in `studio/src/schemaTypes/objects/step.ts`
- [ ] T010 [P] Create `benefit` object schema (icon, title, description) in `studio/src/schemaTypes/objects/benefit.ts`
- [ ] T011 [P] Create `feature` object schema (icon, label) in `studio/src/schemaTypes/objects/feature.ts`
- [ ] T012 [P] Create `missionCard` object schema (title, body) in `studio/src/schemaTypes/objects/missionCard.ts`
- [ ] T013 [P] Adapt existing `blockContent` schema — keep rich text, remove unused blocks in `studio/src/schemaTypes/objects/blockContent.tsx`

### Sanity Singleton Schemas

- [ ] T014 [P] Replace existing `settings` with `siteSettings` singleton schema (title, description, ogImage, logo, navLinks, footerLinks, social URLs, contactEmail, copyrightText, googleAnalyticsId) in `studio/src/schemaTypes/singletons/settings.tsx`
- [ ] T015 [P] Create `homePage` singleton schema with all 7 section fields per data-model.md in `studio/src/schemaTypes/singletons/homePage.ts`
- [ ] T016 [P] Create `installerPage` singleton schema (hero, steps, benefits, features, CTA) in `studio/src/schemaTypes/singletons/installerPage.ts`
- [ ] T017 [P] Create `notreSitePage` singleton schema (heading, description, courtImage, status enum, statusLabel, locationLabel, features) in `studio/src/schemaTypes/singletons/notreSitePage.ts`
- [ ] T018 [P] Create `aProposPage` singleton schema (storyHeading, storyBody, storyImage, teamHeading, missionHeading, missionCards) in `studio/src/schemaTypes/singletons/aProposPage.ts`
- [ ] T019 [P] Create `contactPage` singleton schema (metaTitle, metaDescription, heading, introBody) in `studio/src/schemaTypes/singletons/contactPage.ts`

### Sanity Document Schemas

- [ ] T020 [P] Adapt existing `page` document schema — keep slug + title + body, add metaTitle + metaDescription fields, remove unused fields in `studio/src/schemaTypes/documents/page.ts`
- [ ] T021 [P] Create `faqItem` document schema (question, answer, order) in `studio/src/schemaTypes/documents/faqItem.ts`
- [ ] T022 [P] Create `teamMember` document schema (name, role, photo, bio, order) in `studio/src/schemaTypes/documents/teamMember.ts`
- [ ] T023 [P] Create `contactSubmission` document schema (name, email, message, submittedAt) — set read-only in Studio in `studio/src/schemaTypes/documents/contactSubmission.ts`

### Studio Configuration

- [ ] T024 Update schema registry — remove `post` and `person`, register all new schemas in `studio/src/schemaTypes/index.ts`
- [ ] T025 Update Studio desk structure — organize singletons (Settings, Pages group) and documents (FAQ, Team, Submissions) in `studio/src/structure/index.ts`
- [ ] T026 Run `npm run sanity:typegen --workspace=frontend` to generate TypeScript types from new schemas

### Frontend Shared Infrastructure

- [ ] T027 [P] Write all GROQ queries (siteSettingsQuery, homePageQuery, installerPageQuery, notreSitePageQuery, aProposPageQuery, contactPageQuery, faqItemsQuery, teamMembersQuery, pageBySlugQuery, allPageSlugsQuery) in `frontend/sanity/lib/queries.ts`
- [ ] T028 [P] Create StructuredData component for JSON-LD output in `frontend/app/components/StructuredData.tsx`
- [ ] T029 [P] Create StatusBadge component ("Bientôt disponible" / "Ouvert") in `frontend/app/components/StatusBadge.tsx`
- [ ] T030 Replace existing Header with fixed header + backdrop blur + nav links (Le concept, Installer un terrain, Notre site, À propos, Contact lime CTA). Desktop nav only — mobile handled in US6 in `frontend/app/components/Header.tsx`
- [ ] T031 Replace existing Footer with social icons (Instagram, Facebook), link columns, copyright in `frontend/app/components/Footer.tsx`
- [ ] T032 Update root layout — wire new Header/Footer, remove template demo content, add siteSettings query in `frontend/app/layout.tsx`
- [ ] T033 Create custom 404 page with navigation back to homepage in `frontend/app/not-found.tsx`

**Checkpoint**: All Sanity schemas deployed, Studio navigable, shared components ready. User story implementation can now begin.

---

## Phase 3: User Story 1 — Discover the Padel Day Concept (Priority: P1)

**Goal**: Homepage with all 7 sections rendering CMS content, responsive at all viewports

**Independent Test**: Navigate to `/` — all 7 sections visible, scrollable, responsive (375px, 768px, 1280px). FAQ accordion opens/closes with smooth animation.

### Implementation for User Story 1

- [ ] T034 [P] [US1] Create HeroSection component — full-width dark bg, large Fredoka heading with lime highlight words, "Play Simple" slogan in `frontend/app/components/sections/HeroSection.tsx`
- [ ] T035 [P] [US1] Create IntroSection component — centered text, 2 CTA buttons (primary lime, secondary blue outline) in `frontend/app/components/sections/IntroSection.tsx`
- [ ] T036 [P] [US1] Create ValuesSection component — 4-card responsive grid (4-col desktop, 2x2 tablet, horizontal scroll-snap mobile), hover lift animation in `frontend/app/components/sections/ValuesSection.tsx`
- [ ] T037 [P] [US1] Create HowItWorksSection component — 3 numbered steps connected visually with line/dots in `frontend/app/components/sections/HowItWorksSection.tsx`
- [ ] T038 [P] [US1] Create ImpactSection component — two-column layout (text + CTA left, image right) in `frontend/app/components/sections/ImpactSection.tsx`
- [ ] T039 [P] [US1] Create CtaBannerSection component — full-width lime or dark band, heading + 2 buttons in `frontend/app/components/sections/CtaBannerSection.tsx`
- [ ] T040 [P] [US1] Create FaqSection component — accordion with AnimatePresence expand/collapse, smooth transitions in `frontend/app/components/sections/FaqSection.tsx`
- [ ] T041 [US1] Build homepage — fetch homePage singleton + faqItems, compose all 7 sections with FadeIn wrappers, add generateMetadata with LocalBusiness JSON-LD in `frontend/app/page.tsx`

**Checkpoint**: Homepage fully functional and independently testable.

---

## Phase 4: User Story 2 — Understand How to Install a Court (Priority: P1)

**Goal**: B2B installation page with hero, step-by-step process, benefits, features, and contact CTA

**Independent Test**: Navigate to `/installer-un-terrain` — all sections render, responsive, CTA links to /contact.

### Implementation for User Story 2

- [ ] T042 [US2] Build installer-un-terrain page — fetch installerPage singleton, render hero (lime highlights), steps section, benefits grid, court features, bottom CTA. Add generateMetadata. Wrap sections with FadeIn in `frontend/app/installer-un-terrain/page.tsx`

**Checkpoint**: B2B page fully functional and independently testable.

---

## Phase 5: User Story 3 — Contact Padel Day (Priority: P1)

**Goal**: Contact page with working form (validation, server action, toast), contact info sidebar

**Independent Test**: Navigate to `/contact` — fill form, submit, see toast. Test validation errors. Verify contact info displays.

### Implementation for User Story 3

- [ ] T043 [P] [US3] Create ContactForm client component — name/email/message fields, client-side validation (required, email format), submit via server action, show "Message envoyé !" toast on success, error toast on failure in `frontend/app/components/ContactForm.tsx`
- [ ] T044 [P] [US3] Implement submitContactForm server action — validate server-side, create contactSubmission document in Sanity, return success/error in `frontend/app/actions.ts`
- [ ] T045 [US3] Build contact page — fetch contactPage singleton, render heading + intro, ContactForm component, sidebar with contactEmail + social links. Add generateMetadata in `frontend/app/contact/page.tsx`

**Checkpoint**: Contact form fully functional, submissions visible in Sanity Studio.

---

## Phase 6: User Story 4 — Learn About the Team and Mission (Priority: P2)

**Goal**: À propos page with founding story, team members, mission/values cards

**Independent Test**: Navigate to `/a-propos` — story section, team grid, mission cards all render from CMS.

### Implementation for User Story 4

- [ ] T046 [US4] Build à-propos page — fetch aProposPage singleton + teamMembers query, render story section (heading, body, image), team grid (photo, name, role, bio), mission cards. Add generateMetadata. Wrap sections with FadeIn in `frontend/app/a-propos/page.tsx`

**Checkpoint**: À propos page fully functional.

---

## Phase 7: User Story 5 — Explore the Court / Site Detail (Priority: P2)

**Goal**: Court detail page with features, image, status badge, anonymized location

**Independent Test**: Navigate to `/notre-site` — court info renders, status badge shows correct CMS value. Change status in CMS → badge updates after rebuild.

### Implementation for User Story 5

- [ ] T047 [US5] Build notre-site page — fetch notreSitePage singleton, render heading, court image with StatusBadge overlay, location label, features list, description. Add generateMetadata. Wrap with FadeIn in `frontend/app/notre-site/page.tsx`

**Checkpoint**: Court page fully functional with CMS-driven status.

---

## Phase 8: User Story 6 — Navigate the Site on Mobile (Priority: P1)

**Goal**: Hamburger menu with slide-in drawer on mobile, AnimatePresence transitions

**Independent Test**: At 375px viewport — hamburger visible, drawer opens/closes, all nav links work, focus trapped.

### Implementation for User Story 6

- [ ] T048 [US6] Create MobileNav component — hamburger button, slide-in drawer with AnimatePresence, all nav links (Le concept, Installer un terrain, Notre site, À propos, Contact), close on link tap or outside click, focus trap for accessibility in `frontend/app/components/MobileNav.tsx`
- [ ] T049 [US6] Integrate MobileNav into Header — show hamburger on mobile breakpoint, hide desktop nav links. Ensure Header works at all viewports in `frontend/app/components/Header.tsx`

**Checkpoint**: Full responsive navigation working across all breakpoints.

---

## Phase 9: User Story 7 — Read Legal Pages (Priority: P3)

**Goal**: Generic [slug] pages rendering CMS content for mentions-legales and politique-de-confidentialite

**Independent Test**: Navigate to `/mentions-legales` and `/politique-de-confidentialite` — legal content renders from CMS.

### Implementation for User Story 7

- [ ] T050 [US7] Adapt existing [slug] page — fetch page by slug from Sanity, render title + blockContent body, add generateMetadata, add generateStaticParams for all page slugs in `frontend/app/[slug]/page.tsx`

**Checkpoint**: Legal pages render CMS content. All 7 site routes functional.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: SEO, sitemap, analytics, final responsive/accessibility pass

- [ ] T051 [P] Extend sitemap.ts — add all static routes (/, /installer-un-terrain, /notre-site, /a-propos, /contact) + dynamic [slug] pages from Sanity in `frontend/app/sitemap.ts`
- [ ] T052 [P] Add Google Analytics integration — conditional script based on siteSettings.googleAnalyticsId in `frontend/app/layout.tsx`
- [ ] T053 [P] Remove template demo content — delete `posts/[slug]/` route, remove `GetStartedCode`, `SideBySideIcons`, `Onboarding`, `Posts`, `Avatar`, `Date` components, remove `post` and `person` imports in `frontend/app/`
- [ ] T054 Responsive and accessibility audit — verify all pages at 375px/768px/1280px, check color contrast (lime on dark), keyboard navigation (FAQ accordion, mobile menu, contact form), focus indicators, heading hierarchy, landmark regions
- [ ] T055 Run Lighthouse audit on all pages — target 90+ on Performance, Accessibility, Best Practices, SEO for both mobile and desktop
- [ ] T056 Run quickstart.md validation — follow quickstart steps end-to-end, verify all pages render and CMS editing works

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on T001 (framer-motion install) for type generation
- **User Stories (Phase 3–9)**: All depend on Phase 2 completion
  - US1 (Homepage), US2 (Installer), US3 (Contact), US4 (À propos), US5 (Notre site), US6 (Mobile nav), US7 (Legal) can proceed in parallel
  - Recommended sequential order: US1 → US2 → US3 → US6 → US4 → US5 → US7
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Homepage)**: Independent — no dependencies on other stories
- **US2 (Installer)**: Independent — no dependencies on other stories
- **US3 (Contact)**: Independent — no dependencies on other stories
- **US4 (À propos)**: Independent — no dependencies on other stories
- **US5 (Notre site)**: Independent — uses StatusBadge from Phase 2
- **US6 (Mobile nav)**: Depends on Header (T030 in Phase 2), integrates MobileNav into it
- **US7 (Legal)**: Independent — adapts existing [slug] route

### Within Each User Story

- Section components marked [P] can be built in parallel
- Page composition task depends on all section components being done

### Parallel Opportunities

```text
# Phase 1 — all [P] tasks in parallel:
T002, T003, T004, T005, T006

# Phase 2 — object schemas in parallel:
T007, T008, T009, T010, T011, T012, T013

# Phase 2 — singleton schemas in parallel:
T014, T015, T016, T017, T018, T019

# Phase 2 — document schemas in parallel:
T020, T021, T022, T023

# Phase 2 — frontend components in parallel:
T027, T028, T029

# Phase 3 (US1) — all section components in parallel:
T034, T035, T036, T037, T038, T039, T040
```

---

## Implementation Strategy

### MVP First (Homepage + Installer + Contact + Mobile Nav)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (schemas + shared components)
3. Complete Phase 3: US1 — Homepage
4. Complete Phase 4: US2 — Installer un terrain
5. Complete Phase 5: US3 — Contact
6. Complete Phase 8: US6 — Mobile navigation
7. **STOP and VALIDATE**: Test all P1 stories independently — deploy MVP

### Incremental Delivery

1. MVP (US1 + US2 + US3 + US6) → Deploy
2. Add US4 (À propos) → Deploy
3. Add US5 (Notre site) → Deploy
4. Add US7 (Legal pages) → Deploy
5. Polish phase → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Template demo content (posts, persons, onboarding) removed in Phase 10 polish
