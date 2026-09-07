import { useRef } from 'react'
import { TAG_CONFIG } from './tagColors'
import { generateBarHeights } from './waveformShape'
import { formatNoteDate } from '../../lib/format'
import type { Comment, SilenceRange } from '../../types/call-detail'

const BAR_COUNT = 90
const BAR_HEIGHTS = generateBarHeights(BAR_COUNT)

function pct(seconds: number, duration: number) {
  return `${(seconds / duration) * 100}%`
}

/**
 * `waveform-panel` from DESIGN-checkup.md. Played bars use ink (already
 * heard), unplayed use stone (not yet heard), and the playhead is brand
 * green — status-escalation red was deliberately not reused here for the
 * "current position" marker (the original Figma reference used red for
 * this), since the doc reserves that red exclusively for
 * escalation/compliance meaning.
 */
export function Waveform({
  durationSeconds,
  currentTimeSeconds,
  comments,
  silenceRanges,
  activeCommentId,
  hoveredCommentId,
  onSeek,
  onSelectComment,
  onHoverComment,
}: {
  durationSeconds: number
  currentTimeSeconds: number
  comments: Comment[]
  silenceRanges: SilenceRange[]
  activeCommentId: string | null
  hoveredCommentId: string | null
  onSeek: (seconds: number) => void
  onSelectComment: (id: string) => void
  onHoverComment: (id: string | null) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  function handleSeekClick(event: React.MouseEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    onSeek(Math.round(ratio * durationSeconds))
  }

  const playedRatio = currentTimeSeconds / durationSeconds
  const hoveredComment = comments.find((comment) => comment.id === hoveredCommentId) ?? null

  return (
    <div className="rounded-lg bg-surface-sunken p-lg">
      <div
        ref={trackRef}
        onClick={handleSeekClick}
        className="relative flex h-24 w-full cursor-pointer items-end gap-[1px] pt-6"
      >
        {silenceRanges.map((range, index) => (
          <div
            key={index}
            className="absolute inset-y-0 bg-status-silence/25"
            style={{
              left: pct(range.startSeconds, durationSeconds),
              width: pct(range.endSeconds - range.startSeconds, durationSeconds),
            }}
          />
        ))}

        {BAR_HEIGHTS.map((height, index) => {
          const barRatio = index / BAR_COUNT
          const played = barRatio <= playedRatio
          return (
            <div
              key={index}
              className={`flex-1 rounded-full ${played ? 'bg-ink' : 'bg-stone'}`}
              style={{ height: `${height * 100}%` }}
            />
          )
        })}

        <div
          className="absolute inset-y-0 w-[2px] bg-primary"
          style={{ left: pct(currentTimeSeconds, durationSeconds) }}
        />

        {comments.map((comment) => {
          const config = TAG_CONFIG[comment.tag]
          const isActive = comment.id === activeCommentId
          const isHovered = comment.id === hoveredCommentId
          return (
            <button
              key={comment.id}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onSelectComment(comment.id)
              }}
              onMouseEnter={() => onHoverComment(comment.id)}
              onMouseLeave={() => onHoverComment(null)}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1"
              style={{ left: pct(comment.timestampSeconds, durationSeconds) }}
              aria-label={`${config.label} comment at ${comment.timestampSeconds}s`}
            >
              <span
                className={`size-2.5 rounded-full ${config.dot} ${
                  isActive ? 'ring-2 ring-ink' : isHovered ? 'ring-2 ring-ink/60' : ''
                }`}
              />
              <span className={`w-px flex-1 ${config.dot} opacity-40`} />
            </button>
          )
        })}

        {hoveredComment && (
          <div
            className="shadow-modal pointer-events-none absolute top-0 z-20 flex -translate-x-1/2 -translate-y-[calc(100%+8px)] flex-col gap-0.5 whitespace-nowrap rounded-md border border-hairline bg-surface-elevated px-sm py-xs"
            style={{ left: pct(hoveredComment.timestampSeconds, durationSeconds) }}
          >
            <span className="type-caption-sm font-semibold text-ink">{hoveredComment.authorName}</span>
            <span className="type-caption-sm text-mute">{formatNoteDate(hoveredComment.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
