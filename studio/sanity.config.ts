/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() resolves the URL path for different document types
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'homePage':
      return '/'
    case 'installerPage':
      return '/installer-un-terrain'
    case 'notreSitePage':
      return '/notre-site'
    case 'aProposPage':
      return '/a-propos'
    case 'contactPage':
      return '/contact'
    case 'page':
      return slug ? `/${slug}` : undefined
    default:
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Sanity + Next.js Starter Template',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "homePage"`,
          },
          {
            route: '/installer-un-terrain',
            filter: `_type == "installerPage"`,
          },
          {
            route: '/notre-site',
            filter: `_type == "notreSitePage"`,
          },
          {
            route: '/a-propos',
            filter: `_type == "aProposPage"`,
          },
          {
            route: '/contact',
            filter: `_type == "contactPage"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          homePage: defineLocations({
            locations: [homeLocation],
            message: 'Home page',
            tone: 'positive',
          }),
          installerPage: defineLocations({
            locations: [{title: 'Installer un terrain', href: '/installer-un-terrain'}],
          }),
          notreSitePage: defineLocations({
            locations: [{title: 'Notre Site', href: '/notre-site'}],
          }),
          aProposPage: defineLocations({
            locations: [{title: 'À Propos', href: '/a-propos'}],
          }),
          contactPage: defineLocations({
            locations: [{title: 'Contact', href: '/contact'}],
          }),
          page: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
