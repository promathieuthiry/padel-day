import {defineArrayMember, defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const notreSitePage = defineType({
  name: 'notreSitePage',
  title: 'Notre Site',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'courtImage',
      title: 'Court Image',
      type: 'image',
      options: {hotspot: true},
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
    }),
    defineField({
      name: 'statusLabel',
      title: 'Status Label',
      type: 'string',
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({type: 'feature'})],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Notre Site',
      }
    },
  },
})
