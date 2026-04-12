# Data Model: Padel Day Showcase Website

**Date**: 2026-04-12
**Feature**: 001-padel-day-website

## Sanity Document Types

### siteSettings (singleton)

Global site configuration.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Site title (used in meta title template) |
| description | text | yes | Default meta description |
| ogImage | image | no | Default Open Graph image |
| logo | image | yes | Padel Day logo for header |
| navLinks | array of link | yes | Navigation menu items |
| footerLinks | array of link | yes | Footer link columns |
| socialInstagram | url | no | Instagram profile URL |
| socialFacebook | url | no | Facebook page URL |
| contactEmail | string | yes | Contact email (e.g., contact@padelday.fr) |
| copyrightText | string | yes | Footer copyright line |
| googleAnalyticsId | string | no | GA tracking ID |

### homePage (singleton)

Homepage content — one singleton with structured sections.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| metaTitle | string | yes | Page meta title |
| metaDescription | text | yes | Page meta description |
| ogImage | image | no | Page-specific OG image |
| heroHeading | string | yes | Hero section main heading |
| heroHighlightWords | array of string | no | Words to highlight in lime |
| heroSlogan | string | yes | Subtitle / slogan ("Play Simple") |
| heroImage | image | no | Optional hero background/decorative image |
| introHeading | string | yes | Intro section heading |
| introBody | blockContent | yes | Intro description paragraph |
| introPrimaryCta | cta | yes | Primary CTA (lime button) |
| introSecondaryCta | cta | no | Secondary CTA (blue outline) |
| values | array of valueCard | yes | 4 value/philosophy cards |
| howItWorksHeading | string | yes | Section heading |
| howItWorksSteps | array of step | yes | 3 steps |
| impactHeading | string | yes | Impact section heading |
| impactBody | blockContent | yes | Impact description |
| impactCta | cta | yes | CTA button |
| impactImage | image | yes | Right-column image |
| ctaBannerHeading | string | yes | CTA banner heading |
| ctaBannerPrimaryCta | cta | yes | Primary CTA |
| ctaBannerSecondaryCta | cta | no | Secondary CTA |

### installerPage (singleton)

B2B page targeting municipalities and clubs.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| metaTitle | string | yes | Page meta title |
| metaDescription | text | yes | Page meta description |
| ogImage | image | no | Page-specific OG image |
| heroHeading | string | yes | Hero heading |
| heroHighlightWords | array of string | no | Words to highlight in lime |
| heroBody | blockContent | yes | Hero description |
| heroImage | image | no | Hero background/image |
| stepsHeading | string | yes | Installation process heading |
| steps | array of step | yes | Installation steps (e.g., 5 steps) |
| benefitsHeading | string | yes | Benefits section heading |
| benefits | array of benefit | yes | Key advantages for municipalities |
| featuresHeading | string | no | Court features heading |
| features | array of feature | no | Court feature list |
| ctaHeading | string | yes | Bottom CTA heading |
| ctaBody | blockContent | no | CTA description |
| cta | cta | yes | CTA button (link to contact) |

### notreSitePage (singleton)

Court detail page.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| metaTitle | string | yes | Page meta title |
| metaDescription | text | yes | Page meta description |
| ogImage | image | no | Page-specific OG image |
| heading | string | yes | Page heading |
| description | blockContent | yes | Court description |
| courtImage | image | yes | Main court photo/illustration |
| status | string (enum) | yes | "coming_soon" or "open" |
| statusLabel | string | yes | Display label (e.g., "Bientôt disponible") |
| locationLabel | string | yes | Anonymized location text |
| features | array of feature | yes | Court features list |

### aProposPage (singleton)

Team and mission page.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| metaTitle | string | yes | Page meta title |
| metaDescription | text | yes | Page meta description |
| ogImage | image | no | Page-specific OG image |
| storyHeading | string | yes | Founding story heading |
| storyBody | blockContent | yes | Founding story content |
| storyImage | image | no | Story section image |
| teamHeading | string | yes | Team section heading |
| missionHeading | string | yes | Mission section heading |
| missionCards | array of missionCard | yes | Mission/vision/promise cards |

### contactPage (singleton)

Contact page intro content (form is code-driven).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| metaTitle | string | yes | Page meta title |
| metaDescription | text | yes | Page meta description |
| heading | string | yes | Page heading ("Contactez-nous") |
| introBody | blockContent | no | Optional intro text above form |

### page (document — existing, repurposed)

Generic content pages for legal text, etc.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Page title |
| slug | slug | yes | URL slug |
| metaTitle | string | no | Meta title (falls back to title) |
| metaDescription | text | no | Meta description |
| body | blockContent | yes | Page body content |

### faqItem (document)

FAQ entries displayed on the homepage.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| question | string | yes | The question |
| answer | blockContent | yes | The answer |
| order | number | yes | Display order |

### teamMember (document)

Team members for the À propos page.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Full name |
| role | string | yes | Role / title |
| photo | image | no | Portrait photo |
| bio | text | no | Short biography |
| order | number | yes | Display order |

### contactSubmission (document)

Stores contact form submissions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Sender name |
| email | string | yes | Sender email |
| message | text | yes | Message body |
| submittedAt | datetime | yes | Submission timestamp |

## Sanity Object Types

### cta (object)

Call-to-action button.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | string | yes | Button text |
| href | string | yes | Link URL or path |
| style | string (enum) | yes | "primary" (lime) or "secondary" (blue outline) |

### valueCard (object)

Value/philosophy card for homepage.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| icon | string | yes | Icon identifier (e.g., "smartphone", "calendar") |
| title | string | yes | Card title |
| description | text | yes | Card description |

### step (object)

Numbered step (used in How It Works and Installation Process).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| number | number | yes | Step number |
| title | string | yes | Step title |
| description | text | yes | Step description |
| icon | string | no | Optional icon identifier |

### benefit (object)

Key benefit for municipalities (installer page).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| icon | string | no | Icon identifier |
| title | string | yes | Benefit title |
| description | text | yes | Benefit description |

### feature (object)

Court feature item.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| icon | string | no | Icon identifier |
| label | string | yes | Feature name (e.g., "Gazon synthétique") |

### missionCard (object)

Mission/vision/promise card for À propos.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Card title (e.g., "Notre mission") |
| body | text | yes | Card content |

### link (object — existing, reuse)

Navigation link (already exists in template).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | string | yes | Display text |
| href | string | yes | URL or path |

## State Transitions

### Court Status (notreSitePage.status)

```
coming_soon → open
```

Transition is manual (client toggles in CMS). No automated transitions.
When status changes, `statusLabel` should also be updated by the client
(e.g., "Bientôt disponible" → "Ouvert").

## Entity Relationships

```
siteSettings (1) ──── global config for all pages
homePage (1) ──┬── values: valueCard[]
               ├── howItWorksSteps: step[]
               └── references faqItem[] (via GROQ query)
installerPage (1) ──┬── steps: step[]
                    └── benefits: benefit[]
notreSitePage (1) ──── features: feature[]
aProposPage (1) ──┬── references teamMember[] (via GROQ query)
                  └── missionCards: missionCard[]
contactPage (1) ──── standalone singleton
page (*) ──── generic content pages (legal, etc.)
faqItem (*) ──── standalone documents, queried by homePage
teamMember (*) ──── standalone documents, queried by aProposPage
contactSubmission (*) ──── created by server action, read-only in Studio
```
