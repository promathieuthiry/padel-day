import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'facts', title: 'Facts'},
    {name: 'howItWorks', title: 'How it works'},
    {name: 'impact', title: 'Impact'},
    {name: 'ctaBanner', title: 'CTA banner'},
    {name: 'faq', title: 'FAQ'},
    {name: 'meta', title: 'SEO'},
  ],
  fields: [
    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'meta',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      group: 'meta',
    }),

    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the headline (e.g. "Padel automatisé").',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Headline',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroHighlightWords',
      title: 'Highlighted words',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Words from the headline to underline in lime.',
      group: 'hero',
    }),
    defineField({
      name: 'heroSlogan',
      title: 'Slogan / subtitle',
      type: 'string',
      group: 'hero',
    }),
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
    defineField({
      name: 'heroCredentialsChip',
      title: 'Credentials chip',
      type: 'object',
      description: 'Small floating card shown below the hero image.',
      options: {collapsible: true, collapsed: true},
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'text', title: 'Text', type: 'text', rows: 2}),
      ],
    }),

    // ── Facts ──────────────────────────────────────────────
    defineField({
      name: 'factsEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'facts',
    }),
    defineField({
      name: 'factsHeading',
      title: 'Heading',
      type: 'string',
      group: 'facts',
    }),
    defineField({
      name: 'factsBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'facts',
    }),
    defineField({
      name: 'factsItems',
      title: 'Facts',
      type: 'array',
      description: '3 key numbers displayed as animated counters.',
      of: [defineArrayMember({type: 'fact'})],
      validation: (rule) => rule.max(3),
      group: 'facts',
    }),

    // ── How It Works ───────────────────────────────────────
    defineField({
      name: 'howItWorksEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksHeading',
      title: 'Heading',
      type: 'string',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSteps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'step'})],
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksImage',
      title: 'Decorative image',
      type: 'image',
      options: {hotspot: true},
      group: 'howItWorks',
    }),

    // ── Impact ─────────────────────────────────────────────
    defineField({
      name: 'impactEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'impact',
    }),
    defineField({
      name: 'impactHeading',
      title: 'Heading',
      type: 'string',
      group: 'impact',
    }),
    defineField({
      name: 'impactBody',
      title: 'Body',
      type: 'blockContent',
      group: 'impact',
    }),
    defineField({
      name: 'impactCta',
      title: 'CTA',
      type: 'cta',
      group: 'impact',
    }),
    defineField({
      name: 'impactImage',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      group: 'impact',
    }),

    // ── CTA Banner ─────────────────────────────────────────
    defineField({
      name: 'ctaBannerEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'ctaBanner',
    }),
    defineField({
      name: 'ctaBannerHeading',
      title: 'Heading',
      type: 'string',
      group: 'ctaBanner',
    }),
    defineField({
      name: 'ctaBannerPrimaryCta',
      title: 'Primary CTA',
      type: 'object',
      group: 'ctaBanner',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
    defineField({
      name: 'ctaBannerSecondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      group: 'ctaBanner',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
    // ── FAQ ────────────────────────────────────────────────
    defineField({
      name: 'faqEyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the FAQ heading (e.g. "Questions fréquentes").',
      group: 'faq',
    }),
    defineField({
      name: 'faqHeading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the FAQ section.',
      group: 'faq',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
