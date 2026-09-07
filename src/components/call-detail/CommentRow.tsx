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
 */
export function CommentRow({
  comment,
  active,
  onSelect,
}: {
  comment: Comment
  active: boolean
  onSelect: (comment: Comment) => void
}) {
  return (
    <button type="button" onClick={() => onSelect(comment)} className="flex w-full text-left outline-none">
      <CardAccentBar colorClassName={TAG_CONFIG[comment.tag].dot} />
      <div
        className={`flex flex-1 flex-col gap-xs rounded-r-lg bg-surface p-lg transition-colors hover:bg-surface-elevated ${
          active ? 'bg-surface-elevated ring-1 ring-primary' : ''
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
