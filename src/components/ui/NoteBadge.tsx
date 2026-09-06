/**
 * The three authorship badges from DESIGN-checkup.md — AI / Supervisor /
 * Director. Rounded-square (not pill) so authorship is never confused with
 * the pill-shaped operational status-badge. Reused wherever notes, tags, or
 * scorecard entries need to declare who authored them.
 */
export type NoteAuthor = 'ai' | 'supervisor' | 'director'

const AUTHOR_CONFIG: Record<
  NoteAuthor,
  { label: string; bg: string; text: string; border: string }
> = {
  ai: {
    label: 'AI Flagged',
    bg: 'bg-note-ai-pale',
    text: 'text-note-ai',
    border: 'border border-dashed border-note-ai',
  },
  supervisor: {
    label: 'Supervisor',
    bg: 'bg-note-supervisor-pale',
    text: 'text-note-supervisor',
    border: 'border border-solid border-note-supervisor',
  },
  director: {
    label: 'Director',
    bg: 'bg-note-director-pale',
    text: 'text-note-director',
    border: 'border border-solid border-note-director',
  },
}

export function NoteBadge({ author, label }: { author: NoteAuthor; label?: string }) {
  const config = AUTHOR_CONFIG[author]
  return (
    <span
      className={`type-caption-md inline-flex shrink-0 items-center whitespace-nowrap rounded-sm px-sm py-[3px] ${config.bg} ${config.text} ${config.border}`}
    >
      {label ?? config.label}
    </span>
  )
}
