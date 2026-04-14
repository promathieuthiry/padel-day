type SectionIntroProps = {
  eyebrow?: string
  heading?: string
  body?: string
  headingId?: string
  className?: string
}

export default function SectionIntro({
  eyebrow,
  heading,
  body,
  headingId,
  className,
}: SectionIntroProps) {
  return (
    <div className={['max-w-[62rem]', className].filter(Boolean).join(' ')}>
      {eyebrow ? (
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span aria-hidden="true" className="relative inline-flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-lime opacity-60 animate-ping" />
            <span className="relative inline-block size-2.5 rounded-full bg-lime" />
          </span>
          <span>{eyebrow}</span>
          <span aria-hidden="true" className="inline-block h-px w-10 bg-blue/40" />
        </p>
      ) : null}

      {heading ? (
        <h2
          id={headingId}
          className="font-display font-bold text-ink leading-[0.95] tracking-[-0.025em]"
          style={{fontSize: 'clamp(1.75rem, 4vw, 3rem)'}}
        >
          {heading}
        </h2>
      ) : null}

      {body ? (
        <p className="mt-6 md:mt-8 text-ink-muted max-w-[56ch] text-base md:text-lg leading-[1.55]">
          {body}
        </p>
      ) : null}
    </div>
  )
}
