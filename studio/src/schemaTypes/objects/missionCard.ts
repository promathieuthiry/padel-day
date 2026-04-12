import {defineField, defineType} from 'sanity'

export const missionCard = defineType({
  name: 'missionCard',
  title: 'Mission Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
