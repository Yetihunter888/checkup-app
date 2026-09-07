import { TAG_CONFIG } from '../call-detail/tagColors'
import { TagPill } from '../call-detail/TagPill'
import { CardAccentBar } from '../ui/CardAccentBar'
import { NoteBadge } from '../ui/NoteBadge'
import { formatDuration } from '../../lib/format'
import type { Comment } from '../../types/call-detail'

/**
 * Read-only variant of CommentRow for the Takeover context panel — same
 * card-accent-bar + TagPill + NoteBadge system as Call Detail, just not
 * clickable/synced to a waveform here.
 */
export function ContextNoteCard({ note }: { note: Comment }) {
  return (
    <div className="flex w-full">
      <CardAccentBar colorClassName={TAG_CONFIG[note.tag].dot} />
      <div className="flex flex-1 flex-col gap-xs rounded-r-lg bg-surface p-md">
        <div className="flex flex-wrap items-center gap-xs">
          <span className="type-caption-sm shrink-0 text-mute">{formatDuration(note.timestampSeconds)}</span>
          <TagPill tag={note.tag} />
          <NoteBadge author={note.author} />
        </div>
        <p className="type-body-sm text-body">{note.text}</p>
      </div>
    </div>
  )
}
