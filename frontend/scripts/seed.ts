/**
 * Seed script for Padel Day Sanity CMS
 *
 * Populates the CMS with realistic French content for all document types.
 * Uses createOrReplace so the script is idempotent — safe to run multiple times.
 *
 * Usage: npx tsx scripts/seed.ts
 */

import {createClient} from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error(
    'Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET',
  )
  process.exit(1)
}

if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN environment variable.\n' +
    'Create a write token at https://www.sanity.io/manage/project/' + projectId + '/api#tokens\n' +
    'Then add it to frontend/.env.local as SANITY_API_WRITE_TOKEN=sk...',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-09-25',
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let keyCounter = 0
function key(): string {
  keyCounter++
  return `key_${keyCounter}`
}

/** Build a single Portable Text block from a plain string. */
function textBlock(text: string, style: string = 'normal') {
  return {
    _type: 'block' as const,
    _key: key(),
    style,
    markDefs: [],
    children: [{_type: 'span' as const, _key: key(), text, marks: []}],
  }
}

/** Build an array of Portable Text blocks, one per paragraph. */
function blockContent(text: string) {
  return text.split('\n').map((paragraph) => textBlock(paragraph.trim()))
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

const siteSettings = {
  _id: 'siteSettings',
  _type: 'settings',
  title: 'Padel Day',
  description:
    'Le padel accessible à tous. Réservez, payez, jouez — tout depuis votre smartphone.',
  contactEmail: 'contact@padelday.fr',
  copyrightText: '© 2026 Padel Day. Tous droits réservés.',
  socialInstagram: 'https://instagram.com/padelday',
  socialFacebook: 'https://facebook.com/padelday',
  navLinks: [
    {_type: 'link', _key: key(), linkType: 'href', href: '/#concept', title: 'Le concept'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/installer-un-terrain', title: 'Installer un terrain'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/notre-site', title: 'Notre site'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/a-propos', title: 'À propos'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/contact', title: 'Contact'},
  ],
  footerLinks: [
    {_type: 'link', _key: key(), linkType: 'href', href: '/#concept', title: 'Le concept'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/installer-un-terrain', title: 'Installer un terrain'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/notre-site', title: 'Notre site'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/a-propos', title: 'À propos'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/contact', title: 'Contact'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/mentions-legales', title: 'Mentions légales'},
    {_type: 'link', _key: key(), linkType: 'href', href: '/politique-de-confidentialite', title: 'Politique de confidentialité'},
  ],
}

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  metaTitle: 'Padel Day — Play Simple',
  metaDescription:
    'Padel Day rend le padel accessible à tous. Découvrez notre concept de complexe 100% automatisé, ouvert 7j/7.',
  heroHeading: 'Le padel, simplement.',
  heroHighlightWords: ['padel', 'simplement'],
  heroSlogan: 'Play Simple',
  introHeading: 'Le padel accessible à tous',
  introBody: blockContent(
    "Padel Day, c'est un concept unique : un complexe de padel 100% automatisé, ouvert 7 jours sur 7, de 7h à minuit. Pas de personnel sur place, tout se fait depuis votre smartphone. Notre mission ? Rendre le padel accessible partout, dans les villes moyennes comme dans les grandes métropoles.",
  ),
  introPrimaryCta: {
    _type: 'cta',
    label: 'Découvrir le concept',
    href: '/#concept',
    style: 'primary',
  },
  introSecondaryCta: {
    _type: 'cta',
    label: 'Nous contacter',
    href: '/contact',
    style: 'secondary',
  },
  values: [
    {
      _type: 'valueCard',
      _key: key(),
      icon: 'smartphone',
      title: '100% automatisé',
      description:
        'Aucun personnel sur place. Réservation, paiement et accès au terrain se font entièrement via smartphone.',
    },
    {
      _type: 'valueCard',
      _key: key(),
      icon: 'heart',
      title: 'Accessible à tous',
      description:
        "Des tarifs pensés pour tous les budgets, dans des villes où le padel n'existait pas encore.",
    },
    {
      _type: 'valueCard',
      _key: key(),
      icon: 'calendar',
      title: 'Ouvert 7j/7',
      description:
        'De 7h à minuit, 365 jours par an. Jouez quand vous voulez, sans contrainte horaire.',
    },
    {
      _type: 'valueCard',
      _key: key(),
      icon: 'lightning',
      title: 'Expérience digitale',
      description:
        'Réservation en ligne, paiement sécurisé, code d\'accès unique. Tout depuis votre téléphone.',
    },
  ],
  howItWorksHeading: 'Comment ça marche ?',
  howItWorksSteps: [
    {
      _type: 'step',
      _key: key(),
      number: 1,
      title: 'Je réserve',
      description:
        'Choisissez votre créneau en ligne, en quelques clics. Disponibilités en temps réel.',
    },
    {
      _type: 'step',
      _key: key(),
      number: 2,
      title: 'Je paie',
      description:
        'Paiement sécurisé directement depuis votre smartphone. Partagez les frais entre joueurs.',
    },
    {
      _type: 'step',
      _key: key(),
      number: 3,
      title: 'Je joue !',
      description:
        "Recevez un code d'accès unique par SMS. Rendez-vous sur le terrain et profitez de votre match.",
    },
  ],
  impactHeading: 'Un impact local positif',
  impactBody: blockContent(
    "Padel Day s'installe dans les villes moyennes pour créer du lien social et valoriser des espaces sous-exploités. Nos terrains deviennent des lieux de rencontre, de sport et de convivialité, accessibles à tous les habitants.",
  ),
  impactCta: {
    _type: 'cta',
    label: 'Installer un terrain',
    href: '/installer-un-terrain',
    style: 'primary',
  },
  ctaBannerHeading: 'Padel Day arrive bientôt près de chez vous',
  ctaBannerPrimaryCta: {
    _type: 'cta',
    label: 'En savoir plus',
    href: '/installer-un-terrain',
    style: 'primary',
  },
  ctaBannerSecondaryCta: {
    _type: 'cta',
    label: 'Nous contacter',
    href: '/contact',
    style: 'secondary',
  },
}

const installerPage = {
  _id: 'installerPage',
  _type: 'installerPage',
  metaTitle: 'Installer un terrain de padel | Padel Day',
  metaDescription:
    'Installez un terrain de padel automatisé dans votre commune ou club. Solution clé en main, sans investissement.',
  heroHeading: 'Installez un terrain de padel dans votre commune',
  heroHighlightWords: ['terrain de padel'],
  heroBody: blockContent(
    "Padel Day propose une solution clé en main pour les collectivités et clubs sportifs. Nous installons, équipons et gérons un complexe de padel 100% automatisé, sans aucun investissement de votre part.",
  ),
  stepsHeading: 'Un projet en 5 étapes',
  steps: [
    {
      _type: 'step',
      _key: key(),
      number: 1,
      title: 'Prise de contact',
      description:
        'Échangeons sur votre projet et identifions ensemble le meilleur emplacement.',
    },
    {
      _type: 'step',
      _key: key(),
      number: 2,
      title: 'Étude de faisabilité',
      description:
        'Nous analysons le terrain, les accès et la demande locale pour valider le projet.',
    },
    {
      _type: 'step',
      _key: key(),
      number: 3,
      title: 'Installation',
      description:
        'Construction et installation du complexe en 8 à 12 semaines.',
    },
    {
      _type: 'step',
      _key: key(),
      number: 4,
      title: 'Mise en service',
      description:
        'Configuration du système de réservation, tests et mise en service du terrain.',
    },
    {
      _type: 'step',
      _key: key(),
      number: 5,
      title: 'Exploitation',
      description:
        "Padel Day gère l'exploitation au quotidien : maintenance, réservations, service client.",
    },
  ],
  benefitsHeading: 'Les avantages pour votre collectivité',
  benefits: [
    {
      _type: 'benefit',
      _key: key(),
      icon: 'shield',
      title: 'Aucun investissement',
      description:
        "Padel Day finance l'intégralité du projet. Zéro coût pour la commune ou le club.",
    },
    {
      _type: 'benefit',
      _key: key(),
      icon: 'star',
      title: 'Solution clé en main',
      description:
        "De l'étude de faisabilité à l'exploitation quotidienne, nous gérons tout.",
    },
    {
      _type: 'benefit',
      _key: key(),
      icon: 'lightning',
      title: 'Entretien inclus',
      description:
        'Maintenance préventive et curative assurée par nos équipes techniques.',
    },
    {
      _type: 'benefit',
      _key: key(),
      icon: 'heart',
      title: 'Lien social',
      description:
        'Offrez à vos habitants un nouvel espace sportif et de convivialité.',
    },
  ],
  featuresHeading: 'Des terrains premium',
  features: [
    {_type: 'feature', _key: key(), label: 'Gazon synthétique de dernière génération'},
    {_type: 'feature', _key: key(), label: 'Éclairage LED basse consommation'},
    {_type: 'feature', _key: key(), label: 'Vitrage panoramique'},
    {_type: 'feature', _key: key(), label: "Système d'accès automatisé"},
    {_type: 'feature', _key: key(), label: 'Réservation en ligne 24h/24'},
  ],
  ctaHeading: 'Prêt à accueillir le padel dans votre ville ?',
  cta: {
    _type: 'cta',
    label: 'Contactez-nous',
    href: '/contact',
    style: 'primary',
  },
}

const notreSitePage = {
  _id: 'notreSitePage',
  _type: 'notreSitePage',
  metaTitle: 'Notre terrain de padel | Padel Day',
  metaDescription:
    'Découvrez notre terrain de padel premium : gazon synthétique, éclairage LED, vitrage panoramique. Bientôt disponible.',
  heading: 'Notre terrain',
  description: blockContent(
    "Un complexe de padel flambant neuf, conçu pour offrir la meilleure expérience de jeu. Nos 2 terrains premium sont équipés des dernières technologies pour un confort de jeu optimal, de jour comme de nuit.",
  ),
  status: 'coming_soon',
  statusLabel: 'Bientôt disponible',
  locationLabel: "Ouest de la France",
  features: [
    {_type: 'feature', _key: key(), label: '2 terrains premium'},
    {_type: 'feature', _key: key(), label: 'Gazon synthétique dernière génération'},
    {_type: 'feature', _key: key(), label: 'Éclairage LED'},
    {_type: 'feature', _key: key(), label: 'Vitrage panoramique'},
    {_type: 'feature', _key: key(), label: 'Accès 7j/7 de 7h à minuit'},
    {_type: 'feature', _key: key(), label: 'Parking gratuit'},
  ],
}

const aProposPage = {
  _id: 'aProposPage',
  _type: 'aProposPage',
  metaTitle: 'À propos | Padel Day',
  metaDescription:
    "Découvrez l'équipe et la mission de Padel Day. Rendre le padel accessible à tous, partout.",
  storyHeading: 'Notre histoire',
  storyBody: blockContent(
    "Padel Day est né d'un constat simple : le padel est le sport de raquette qui connaît la plus forte croissance en Europe, mais il reste concentré dans les grandes villes. Notre ambition est de démocratiser ce sport en l'apportant là où il n'existe pas encore, grâce à un modèle 100% automatisé qui rend l'exploitation viable même dans les villes moyennes.",
  ),
  teamHeading: "L'équipe",
  missionHeading: 'Notre mission',
  missionCards: [
    {
      _type: 'missionCard',
      _key: key(),
      title: 'Notre vision',
      body: 'Un terrain de padel à moins de 20 minutes de chaque Français.',
    },
    {
      _type: 'missionCard',
      _key: key(),
      title: 'Notre mission',
      body: "Rendre le padel accessible à tous, partout, grâce à la technologie et l'automatisation.",
    },
    {
      _type: 'missionCard',
      _key: key(),
      title: 'Nos valeurs',
      body: "Simplicité, accessibilité, innovation et respect de l'environnement.",
    },
  ],
}

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  metaTitle: 'Contact | Padel Day',
  metaDescription:
    "Contactez l'équipe Padel Day pour toute question ou demande de partenariat.",
  heading: 'Contactez-nous',
  introBody: blockContent(
    "Vous êtes une collectivité intéressée par l'installation d'un terrain ? Un joueur avec une question ? N'hésitez pas à nous écrire, nous vous répondons sous 48h.",
  ),
}

const faqItems = [
  {
    _id: 'faq-1',
    _type: 'faqItem',
    question: 'Comment réserver un terrain ?',
    answer: blockContent(
      "Rendez-vous sur notre plateforme de réservation en ligne. Sélectionnez votre créneau, payez en ligne et recevez votre code d'accès par SMS.",
    ),
    order: 1,
  },
  {
    _id: 'faq-2',
    _type: 'faqItem',
    question: 'Faut-il télécharger une application ?',
    answer: blockContent(
      'Non, aucune application n\'est nécessaire. Tout se fait depuis votre navigateur web sur smartphone, tablette ou ordinateur.',
    ),
    order: 2,
  },
  {
    _id: 'faq-3',
    _type: 'faqItem',
    question: "Quels sont les horaires d'ouverture ?",
    answer: blockContent(
      'Nos terrains sont accessibles 7 jours sur 7, de 7h à minuit. Vous pouvez réserver à tout moment.',
    ),
    order: 3,
  },
  {
    _id: 'faq-4',
    _type: 'faqItem',
    question: 'Comment accéder au terrain ?',
    answer: blockContent(
      "Après votre réservation, vous recevez un code d'accès unique par SMS. Ce code vous permet d'ouvrir le portail et d'accéder à votre terrain.",
    ),
    order: 4,
  },
  {
    _id: 'faq-5',
    _type: 'faqItem',
    question: 'Quel est le tarif ?',
    answer: blockContent(
      'Nos tarifs sont conçus pour être accessibles à tous. Consultez notre plateforme de réservation pour voir les tarifs en vigueur selon les créneaux.',
    ),
    order: 5,
  },
  {
    _id: 'faq-6',
    _type: 'faqItem',
    question: 'Le terrain est-il couvert ?',
    answer: blockContent(
      "Nos terrains sont en extérieur avec un vitrage panoramique. Ils sont équipés d'un éclairage LED pour les sessions en soirée.",
    ),
    order: 6,
  },
]

const teamMembers = [
  {
    _id: 'team-julien',
    _type: 'teamMember',
    name: 'Julien',
    role: 'Fondateur & CEO',
    bio: "Passionné de padel et entrepreneur, Julien a fondé Padel Day avec l'ambition de démocratiser ce sport partout en France.",
    order: 1,
  },
  {
    _id: 'team-thomas',
    _type: 'teamMember',
    name: 'Thomas',
    role: 'Directeur Technique',
    bio: "Expert en automatisation et systèmes connectés, Thomas conçoit l'infrastructure technologique de Padel Day.",
    order: 2,
  },
]

const legalPages = [
  {
    _id: 'page-mentions-legales',
    _type: 'page',
    title: 'Mentions légales',
    slug: {_type: 'slug', current: 'mentions-legales'},
    body: blockContent(
      "Padel Day SAS\nSiège social : France\nEmail : contact@padelday.fr\n\nDirecteur de la publication : Julien\nHébergement : Vercel Inc.\n\nConformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site Padel Day l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.",
    ),
  },
  {
    _id: 'page-politique-confidentialite',
    _type: 'page',
    title: 'Politique de confidentialité',
    slug: {_type: 'slug', current: 'politique-de-confidentialite'},
    body: blockContent(
      "Padel Day s'engage à protéger la vie privée des utilisateurs de son site.\n\nDonnées collectées : nom, adresse email, message (via le formulaire de contact).\n\nFinalité : répondre à vos demandes de contact et d'information.\n\nDurée de conservation : les données sont conservées pendant 3 ans à compter du dernier contact.\n\nVos droits : conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à contact@padelday.fr.",
    ),
  },
]

// ---------------------------------------------------------------------------
// Execute
// ---------------------------------------------------------------------------

async function seed() {
  const allDocuments = [
    siteSettings,
    homePage,
    installerPage,
    notreSitePage,
    aProposPage,
    contactPage,
    ...faqItems,
    ...teamMembers,
    ...legalPages,
  ]

  console.log(`Seeding ${allDocuments.length} documents into ${dataset}...`)

  const transaction = client.transaction()

  for (const doc of allDocuments) {
    transaction.createOrReplace(doc)
  }

  const result = await transaction.commit()
  console.log(`Done. Transaction ID: ${result.transactionId}`)
  console.log(`Documents created/replaced: ${allDocuments.length}`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
