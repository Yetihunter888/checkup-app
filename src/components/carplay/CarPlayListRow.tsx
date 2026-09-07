import { CardAccentBar } from '../ui/CardAccentBar'
import { AttentionBadge, StatusBadge } from '../ui/StatusBadge'
import type { Call } from '../../types/live-feed'

/**
 * `carplay-list-row` from DESIGN-checkup.md, restricted to the CarPlay
 * color rule: "only two colors carry meaning beyond ink/canvas — brand
 * green for go/active and status-escalation red for needs attention." The
 * mobile Feed's four-way status vocabulary (talking/hold/transferring/
 * silence) collapses to that same two-way signal here — every non-flagged
 * call reads as a plain green "Talking," never amber or gray, and no
 * purple/blue authorship badges appear anywhere in this row.
 */
export function CarPlayListRow({ call, onSelect }: { call: Call; onSelect: (call: Call) => void }) {
  return (
    <button type="button" onClick={() => onSelect(call)} className="flex w-full text-left">
      {call.needsAttention && <CardAccentBar colorClassName="bg-status-escalation" />}
      <div
        className={`flex min-h-[60px] flex-1 items-center justify-between gap-lg bg-surface px-lg py-md ${
          call.needsAttention ? 'rounded-r-md' : 'rounded-md'
        }`}
      >
        <div className="flex min-w-0 flex-col gap-xxs">
          <span className="type-carplay-md truncate text-ink">{call.agentName}</span>
          <span className="type-carplay-md truncate text-mute">{call.team}</span>
        </div>
        {call.needsAttention ? <AttentionBadge size="carplay" /> : <StatusBadge status="talking" size="carplay" />}
      </div>
    </button>
  )
}
