import {defineField, defineType} from 'sanity'

export const dnaCard = defineType({
  name: 'dnaCard',
  title: 'DNA Card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Map / Community', value: 'map'},
          {title: 'Court / Sun', value: 'court'},
          {title: 'Coins / Wallet', value: 'coins'},
          {title: 'Racket / Users', value: 'racket'},
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
