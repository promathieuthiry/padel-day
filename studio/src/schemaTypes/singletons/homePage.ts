import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {name: 'meta', title: 'SEO / Metadata'},
    {name: 'hero', title: 'Hero Section'},
    {name: 'intro', title: 'Introduction Section'},
    {name: 'values', title: 'Values Section'},
    {name: 'howItWorks', title: 'How It Works Section'},
    {name: 'impact', title: 'Impact Section'},
    {name: 'ctaBanner', title: 'CTA Banner Section'},
  ],
  fields: [
    // Meta
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'meta',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      fieldset: 'meta',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      fieldset: 'meta',
    }),

    // Hero
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroHighlightWords',
      title: 'Hero Highlight Words',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSlogan',
      title: 'Hero Slogan',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'hero',
    }),

    // Intro
    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      fieldset: 'intro',
    }),
    defineField({
      name: 'introBody',
      title: 'Intro Body',
      type: 'blockContent',
      fieldset: 'intro',
    }),
    defineField({
      name: 'introPrimaryCta',
      title: 'Intro Primary CTA',
      type: 'cta',
      fieldset: 'intro',
    }),
    defineField({
      name: 'introSecondaryCta',
      title: 'Intro Secondary CTA',
      type: 'cta',
      fieldset: 'intro',
    }),

    // Values
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [defineArrayMember({type: 'valueCard'})],
      fieldset: 'values',
    }),

    // How It Works
    defineField({
      name: 'howItWorksHeading',
      title: 'Heading',
      type: 'string',
      fieldset: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSteps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'step'})],
      fieldset: 'howItWorks',
    }),

    // Impact
    defineField({
      name: 'impactHeading',
      title: 'Heading',
      type: 'string',
      fieldset: 'impact',
    }),
    defineField({
      name: 'impactBody',
      title: 'Body',
      type: 'blockContent',
      fieldset: 'impact',
    }),
    defineField({
      name: 'impactCta',
      title: 'Impact CTA',
      type: 'cta',
      fieldset: 'impact',
    }),
    defineField({
      name: 'impactImage',
      title: 'Impact Image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'impact',
    }),

    // CTA Banner
    defineField({
      name: 'ctaBannerHeading',
      title: 'Heading',
      type: 'string',
      fieldset: 'ctaBanner',
    }),
    defineField({
      name: 'ctaBannerPrimaryCta',
      title: 'Primary CTA',
      type: 'cta',
      fieldset: 'ctaBanner',
    }),
    defineField({
      name: 'ctaBannerSecondaryCta',
      title: 'Secondary CTA',
      type: 'cta',
      fieldset: 'ctaBanner',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
