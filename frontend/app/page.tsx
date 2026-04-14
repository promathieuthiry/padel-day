import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery, faqItemsQuery} from '@/sanity/lib/queries'

import FadeIn from '@/app/components/FadeIn'
import StructuredData from '@/app/components/StructuredData'
import HeroSection from '@/app/components/sections/HeroSection'
import FactsSection from '@/app/components/sections/FactsSection'
import HowItWorksSection from '@/app/components/sections/HowItWorksSection'
import ImpactSection from '@/app/components/sections/ImpactSection'
import CtaBannerSection from '@/app/components/sections/CtaBannerSection'
import FaqSection from '@/app/components/sections/FaqSection'

export async function generateMetadata(): Promise<Metadata> {
  const {data: homePage} = await sanityFetch({query: homePageQuery, stega: false})
  return {
    title: homePage?.metaTitle || 'Padel Day — Le padel, simplement.',
    description:
      homePage?.metaDescription ||
      'Padel Day rend le padel accessible a tous. Decouvrez notre concept, nos terrains et notre mission.',
  }
}

export default async function Page() {
  const [{data: homePage}, {data: faqItems}] = await Promise.all([
    sanityFetch({query: homePageQuery}),
    sanityFetch({query: faqItemsQuery}),
  ])

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Padel Day',
    'description': homePage?.metaDescription || 'Le padel, simplement.',
    'url': 'https://padelday.fr',
    'sameAs': [],
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'FR',
    },
  }

  return (
    <>
      <StructuredData data={localBusinessJsonLd} />

      <HeroSection
        heading={homePage?.heroHeading || 'Padel Day'}
        highlightWords={homePage?.heroHighlightWords ?? undefined}
        slogan={homePage?.heroSlogan ?? undefined}
        image={homePage?.heroImage}
        primaryCta={homePage?.heroPrimaryCta}
        secondaryCta={homePage?.heroSecondaryCta}
      />
      <FadeIn direction="up">
        <FactsSection
          eyebrow={homePage?.factsEyebrow ?? undefined}
          heading={homePage?.factsHeading ?? undefined}
          body={homePage?.factsBody ?? undefined}
        />
      </FadeIn>

      {homePage?.howItWorksHeading && homePage?.howItWorksSteps && (
        <FadeIn>
          <HowItWorksSection
            heading={homePage.howItWorksHeading}
            steps={homePage.howItWorksSteps}
            image={homePage.howItWorksImage}
          />
        </FadeIn>
      )}

      {homePage?.impactHeading && (
        <FadeIn>
          <ImpactSection
            heading={homePage.impactHeading}
            body={homePage.impactBody ?? undefined}
            cta={homePage.impactCta}
            image={homePage.impactImage}
          />
        </FadeIn>
      )}

      {homePage?.ctaBannerHeading && (
        <FadeIn>
          <CtaBannerSection
            heading={homePage.ctaBannerHeading}
            primaryCta={homePage.ctaBannerPrimaryCta}
            secondaryCta={homePage.ctaBannerSecondaryCta}
          />
        </FadeIn>
      )}

      {faqItems && faqItems.length > 0 && (
        <FadeIn>
          <FaqSection items={faqItems} />
        </FadeIn>
      )}
    </>
  )
}
