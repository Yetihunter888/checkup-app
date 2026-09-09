import type { Recognition } from '../../types/groups'

function TrophyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 1.5h6v2.2a3 3 0 0 1-6 0V1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path
        d="M3 2.2H1.6a1 1 0 0 0 0 2h.9M9 2.2h1.4a1 1 0 0 1 0 2h-.9"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M6 6.7v2.1M4.2 10.5h3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Reuses the note-supervisor pale/text pairing DESIGN-checkup.md already
 * assigns to positive moments (a "Great Win" tag chip) — an achievement
 * badge is the same kind of positive signal, so it gets the same color
 * rather than a new gold/amber hue.
 */
export function RecognitionRow({ recognitions }: { recognitions: Recognition[] }) {
  if (recognitions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-xs">
      {recognitions.map((recognition) => (
        <span
          key={recognition.label}
          className="type-caption-md inline-flex shrink-0 items-center gap-xs whitespace-nowrap rounded-full bg-note-supervisor-pale px-md py-[6px] text-note-supervisor"
        >
          <TrophyIcon />
          {recognition.label}
        </span>
      ))}
    </div>
  )
}
