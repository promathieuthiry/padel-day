import {defineArrayMember, defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const installerPage = defineType({
  name: 'installerPage',
  title: 'Installer un terrain',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'steps', title: 'Steps'},
    {name: 'benefits', title: 'Benefits'},
    {name: 'features', title: 'Features'},
    {name: 'cta', title: 'CTA'},
    {name: 'meta', title: 'SEO'},
  ],
  fields: [
    // ── SEO ────────────────────────────────────────────────
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', group: 'meta'}),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'meta',
    }),
    defineField({name: 'ogImage', title: 'OG image', type: 'image', group: 'meta'}),

    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the headline.',
      group: 'hero',
    }),
    defineField({name: 'heroHeading', title: 'Headline', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroHighlightWords',
      title: 'Highlighted words',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'hero',
    }),
    defineField({name: 'heroBody', title: 'Body', type: 'blockContent', group: 'hero'}),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
        }),
      ],
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),

    // ── Steps ──────────────────────────────────────────────
    defineField({name: 'stepsEyebrow', title: 'Eyebrow', type: 'string', group: 'steps'}),
    defineField({name: 'stepsHeading', title: 'Heading', type: 'string', group: 'steps'}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'step'})],
      group: 'steps',
    }),

    // ── Benefits ───────────────────────────────────────────
    defineField({name: 'benefitsEyebrow', title: 'Eyebrow', type: 'string', group: 'benefits'}),
    defineField({name: 'benefitsHeading', title: 'Heading', type: 'string', group: 'benefits'}),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [defineArrayMember({type: 'benefit'})],
      group: 'benefits',
    }),

    // ── Features ───────────────────────────────────────────
    defineField({name: 'featuresEyebrow', title: 'Eyebrow', type: 'string', group: 'features'}),
    defineField({name: 'featuresHeading', title: 'Heading', type: 'string', group: 'features'}),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({type: 'feature'})],
      group: 'features',
    }),

    // ── CTA ────────────────────────────────────────────────
    defineField({name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta'}),
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({name: 'ctaBody', title: 'Body', type: 'blockContent', group: 'cta'}),
    defineField({name: 'cta', title: 'Primary CTA', type: 'cta', group: 'cta'}),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Installer un terrain'}
    },
  },
})
