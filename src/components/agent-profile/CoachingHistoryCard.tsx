import { CardAccentBar } from '../ui/CardAccentBar'
import { NoteBadge } from '../ui/NoteBadge'
import { formatNoteDate } from '../../lib/format'
import type { CoachingHistoryEntry } from '../../lib/agentCoachingHistory'

/**
 * Same card-accent-bar + NoteBadge system as ContextNoteCard/CommentRow —
 * the accent bar is colored by authorship (note-ai/note-supervisor/
 * note-director) since these entries come from four different sources
 * with no shared tag vocabulary, unlike a call's transcript comments.
 */
export function CoachingHistoryCard({ entry }: { entry: CoachingHistoryEntry }) {
  return (
    <div className="flex w-full">
      <CardAccentBar colorClassName={`bg-note-${entry.author}`} />
      <div className="flex flex-1 flex-col gap-xs rounded-r-lg bg-surface p-md">
        <div className="flex flex-wrap items-center gap-xs">
          <NoteBadge author={entry.author} />
          <span className="type-caption-sm text-mute">{entry.sourceLabel}</span>
          <span className="type-caption-sm text-mute">· {formatNoteDate(entry.createdAt)}</span>
        </div>
        <p className="type-body-sm text-body">{entry.text}</p>
        {entry.author !== 'ai' && <span className="type-caption-sm text-mute">— {entry.authorName}</span>}
      </div>
    </div>
  )
}
