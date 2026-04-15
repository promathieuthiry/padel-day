import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'contact', title: 'Contact & social'},
  ],
  fields: [
    // ── General ────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Site description',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: 'Base URL for Open Graph metadata.',
        }),
      ],
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      group: 'general',
    }),

    // ── Navigation ─────────────────────────────────────────
    defineField({
      name: 'navLinks',
      title: 'Main navigation links',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      group: 'navigation',
    }),

    // ── Footer ─────────────────────────────────────────────
    defineField({
      name: 'footerEyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label next to the lime pulse (e.g. "Padel Day · Automated courts").',
      group: 'footer',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      description: 'Short paragraph shown under the logo.',
      group: 'footer',
    }),
    defineField({
      name: 'footerContactLabel',
      title: 'Contact column heading',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerNavLabel',
      title: 'Navigation column heading',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerContactCtaLabel',
      title: 'Contact CTA label',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      group: 'footer',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerCredit',
      title: 'Credit line',
      type: 'object',
      description: 'Small "Made with ❤️ by ..." line at the bottom of the footer.',
      options: {collapsible: true, collapsed: true},
      group: 'footer',
      fields: [
        defineField({name: 'prefix', title: 'Prefix text', type: 'string'}),
        defineField({name: 'suffix', title: 'Text between heart and name', type: 'string'}),
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'url', title: 'Link URL', type: 'url'}),
      ],
    }),

    // ── Contact & social ───────────────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'contact',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
