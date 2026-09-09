import { Avatar } from '../ui/Avatar'
import { CardAccentBar } from '../ui/CardAccentBar'
import { NoteBadge } from '../ui/NoteBadge'
import { SentimentDot } from '../ui/SentimentDot'
import { AttentionBadge, STATUS_CONFIG, StatusBadge } from '../ui/StatusBadge'
import { formatDuration } from '../../lib/format'
import type { Call } from '../../types/live-feed'

function ListenAffordance() {
  return (
    <span
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-ink transition-colors group-hover:bg-primary group-hover:text-on-primary"
      aria-hidden="true"
    >
      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
        <path d="M0 0.8C0 0.13 0.73-0.28 1.3 0.07l12 7.2a0.75 0.75 0 0 1 0 1.28l-12 7.2C0.73 16.1 0 15.7 0 15V0.8Z" />
      </svg>
    </span>
  )
}

/**
 * `agent-row` from DESIGN-checkup.md. The whole row is the tap target that
 * opens the listen action.
 *
 * The accent bar always reflects the agent's current call state (talking/
 * hold/transferring/silence, via StatusBadge's own STATUS_CONFIG — no
 * separate color mapping to keep in sync) — every row gets one now, not
 * just flagged ones. Escalation red still takes priority when the row is
 * flagged, since "needs attention right now" outranks "what state are they
 * in"; the AI authorship badge stays a separate signal alongside it, per
 * the doc's rule that authorship color and operational status color are
 * never the same system.
 */
export function CallRow({ call, onSelect }: { call: Call; onSelect: (call: Call) => void }) {
  const accentColor = call.needsAttention ? 'bg-status-escalation' : STATUS_CONFIG[call.status].dot

  return (
    <button type="button" onClick={() => onSelect(call)} className="group flex w-full text-left outline-none">
      <CardAccentBar colorClassName={accentColor} />
      <div className="flex flex-1 items-center gap-md rounded-r-lg bg-surface px-lg py-[14px] transition-colors group-hover:bg-surface-elevated group-hover:ring-1 group-hover:ring-primary group-focus-visible:bg-surface-elevated group-focus-visible:ring-1 group-focus-visible:ring-primary">
        <Avatar name={call.agentName} />

        <div className="flex min-w-0 flex-1 flex-col gap-xxs">
          <div className="flex items-center gap-sm">
            <span className="type-card-title truncate text-ink">{call.agentName}</span>
            <SentimentDot sentiment={call.sentiment} />
          </div>
          <div className="flex items-center justify-between gap-sm">
            <span className="type-body-sm truncate text-mute">
              {call.team} · {formatDuration(call.durationSeconds)}
            </span>
            <StatusBadge status={call.status} />
          </div>
          {call.needsAttention && (
            <div className="flex flex-wrap items-center gap-xs pt-xxs">
              <NoteBadge author="ai" />
              <AttentionBadge />
            </div>
          )}
        </div>

        <ListenAffordance />
      </div>
    </button>
  )
}
