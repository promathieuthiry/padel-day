# Quickstart: Padel Day Website

## Prerequisites

- Node.js 24 LTS
- A Sanity project (already configured — see `studio/sanity.config.ts`)
- Vercel account (for deployment)

## Setup

```bash
# Install dependencies (from repo root)
npm install

# Copy environment variables
cp frontend/.env.example frontend/.env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
# SANITY_API_READ_TOKEN

# Start both frontend and studio
npm run dev
```

This starts:
- Next.js frontend at `http://localhost:3000`
- Sanity Studio at `http://localhost:3333`

## Populate Content

1. Open Sanity Studio at `http://localhost:3333`
2. Create singletons: Site Settings, Home Page, Installer Page,
   Notre Site Page, À Propos Page, Contact Page
3. Create FAQ items and Team Members as documents
4. Create legal pages (Mentions légales, Politique de confidentialité)
   using the Page document type
5. Publish all documents

## Verify

1. Open `http://localhost:3000` — homepage with 7 sections
2. Navigate to `/installer-un-terrain` — B2B installation page
3. Navigate to `/notre-site` — court detail with status badge
4. Navigate to `/a-propos` — team and mission
5. Navigate to `/contact` — form submission works, toast appears
6. Navigate to `/mentions-legales` — legal content renders
7. Test mobile viewport (375px) — hamburger menu, scroll-snap cards
8. Verify all text content updates when changed in Studio

## Deploy

```bash
# Deploy via Vercel CLI or push to linked Git repo
vercel --prod
```

## Type Generation

```bash
# Regenerate Sanity types after schema changes
npm run sanity:typegen --workspace=frontend
```
