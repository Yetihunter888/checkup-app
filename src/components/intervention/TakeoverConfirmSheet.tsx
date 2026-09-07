import { ContextNoteCard } from './ContextNoteCard'
import { SentimentDot } from '../ui/SentimentDot'
import type { Comment } from '../../types/call-detail'
import type { Sentiment } from '../../types/live-feed'

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  positive: 'Positive',
  neutral: 'Neutral',
  negative: 'Negative',
}

/**
 * Elevation level 3 (shadow-modal) — the same bottom-sheet pattern as the
 * Groups merge confirmation. This is the requirement's "brief context
 * panel," and it's the only way to reach takeover-active: there is no
 * direct activation path from the three-button row.
 */
export function TakeoverConfirmSheet({
  sentiment,
  issueSummary,
  notes,
  onCancel,
  onConfirm,
}: {
  sentiment: Sentiment
  issueSummary: string
  notes: Comment[]
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center">
      <div className="absolute inset-0 bg-canvas-dark/70" onClick={onCancel} />

      <div className="shadow-modal relative z-10 flex w-full max-w-[390px] flex-col gap-lg rounded-t-xl bg-surface-elevated p-xl">
        <div className="flex flex-col gap-xxs">
          <span className="type-heading-md text-ink">Confirm Takeover</span>
          <span className="type-body-sm text-mute">
            Taking over disconnects the agent from this call. This can&rsquo;t be undone.
          </span>
        </div>

        <div className="flex items-center gap-sm rounded-md bg-surface p-md">
          <SentimentDot sentiment={sentiment} />
          <span className="type-body-strong text-ink">{SENTIMENT_LABEL[sentiment]} sentiment</span>
        </div>

        <p className="type-body-md text-body">{issueSummary}</p>

        <div className="flex flex-col gap-sm">
          <span className="type-caption-md text-mute">Last 3 Notes</span>
          {notes.map((note) => (
            <ContextNoteCard key={note.id} note={note} />
          ))}
        </div>

        <div className="flex gap-sm">
          <button
            type="button"
            onClick={onCancel}
            className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full border-[1.5px] border-primary text-primary transition-colors hover:bg-primary-pale"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full bg-status-escalation text-on-primary transition-colors hover:bg-status-escalation/90"
          >
            Confirm Takeover
          </button>
        </div>
      </div>
    </div>
  )
}
