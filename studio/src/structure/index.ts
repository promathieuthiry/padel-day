import {
  CogIcon,
  HomeIcon,
  RocketIcon,
  PinIcon,
  UsersIcon,
  EnvelopeIcon,
  DocumentIcon,
  HelpCircleIcon,
} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = new Set([
  'settings',
  'homePage',
  'installerPage',
  'notreSitePage',
  'aProposPage',
  'contactPage',
])

const HIDDEN_TYPES = new Set([
  ...SINGLETON_TYPES,
  'faqItem',
  'teamMember',
  'page',
  'contactSubmission',
])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // Pages group
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('homePage').title('Home Page').icon(HomeIcon),
              S.documentTypeListItem('installerPage')
                .title('Installer un terrain')
                .icon(RocketIcon),
              S.documentTypeListItem('notreSitePage').title('Notre Site').icon(PinIcon),
              S.documentTypeListItem('aProposPage').title('A Propos').icon(UsersIcon),
              S.documentTypeListItem('contactPage').title('Contact').icon(EnvelopeIcon),
            ]),
        ),

      S.divider(),

      // Content group
      S.listItem()
        .title('Content')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('faqItem').title('FAQ Items').icon(HelpCircleIcon),
              S.documentTypeListItem('teamMember').title('Team Members').icon(UsersIcon),
              S.documentTypeListItem('page').title('Generic Pages').icon(DocumentIcon),
            ]),
        ),

      S.divider(),

      // Contact Submissions
      S.documentTypeListItem('contactSubmission')
        .title('Contact Submissions')
        .icon(EnvelopeIcon),

      S.divider(),

      // Site Settings
      S.documentTypeListItem('settings').title('Site Settings').icon(CogIcon),

      // Include any remaining types not explicitly listed
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.has(item.getId()!),
      ),
    ])
