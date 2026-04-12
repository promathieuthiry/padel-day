import {defineArrayMember, defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const aProposPage = defineType({
  name: 'aProposPage',
  title: 'A Propos',
  type: 'document',
  icon: UsersIcon,
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
      name: 'storyHeading',
      title: 'Story Heading',
      type: 'string',
    }),
    defineField({
      name: 'storyBody',
      title: 'Story Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'teamHeading',
      title: 'Team Heading',
      type: 'string',
    }),
    defineField({
      name: 'missionHeading',
      title: 'Mission Heading',
      type: 'string',
    }),
    defineField({
      name: 'missionCards',
      title: 'Mission Cards',
      type: 'array',
      of: [defineArrayMember({type: 'missionCard'})],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'A Propos',
      }
    },
  },
})
