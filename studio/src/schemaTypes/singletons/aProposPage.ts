import {defineArrayMember, defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const aProposPage = defineType({
  name: 'aProposPage',
  title: 'A Propos',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'hero', title: 'Hero / Story', default: true},
    {name: 'team', title: 'Team'},
    {name: 'mission', title: 'Mission'},
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

    // ── Hero / Story ───────────────────────────────────────
    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero'}),
    defineField({name: 'storyHeading', title: 'Heading', type: 'string', group: 'hero'}),
    defineField({name: 'storyBody', title: 'Body', type: 'blockContent', group: 'hero'}),
    defineField({
      name: 'storyImage',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
      ],
      group: 'hero',
    }),

    // ── Team ───────────────────────────────────────────────
    defineField({
      name: 'teamHeading',
      title: 'Team eyebrow',
      description: 'Small label above the founder name (e.g. "Le fondateur").',
      type: 'string',
      group: 'team',
    }),

    // ── Mission ────────────────────────────────────────────
    defineField({name: 'missionEyebrow', title: 'Eyebrow', type: 'string', group: 'mission'}),
    defineField({name: 'missionHeading', title: 'Heading', type: 'string', group: 'mission'}),
    defineField({
      name: 'missionBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'mission',
    }),
    defineField({
      name: 'missionCards',
      title: 'Mission cards',
      type: 'array',
      of: [defineArrayMember({type: 'missionCard'})],
      group: 'mission',
    }),

    // ── CTA ────────────────────────────────────────────────
    defineField({name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta'}),
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({
      name: 'ctaBody',
      title: 'Body',
      type: 'text',
      rows: 3,
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
      return {title: 'A Propos'}
    },
  },
})
