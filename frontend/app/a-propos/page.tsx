import type {Metadata} from 'next'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {sanityFetch} from '@/sanity/lib/live'
import {aProposPageQuery, teamMembersQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'

import FadeIn from '@/app/components/FadeIn'

export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({query: aProposPageQuery, stega: false})
  return {
    title: page?.metaTitle || 'A propos',
    description: page?.metaDescription || 'Decouvrez l\'equipe et la mission de Padel Day.',
  }
}

export default async function AProposPage() {
  const [{data: page}, {data: teamMembers}] = await Promise.all([
    sanityFetch({query: aProposPageQuery}),
    sanityFetch({query: teamMembersQuery}),
  ])

  return (
    <>
      {/* Story section */}
      <section className="bg-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center">
            <FadeIn>
              <div>
                <h1 className="font-heading text-4xl md:text-6xl font-semibold text-white tracking-tight">
                  {page?.storyHeading || 'Notre histoire'}
                </h1>

                {page?.storyBody && (
                  <div className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed font-body prose prose-invert max-w-[55ch]">
                    <PortableText value={page.storyBody} />
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="right">
              {page?.storyImage?.asset ? (
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src={urlForImage(page.storyImage).width(800).height(600).fit('crop').quality(80).url()}
                    alt=""
                    className="w-full h-full object-cover"
                    priority
                    width={800}
                    height={600}
                  />
                </div>
              ) : (
                <div className="rounded-2xl bg-gray-800/30 aspect-[4/3] flex items-center justify-center">
                  <svg viewBox="0 0 80 80" className="w-16 h-16 text-gray-700" fill="none">
                    <circle cx="40" cy="30" r="12" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 65 C20 50 30 42 40 42 C50 42 60 50 60 65" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team grid */}
      {teamMembers && teamMembers.length > 0 && (
        <FadeIn>
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-16">
                {page?.teamHeading || 'Notre equipe'}
              </h2>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {teamMembers.map((member) => (
                  <div key={member._id} className="text-center">
                    {/* Photo */}
                    <div className="mx-auto w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-5">
                      {member.photo?.asset ? (
                        <Image
                          src={urlForImage(member.photo).width(256).height(256).fit('crop').quality(80).url()}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={256}
                          height={256}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-lime/10">
                          <span className="font-heading text-3xl font-semibold text-dark/40">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-dark">
                      {member.name}
                    </h3>
                    <p className="text-sm text-lime font-medium font-body mt-0.5">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-sm text-gray-500 leading-relaxed font-body mt-3 max-w-[35ch] mx-auto">
                        {member.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Mission cards */}
      {page?.missionCards && page.missionCards.length > 0 && (
        <FadeIn>
          <section className="bg-gray-50 py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6">
              {page.missionHeading && (
                <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-16">
                  {page.missionHeading}
                </h2>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {page.missionCards.map((card) => (
                  <div
                    key={card._key}
                    className="bg-white rounded-2xl p-8 shadow-sm"
                  >
                    <h3 className="font-heading text-lg font-semibold text-dark mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-body">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  )
}
