# Padel Day — Website Specification

## Project Overview

**Padel Day** is a 100% automated padel complex — a mini-complex with 2 premium courts, open 7/7 from 7h to midnight. Everything is smartphone-based: booking, payment, unique access code. No staff on-site.

The website is a **showcase site (site vitrine)** to explain the business model and the player journey.

**Slogan:** "Play Simple"

---

## Brand Identity

| Element | Value |
|---------|-------|
| Primary CTA color | `#d6fd26` (lime/neon green) |
| Secondary color | `#3164d5` (blue) |
| Heading font | **Fredoka** |
| Body font | **Poppins** |
| Tone | Modern, fun, minimalist, casual but professional |
| Language | French (`lang="fr"`) |

---

## Navigation

**Desktop:** Fixed header with backdrop blur.

| Position | Element |
|----------|---------|
| Left | Padel Day logo |
| Right | "Le concept" · "Notre site" · "À propos" · **"Contact"** (lime CTA button) |

**Mobile:** Hamburger menu → slide-in drawer with same links.

---

## Homepage — Section-by-Section Structure

> Mirrors the structure of [yesyespadel.com](https://www.yesyespadel.com/), adapted for Padel Day constraints. 7 sections total.

### 1. Hero

- **YYP equivalent:** "Jouez au padel. Partout, ensemble."
- Full-width, dark background
- Large heading in Fredoka with lime accent on key words
- Subtitle / slogan: "Play Simple"
- Optional: decorative element (padel ball/racket illustration or image)

### 2. Intro Section

- **YYP equivalent:** "Le padel partout, pour tous"
- Centered text block
- Heading + description paragraph explaining the Padel Day concept
- Padel Day pitch: make padel accessible to everyone, geographically (mid-size cities) and financially
- 2 CTA buttons:
  - Primary (lime bg): e.g. "Découvrir le concept"
  - Secondary (outline/blue): e.g. "Nous contacter"

### 3. Values / Philosophy (4 Cards)

- **YYP equivalent:** "Notre philosophie" (4 cards with icons)
- 4 cards in a grid:
  - **Desktop:** 4 columns
  - **Tablet:** 2×2
  - **Mobile:** horizontal scroll-snap carousel
- Each card: icon + title + short description
- Suggested values (adapt content):
  1. **100% automatisé** — Aucun personnel sur place. Tout fonctionne via smartphone.
  2. **Accessible à tous** — Des tarifs pensés pour tous les budgets.
  3. **Ouvert 7j/7** — De 7h à minuit, réservez quand vous voulez.
  4. **Expérience digitale** — Réservation, paiement, accès : tout depuis votre téléphone.

### 4. How It Works (3 Steps)

- **YYP equivalent:** "L'app comment ça marche ?" (4 steps with phone mockup)
- Padel Day adaptation: **3 steps** (no app, smartphone-based web flow)
- Visual: numbered steps connected by a line/dots, optional phone mockup illustration
- Steps:
  1. **Je réserve mon créneau** — Choisissez votre horaire en ligne, en quelques clics.
  2. **Je paie en ligne** — Paiement sécurisé directement depuis votre smartphone.
  3. **Je joue !** — Recevez un code d'accès unique. Rendez-vous sur le terrain.

### 5. Impact Section

- **YYP equivalent:** "Territoire : un impact positif"
- Two-column layout:
  - **Left:** text block + CTA button
  - **Right:** large image (court photo or illustration)
- Content: explain the local impact — making padel accessible in mid-size cities, creating community, activating underused spaces
- CTA: link to contact page

### 6. CTA Banner

- **YYP equivalent:** "Yes Yes Padel bientôt chez vous ?"
- Full-width colored band (lime or dark background)
- Big heading + 2 buttons
- Example: "Padel Day arrive bientôt" + "En savoir plus" + "Nous contacter"

### 7. FAQ Accordion

- **YYP equivalent:** FAQ section
- Accordion with expand/collapse behavior
- Suggested questions:
  - Comment réserver un terrain ?
  - Faut-il télécharger une application ?
  - Quels sont les horaires d'ouverture ?
  - Comment accéder au terrain ?
  - Quel est le tarif ?
  - Le terrain est-il couvert ?

---

## Notre Site Page (`/notre-site`)

> Mirrors the structure of [yesyespadel.com/nos-sites/chaumes-en-retz](https://www.yesyespadel.com/nos-sites/chaumes-en-retz), adapted for a single court.

Since Padel Day has only one court, there is no listing page with search/map. The nav link "Notre site" goes directly to `/notre-site` — a dedicated page presenting the single court location.

### Section 1: Hero / Header

- **Breadcrumb:** Accueil > Notre site
- **Heading:** "Notre terrain de padel" (or "Notre terrain de padel à [Ville]" once location is public)
- Lime accent on key words in the heading

### Section 2: Site Info Card

- **Status badge:** "Bientôt disponible" (lime badge) — status-driven, switches to "Ouvert" when ready
- **Description:** short paragraph about the court (semi-covered, premium, autonomous access)
- **Info blocks:**
  - **Adresse:** anonymized for now (e.g. "Bientôt révélée" or generic "Votre ville, France")
  - **Prix:** "À partir de X€/h" or "Tarifs bientôt disponibles"
  - **Horaires:** "7j/7, de 7h à minuit"
- **CTA button:** "Réserver" (disabled/coming soon state) or link to contact
- **Map:** embedded map (Mapbox or Google Maps) — hidden or showing approximate area while location is anonymized. Show exact pin when location goes public.

### Section 3: Equipments Grid

- Icon grid (4 items), each with icon + label:
  1. **2 terrains** (court icon)
  2. **Éclairage LED** (lighting icon)
  3. **Gazon synthétique** (turf/grass icon)
  4. **Vitrages panoramiques** (glass/window icon)
- Clean grid layout, 4 columns on desktop, 2×2 on mobile

### Section 4: About / Partnership Section

- **YYP equivalent:** Club de tennis partnership section
- Two-column layout: image left + text right (or reverse)
- Content: describe the Padel Day concept locally — automated, community-focused, accessible
- Since no local club partnership exists yet, this can be a general "Notre vision" or "Le concept Padel Day" section
- CTA: link to contact or social media

### Section 5: Pricing Section (Placeholder)

- **Heading:** "Bientôt, découvrez nos offres..."
- Placeholder/teaser section — can be expanded later when pricing is confirmed
- Status-driven: empty teaser when "coming soon", shows actual pricing cards when "open"

### Section 6: How It Works (3 Steps)

- Same 3-step flow as homepage (reusable component):
  1. **Je réserve mon créneau**
  2. **Je paie en ligne**
  3. **Je joue !**
- Adapted intro text: "Comment ça marche ?"

### Section 7: Court Quality

- **YYP equivalent:** "Les terrains Yes Yes Padel"
- Text + image layout
- Content: describe court quality — synthetic turf, LED lighting, panoramic glass, semi-covered structure
- Emphasize premium experience and durability

### Section 8: CTA Banner

- **Heading:** "Padel Day arrive bientôt"
- CTA: "Nous contacter" → link to `/contact`

---

## Contact Page (`/contact`)

- Heading: "Contactez-nous"
- Contact form:
  - Fields: Nom, Email, Message
  - Submit button (lime CTA)
  - On success: toast notification "Message envoyé !"
- Sidebar or below form:
  - Email: `contact@padelday.fr`
  - Social links: Instagram, Facebook

---

## Footer

- **Social icons:** Instagram + Facebook
- **Link columns:**
  - Le concept
  - Notre site
  - Contact
  - Mentions légales (future page)
- **Copyright:** © 2026 Padel Day. Tous droits réservés.
- No newsletter form

---

## Design Guidelines

### Layout
- Full-width sections
- Fixed top navigation with backdrop blur
- Smooth vertical scroll between sections
- Airy design with generous whitespace
- Responsive: desktop → tablet → mobile

### Typography
- **Headings:** Fredoka, bold, large sizes
- **Body:** Poppins, regular weight, readable size (16-18px base)
- Short, punchy copy — "3 étapes. C'est tout."
- Key words highlighted in lime (`#d6fd26`) within dark headings

### Colors
- **Backgrounds:** alternate between white, dark (`#1a1a2e`), and subtle grays
- **CTA buttons:** lime `#d6fd26` with dark text
- **Secondary buttons:** blue `#3164d5` outline or filled
- **Text:** dark on light sections, white on dark sections

### Animations (optional)
- Sections fade in on scroll
- Value cards subtle hover lift
- FAQ accordion smooth open/close transition

---

## Reference Sites

### Liked (design inspiration)
- [Yes Yes Padel](https://www.yesyespadel.com/) — **primary reference for structure**
- [Pure Padel](https://www.purepadel.fr/)
- [La Cancha Padel Club](https://lacanchapadel.fr/)

### Disliked (avoid this style)
- Haut Padel 25
- L-PAD-L
- Padel Saint-Gaudens

---

## Technical Notes

### SEO
- Local SEO is important (proximity-based player acquisition)
- Meta titles and descriptions for each page
- Dynamic sitemap
- Structured data (LocalBusiness schema)
- `lang="fr"` on HTML tag

### Analytics
- Google Analytics to be installed

### Social
- Instagram and Facebook links in footer and contact page
- Open Graph meta tags with brand image

### Domain
- No domain reserved yet — to be configured
- Contact email: `contact@padelday.fr`

### Content
- No professional photos or videos available yet — use illustrations or stock/placeholder images
- Existing copy from prototype (padel-day.lovable.app) to be reworked for the new site
- All text content should be CMS-editable

---

## Pages Summary

| Route | Description |
|-------|-------------|
| `/` | Homepage — 7 sections (Hero, Intro, Values, How It Works, Impact, CTA Banner, FAQ) |
| `/notre-site` | Single court presentation page — 8 sections (Hero, Info Card, Equipments, About, Pricing placeholder, How It Works, Court Quality, CTA) |
| `/contact` | Contact form + info |
| `/[slug]` | Generic pages (mentions légales, etc.) |

---

## Not Included (for now)
- ~~Blog~~ — not needed
- ~~Testimonials~~ — no testimonials available yet
- ~~Pricing page~~ — not ready to communicate
- ~~Newsletter~~ — not needed
- ~~Mobile app~~ — doesn't exist yet
- ~~Multi-court/multi-site~~ — only 1 court for now, `/notre-site` is a single page (no listing/search)
