import {page} from './documents/page'
import {faqItem} from './documents/faqItem'
import {teamMember} from './documents/teamMember'
import {contactSubmission} from './documents/contactSubmission'
import {settings} from './singletons/settings'
import {homePage} from './singletons/homePage'
import {installerPage} from './singletons/installerPage'
import {notreSitePage} from './singletons/notreSitePage'
import {aProposPage} from './singletons/aProposPage'
import {contactPage} from './singletons/contactPage'
import {blockContent} from './objects/blockContent'
import {link} from './objects/link'
import {cta} from './objects/cta'
import {step} from './objects/step'
import {benefit} from './objects/benefit'
import {feature} from './objects/feature'
import {missionCard} from './objects/missionCard'
import {fact} from './objects/fact'
import {dnaCard} from './objects/dnaCard'

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  installerPage,
  notreSitePage,
  aProposPage,
  contactPage,
  // Documents
  page,
  faqItem,
  teamMember,
  contactSubmission,
  // Objects
  blockContent,
  link,
  cta,
  step,
  benefit,
  feature,
  missionCard,
  fact,
  dnaCard,
]
