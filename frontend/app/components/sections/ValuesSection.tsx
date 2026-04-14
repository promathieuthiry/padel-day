interface ValueItem {
  _key: string
  icon?: string
  title: string
  description: string
}

interface ValuesSectionProps {
  values: ValueItem[]
}

export default function ValuesSection({values}: ValuesSectionProps) {
  if (!values || values.length === 0) return null

  return (
    <section className="bg-surface-2 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <header className="max-w-[40ch] mb-16 md:mb-24">
          <p className="eyebrow mb-4">Ce qui nous distingue</p>
          <h2
            className="font-heading font-semibold text-ink tracking-tight leading-[1.05]"
            style={{fontSize: 'clamp(2rem, 4vw, 3.25rem)'}}
          >
            Le padel, sans friction.
          </h2>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24">
          {values.map((item, index) => {
            const isOffset = index % 2 === 1
            return (
              <li
                key={item._key}
                className={`col-span-12 md:col-span-6 ${isOffset ? 'md:col-start-7 md:pl-12 lg:pl-20' : 'md:pr-6'}`}
              >
                <div className="flex items-baseline gap-4 md:gap-6 mb-5">
                  <span
                    className="font-heading font-medium text-blue tabular-nums"
                    style={{fontSize: 'clamp(1.5rem, 2vw, 2rem)'}}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 h-px bg-hairline" aria-hidden="true" />
                </div>
                <h3
                  className="font-heading font-semibold text-ink tracking-tight leading-[1.15] mb-4"
                  style={{fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)'}}
                >
                  {item.title}
                </h3>
                <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed max-w-[38ch]">
                  {item.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
