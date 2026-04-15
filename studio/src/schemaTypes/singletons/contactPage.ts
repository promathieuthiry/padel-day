import {defineArrayMember, defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'form', title: 'Form'},
    {name: 'channels', title: 'Channels'},
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

    // ── Hero ───────────────────────────────────────────────
    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'hero'}),
    defineField({name: 'introBody', title: 'Intro body', type: 'blockContent', group: 'hero'}),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      description: 'Small label + value pairs shown next to the headline (e.g. Réponse / Sous 48h).',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
      group: 'hero',
    }),

    // ── Form ───────────────────────────────────────────────
    defineField({name: 'formEyebrow', title: 'Eyebrow', type: 'string', group: 'form'}),
    defineField({name: 'formHeading', title: 'Heading', type: 'string', group: 'form'}),
    defineField({
      name: 'formBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'form',
    }),

    // ── Channels ───────────────────────────────────────────
    defineField({name: 'channelsEyebrow', title: 'Eyebrow', type: 'string', group: 'channels'}),
    defineField({name: 'channelsHeading', title: 'Heading', type: 'string', group: 'channels'}),
    defineField({
      name: 'channelsBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'channels',
    }),
    defineField({
      name: 'channelLabels',
      title: 'Channel labels',
      type: 'object',
      description: 'Per-channel row labels. The values themselves come from Site Settings.',
      group: 'channels',
      fields: [
        defineField({name: 'email', title: 'Email label', type: 'string'}),
        defineField({name: 'instagram', title: 'Instagram label', type: 'string'}),
        defineField({name: 'facebook', title: 'Facebook label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'reassurance',
      title: 'Reassurance card',
      type: 'object',
      description: 'Small dark card shown under the channels list.',
      options: {collapsible: true, collapsed: true},
      group: 'channels',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'body', title: 'Body', type: 'text', rows: 2}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact'}
    },
  },
})
