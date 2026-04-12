# Feature Specification: Padel Day Showcase Website

**Feature Branch**: `001-padel-day-website`
**Created**: 2026-04-12
**Status**: Draft
**Input**: User description: "Create the padel_day website. I want you to create the exact same structure of pages that https://www.yesyespadel.com/"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the Padel Day Concept (Priority: P1)

A visitor (B2B municipal official, club manager, or potential player) visits the Padel Day homepage for the first time. They want to quickly understand what Padel Day is, how it works, and whether it is relevant for their city or community. They scroll through the homepage sections: a hero banner with the slogan, an intro explaining the concept, value cards highlighting key differentiators (automated, accessible, 7/7, digital), a 3-step "how it works" flow, a section about local impact, a CTA banner, and an FAQ. By the end, they understand the business model and feel confident enough to reach out or explore the "Installer un terrain" page.

**Why this priority**: The homepage is the primary acquisition channel. Most visitors will be B2B (municipal officials, clubs) initially. Without it, no other page serves its purpose.

**Independent Test**: Navigate to the homepage and verify all 7 sections render correctly, are scrollable, and display CMS-driven content in French. Verify responsive behavior at mobile (375px), tablet (768px), and desktop (1280px) viewports.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** the page loads, **Then** they see a full-width hero with the Padel Day heading and "Play Simple" slogan on a dark background
2. **Given** the homepage is loaded, **When** the visitor scrolls down, **Then** they see 7 distinct sections in order: Hero, Intro, Values, How It Works, Impact, CTA Banner, FAQ
3. **Given** any viewport width (375px–1920px), **When** the page renders, **Then** all sections adapt responsively with no horizontal overflow
4. **Given** the FAQ section is visible, **When** the visitor clicks a question, **Then** the answer expands with a smooth animation, and clicking again collapses it

---

### User Story 2 - Understand How to Install a Court (Priority: P1)

A municipal official or sports club manager wants to understand how Padel Day can install a padel court in their city or facility. They navigate to the "Installer un terrain" page (mirroring YYP's /installer-un-terrain structure). They find a clear explanation of the installation model, a step-by-step process (e.g., 5 steps from initial contact to court opening), key benefits for the municipality (no investment, turnkey, maintained by Padel Day), features of the courts, and a CTA to get in touch.

**Why this priority**: Most visitors at launch will be B2B — municipal officials and club managers evaluating whether to partner with Padel Day. This page is the primary B2B conversion tool.

**Independent Test**: Navigate to /installer-un-terrain and verify the page displays the installation process, benefits, court features, and a contact CTA. All content is CMS-editable.

**Acceptance Scenarios**:

1. **Given** a municipal official navigates to /installer-un-terrain, **When** the page loads, **Then** they see a hero section explaining the value proposition for municipalities
2. **Given** the page is loaded, **When** the visitor scrolls, **Then** they see a step-by-step installation process (numbered steps with descriptions)
3. **Given** the page is loaded, **When** the visitor scrolls to the benefits section, **Then** they see key advantages for municipalities (no investment, turnkey solution, maintained by Padel Day, revenue sharing or similar model)
4. **Given** the page is loaded, **When** the visitor scrolls to the bottom, **Then** they see a CTA section with a button linking to the contact page
5. **Given** any viewport width, **When** the page renders, **Then** all sections adapt responsively

---

### User Story 3 - Contact Padel Day (Priority: P1)

A visitor (potential player, municipal official, or partner) wants to get in touch with Padel Day. They navigate to the contact page, fill out a simple form (name, email, message), and submit it. They receive immediate visual confirmation that their message was sent.

**Why this priority**: Contact conversion is the primary business goal of the site. Tied with US1 as both are essential for launch.

**Independent Test**: Navigate to /contact, fill out the form with valid data, submit, and verify the success toast appears. Test with invalid data (empty fields, invalid email) and verify validation messages appear.

**Acceptance Scenarios**:

1. **Given** a visitor is on the contact page, **When** they fill all fields (name, email, message) and click submit, **Then** the form submits and a "Message envoyé !" toast notification appears
2. **Given** a visitor is on the contact page, **When** they submit with an empty required field, **Then** a validation error is displayed for the missing field
3. **Given** a visitor is on the contact page, **When** they submit with an invalid email format, **Then** a validation error is displayed for the email field
4. **Given** the contact page is loaded, **When** the visitor looks at the sidebar/info area, **Then** they see the email address contact@padelday.fr and social links (Instagram, Facebook)

---

### User Story 4 - Learn About the Team and Mission (Priority: P2)

A visitor wants to learn more about who is behind Padel Day — the founding story, the team, and the company mission. They navigate to the "À propos" page (mirroring YYP's /lequipe structure) to find the team presentation and manifesto.

**Why this priority**: Builds trust and credibility. Important but secondary to the core concept explanation and contact conversion.

**Independent Test**: Navigate to /a-propos and verify the page displays team information, mission statement, and values. All content is CMS-editable.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "À propos" in the navigation, **When** the page loads, **Then** they see a page presenting the Padel Day story, team, and mission
2. **Given** the À propos page is loaded, **When** the visitor scrolls, **Then** they see sections for the founding story, team members, and mission/values cards

---

### User Story 5 - Explore the Court / Site Detail (Priority: P2)

A visitor wants to see details about the Padel Day court. They navigate to the site detail page (mirroring YYP's /nos-sites individual site structure but adapted for a single site). They see court features, photos/illustrations, location (anonymized), and a "coming soon" or "open" status badge.

**Why this priority**: Provides concrete information about the physical offering. Secondary to concept and contact but essential for credibility.

**Independent Test**: Navigate to /notre-site and verify the page displays court information with the correct status badge (driven by CMS). Verify responsive layout.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to /notre-site, **When** the page loads, **Then** they see court details: features (synthetic turf, LED lighting, panoramic glass), an image, and a status badge
2. **Given** the court status is set to "coming soon" in the CMS, **When** the page loads, **Then** a "Bientôt disponible" badge/overlay is displayed
3. **Given** the court status is later changed to "open" in the CMS, **When** the page loads, **Then** the badge changes to "Ouvert" without any code deployment

---

### User Story 6 - Navigate the Site on Mobile (Priority: P1)

A mobile user visits the site and needs to navigate between pages using the hamburger menu. They tap the menu icon, a slide-in drawer opens with all navigation links, and they can navigate to any page.

**Why this priority**: Most visitors will arrive on mobile. The mobile navigation experience is critical for all other user stories.

**Independent Test**: On a mobile viewport (375px), verify the hamburger icon is visible, tapping it opens a drawer with all navigation links, tapping a link navigates to the correct page and closes the drawer.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page on a mobile device, **When** they tap the hamburger menu icon, **Then** a slide-in drawer opens with links: Le concept, Installer un terrain, Notre site, À propos, Contact
2. **Given** the mobile drawer is open, **When** the visitor taps a navigation link, **Then** they are navigated to the corresponding page and the drawer closes
3. **Given** the mobile drawer is open, **When** the visitor taps outside the drawer or presses the close button, **Then** the drawer closes

---

### User Story 7 - Read Legal Pages (Priority: P3)

A visitor (or regulatory requirement) needs access to legal information — mentions légales and politique de confidentialité. These are accessible from the footer.

**Why this priority**: Required by French law but not a primary user journey. Low priority for the user experience but mandatory for compliance.

**Independent Test**: Navigate to /mentions-legales and /politique-de-confidentialite via footer links. Verify pages render CMS-driven legal content.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "Mentions légales" in the footer, **When** the page loads, **Then** they see the legal notices content
2. **Given** a visitor clicks "Politique de confidentialité" in the footer, **When** the page loads, **Then** they see the privacy policy content
3. **Given** legal content is updated in the CMS, **When** the page is rebuilt, **Then** the updated content is displayed without code changes

---

### Edge Cases

- What happens when CMS content is missing or empty for a section? The section MUST still render a skeleton or fallback layout without crashing.
- What happens when the contact form submission fails (server error)? An error message MUST be displayed to the user.
- What happens when a visitor navigates to a non-existent route (e.g., /xyz)? A custom 404 page MUST be displayed with navigation back to the homepage.
- What happens when images fail to load? Alt text MUST be displayed and layout MUST not break.

## Requirements *(mandatory)*

### Functional Requirements

**Navigation & Layout**

- **FR-001**: The site MUST display a fixed header with backdrop blur on desktop, containing the Padel Day logo (left) and navigation links (right): "Le concept", "Installer un terrain", "Notre site", "À propos", and "Contact" as a lime CTA button
- **FR-002**: On mobile viewports, the header MUST display a hamburger icon that opens a slide-in drawer containing all navigation links
- **FR-003**: The site MUST display a footer on every page with: social icons (Instagram, Facebook), link columns (Le concept, Installer un terrain, Notre site, À propos, Contact, Mentions légales, Politique de confidentialité), and copyright notice

**Homepage (7 sections)**

- **FR-004**: The homepage MUST display a Hero section with a full-width dark background, a large heading with lime-accented key words, and the "Play Simple" slogan
- **FR-005**: The homepage MUST display an Intro section with a centered text block explaining the Padel Day concept and two CTA buttons (primary lime, secondary blue outline)
- **FR-006**: The homepage MUST display a Values section with 4 cards (100% automatisé, Accessible à tous, Ouvert 7j/7, Expérience digitale) in a responsive grid: 4 columns on desktop, 2x2 on tablet, horizontal scroll-snap carousel on mobile
- **FR-007**: The homepage MUST display a How It Works section with 3 numbered steps (Réserver, Payer, Jouer) connected visually
- **FR-008**: The homepage MUST display an Impact section with a two-column layout (text + CTA on left, image on right)
- **FR-009**: The homepage MUST display a full-width CTA Banner with a heading and two action buttons
- **FR-010**: The homepage MUST display an FAQ section with accordion expand/collapse behavior and smooth transitions

**Content Pages**

- **FR-011**: The site MUST have a /contact page with a form (name, email, message fields), a lime CTA submit button, and contact info sidebar (email, social links)
- **FR-012**: The contact form MUST validate required fields and email format before submission
- **FR-013**: On successful form submission, a "Message envoyé !" toast notification MUST appear
- **FR-014**: The site MUST have a /notre-site page presenting the court with features, image, anonymized location, and a CMS-driven status badge ("Bientôt disponible" or "Ouvert")
- **FR-015**: The site MUST have an /a-propos page presenting the founding story, team, and mission/values
- **FR-016**: The site MUST have an /installer-un-terrain page targeting municipal officials and club managers, presenting: a hero with the B2B value proposition, a step-by-step installation process, key benefits for municipalities (turnkey, no upfront investment, maintained by Padel Day), court features, and a CTA linking to the contact page
- **FR-017**: The site MUST support generic content pages via a /[slug] route for legal pages (mentions légales, politique de confidentialité)

**SEO & Meta**

- **FR-018**: Every page MUST have unique meta title and description tags
- **FR-019**: The homepage MUST include LocalBusiness structured data (JSON-LD)
- **FR-020**: The site MUST generate a dynamic sitemap
- **FR-021**: The HTML element MUST have `lang="fr"`
- **FR-022**: Every page MUST include Open Graph meta tags with brand imagery

**Content Management**

- **FR-023**: All user-facing text content MUST be editable through the CMS without code changes
- **FR-024**: The court status (coming soon / open) MUST be togglable from the CMS

**Error Handling**

- **FR-025**: The site MUST display a custom 404 page for unknown routes
- **FR-026**: Contact form server errors MUST display a user-friendly error message

### Key Entities

- **Page**: Represents a generic content page (slug, title, body content, meta title, meta description, OG image). Used for legal pages and any future static pages.
- **Homepage Section**: Represents each section of the homepage (section type, heading, body, CTA labels, CTA links, image, display order). Allows reordering and editing sections from the CMS.
- **FAQ Item**: A question-answer pair displayed in the FAQ accordion (question, answer, display order).
- **Value Card**: A card in the Values section (icon reference, title, description, display order).
- **How It Works Step**: A step in the process section (step number, title, description, icon/illustration).
- **Court / Site**: Represents the Padel Day court (name, status [coming_soon | open], features list, location label, image, description).
- **Installation Step**: A step in the B2B installation process displayed on /installer-un-terrain (step number, title, description, icon/illustration).
- **Installation Benefit**: A key advantage for municipalities/clubs (title, description, icon).
- **Team Member**: A person displayed on the À propos page (name, role, photo, bio).
- **Contact Submission**: A message received through the contact form (name, email, message, submitted date).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 7 site pages (homepage, installer-un-terrain, contact, notre-site, a-propos, mentions-legales, politique-de-confidentialite) load and render correctly within 2.5 seconds on a 4G mobile connection
- **SC-002**: The contact form can be completed and submitted in under 60 seconds by a first-time visitor
- **SC-003**: 100% of user-facing text content can be updated from the CMS without any code deployment
- **SC-004**: The site scores 90+ on Google Lighthouse for Performance, Accessibility, Best Practices, and SEO on both mobile and desktop
- **SC-005**: All pages render correctly with no horizontal overflow or broken layouts at viewports from 375px to 1920px
- **SC-006**: The court status badge updates within one site rebuild after a CMS change, with zero code modifications

## Assumptions

- Visitors have a stable internet connection (standard mobile 4G or Wi-Fi)
- No professional photography or video is available — placeholder illustrations or stock images will be used
- The contact form stores submissions and/or sends email notifications; the exact delivery mechanism is an implementation detail
- Only one court/site exists for the initial launch; multi-site support is explicitly out of scope
- Google Analytics will be configured post-launch with a provided tracking ID; the site MUST include the integration point but the tracking ID may be empty during development
- Social media accounts (Instagram, Facebook) exist; their URLs will be provided as CMS content
- Legal page content (mentions légales, politique de confidentialité) will be provided by the client as text; the site provides the rendering pages
- The domain is not yet reserved; the site MUST work on any domain without hardcoded URLs
