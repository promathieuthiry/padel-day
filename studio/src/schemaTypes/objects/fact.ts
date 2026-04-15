import {defineField, defineType} from 'sanity'

export const fact = defineType({
  name: 'fact',
  title: 'Fact',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label (eyebrow)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'target',
      title: 'Target number',
      type: 'number',
      description: 'Animated figure (e.g. 17, 100, 7).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'Shown after the number (e.g. "h", "%", "J").',
    }),
    defineField({
      name: 'subline',
      title: 'Subline',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'label', target: 'target', suffix: 'suffix', subtitle: 'subline'},
    prepare: ({title, target, suffix, subtitle}) => ({
      title: `${title ?? 'Fact'} — ${target ?? ''}${suffix ?? ''}`,
      subtitle,
    }),
  },
})
