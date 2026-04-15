import {defineArrayMember, defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const notreSitePage = defineType({
  name: 'notreSitePage',
  title: 'Notre Site',
  type: 'document',
  icon: PinIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'features', title: 'Features'},
    {name: 'description', title: 'Description'},
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
    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'hero'}),
    defineField({
      name: 'courtImage',
      title: 'Court image',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Coming Soon', value: 'coming_soon'},
          {title: 'Open', value: 'open'},
        ],
      },
      group: 'hero',
    }),
    defineField({name: 'statusLabel', title: 'Status label', type: 'string', group: 'hero'}),
    defineField({
      name: 'statusEyebrow',
      title: 'Status eyebrow',
      type: 'string',
      description: 'Small label above the status badge (default: "Statut").',
      group: 'hero',
    }),
    defineField({name: 'locationLabel', title: 'Location value', type: 'string', group: 'hero'}),
    defineField({
      name: 'locationEyebrow',
      title: 'Location eyebrow',
      type: 'string',
      description: 'Small label above the location value (default: "Localisation").',
      group: 'hero',
    }),

    // ── Features ───────────────────────────────────────────
    defineField({name: 'featuresEyebrow', title: 'Eyebrow', type: 'string', group: 'features'}),
    defineField({name: 'featuresHeading', title: 'Heading', type: 'string', group: 'features'}),
    defineField({
      name: 'featuresBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'features',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({type: 'feature'})],
      group: 'features',
    }),

    // ── Description ────────────────────────────────────────
    defineField({
      name: 'descriptionEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'description',
    }),
    defineField({
      name: 'descriptionHeading',
      title: 'Heading',
      type: 'string',
      group: 'description',
    }),
    defineField({
      name: 'description',
      title: 'Body',
      type: 'blockContent',
      group: 'description',
    }),

    // ── CTA ────────────────────────────────────────────────
    defineField({name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta'}),
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({
      name: 'ctaBody',
      title: 'Body',
      type: 'text',
      rows: 4,
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
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
      return {title: 'Notre Site'}
    },
  },
})
