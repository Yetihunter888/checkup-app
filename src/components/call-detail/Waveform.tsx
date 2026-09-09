import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TAG_CONFIG } from './tagColors'
import { generateBarHeights } from './waveformShape'
import { formatDuration, formatNoteDate } from '../../lib/format'
import type { Comment, SilenceRange } from '../../types/call-detail'

// A classic thin/spiky audio-editor waveform, not a bar chart: fixed 1px
// bars with a fixed 2px gap, not flex-1 auto-fill bars. Since the pixel
// size is fixed rather than computed from the container, the bar COUNT has
// to be measured from the track's actual rendered width — otherwise either
// the bars stop short of the panel's edge (container wider than expected)
// or overflow past it (container narrower), and in the overflow case the
// bars for the back half of the call would get clipped while the
// percentage-positioned markers/playhead for that same time range would
// not, visibly mismatching the two.
const BAR_WIDTH_PX = 1
const BAR_GAP_PX = 2
const FALLBACK_BAR_COUNT = 100

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
  isLive,
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
  /** True only for a call still actively being monitored — the right-hand timestamp then tracks currentTimeSeconds and keeps growing, instead of showing a fixed end time. Both existing screens (Call Detail, Director Review) are post-call recordings, so they pass false. */
  isLive: boolean
  onSeek: (seconds: number) => void
  onSelectComment: (id: string) => void
  onHoverComment: (id: string | null) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [barCount, setBarCount] = useState(FALLBACK_BAR_COUNT)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    function measure(width: number) {
      const unit = BAR_WIDTH_PX + BAR_GAP_PX
      setBarCount(Math.max(1, Math.floor((width + BAR_GAP_PX) / unit)))
    }

    measure(track.getBoundingClientRect().width)

    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width))
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  const barHeights = useMemo(() => generateBarHeights(barCount), [barCount])

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
        className="relative flex h-24 w-full cursor-pointer items-end pt-6"
        style={{ gap: `${BAR_GAP_PX}px` }}
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

        {barHeights.map((height, index) => {
          const barRatio = index / barCount
          const played = barRatio <= playedRatio
          return (
            <div
              key={index}
              className={`shrink-0 ${played ? 'bg-ink' : 'bg-stone'}`}
              style={{ width: `${BAR_WIDTH_PX}px`, height: `${height * 100}%` }}
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

      <div className="flex items-center justify-between pt-xs">
        <span className="type-caption-sm text-mute">0:00</span>
        <span className="type-caption-sm text-mute">
          {formatDuration(isLive ? currentTimeSeconds : durationSeconds)}
        </span>
      </div>
    </div>
  )
}
