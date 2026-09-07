import { TagPill } from './TagPill'
import { TAG_CONFIG } from './tagColors'
import { CardAccentBar } from '../ui/CardAccentBar'
import { NoteBadge } from '../ui/NoteBadge'
import { formatDuration } from '../../lib/format'
import type { Comment } from '../../types/call-detail'

/**
 * The accent bar carries tag-type color only (Coaching/Great Win/
 * Compliance/Escalation, via TAG_CONFIG). Authorship is a separate signal
 * — the NoteBadge in the meta row — so a comment's color and its author's
 * color never merge into one ambiguous cue.
 *
 * Two distinct highlight levels, both using the same surface-elevation
 * step: `active` (clicked, synced with the waveform playhead) gets the
 * elevated background plus a primary ring; `hovered` (mouse over this row,
 * or over its matching waveform marker) gets only the elevated background
 * — a lighter touch for a transient preview versus a deliberate selection.
 */
export function CommentRow({
  comment,
  active,
  hovered,
  onSelect,
  onHover,
}: {
  comment: Comment
  active: boolean
  hovered: boolean
  onSelect: (comment: Comment) => void
  onHover: (id: string | null) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(comment)}
      onMouseEnter={() => onHover(comment.id)}
      onMouseLeave={() => onHover(null)}
      className="flex w-full text-left outline-none"
    >
      <CardAccentBar colorClassName={TAG_CONFIG[comment.tag].dot} />
      <div
        className={`flex flex-1 flex-col gap-xs rounded-r-lg bg-surface p-lg transition-colors ${
          active ? 'bg-surface-elevated ring-1 ring-primary' : hovered ? 'bg-surface-elevated' : ''
        }`}
      >
        <div className="flex flex-wrap items-center gap-xs">
          <span className="type-caption-sm shrink-0 text-mute">{formatDuration(comment.timestampSeconds)}</span>
          <TagPill tag={comment.tag} />
          <NoteBadge author={comment.author} />
        </div>
        <p className="type-body-md text-body">{comment.text}</p>
      </div>
    </button>
  )
}
