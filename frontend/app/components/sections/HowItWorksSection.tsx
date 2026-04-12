interface StepItem {
  _key: string
  number: number
  title: string
  description: string
}

interface HowItWorksSectionProps {
  heading: string
  steps: StepItem[]
}

export default function HowItWorksSection({heading, steps}: HowItWorksSectionProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-5xl font-semibold text-dark text-center tracking-tight mb-16">
          {heading}
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line - hidden on mobile */}
          <div
            className="hidden md:block absolute top-10 left-0 right-0 h-px border-t-2 border-dashed border-gray-200"
            aria-hidden="true"
            style={{
              left: `${100 / (steps.length * 2)}%`,
              right: `${100 / (steps.length * 2)}%`,
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step) => (
              <div key={step._key} className="relative text-center">
                {/* Number circle */}
                <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-lime flex items-center justify-center mb-6">
                  <span className="font-heading text-2xl font-semibold text-dark">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-body max-w-[30ch] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
