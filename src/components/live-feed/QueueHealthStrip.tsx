import { formatDuration } from '../../lib/format'
import type { QueueHealth } from '../../types/live-feed'

function Stat({
  label,
  value,
  emphasize,
}: {
  label: string
  value: string
  emphasize?: boolean
}) {
  return (
    <div className="flex flex-1 flex-col gap-xxs px-md py-sm">
      <span className="type-caption-md text-mute">{label}</span>
      <span className={`type-heading-lg ${emphasize ? 'text-status-escalation' : 'text-ink'}`}>
        {value}
      </span>
    </div>
  )
}

/** Queue health strip pinned above the live call list — glanceable at a single look. */
export function QueueHealthStrip({ health }: { health: QueueHealth }) {
  return (
    <div className="flex divide-x divide-hairline rounded-lg bg-surface">
      <Stat label="Calls Waiting" value={String(health.callsWaiting)} />
      <Stat label="Longest Wait" value={formatDuration(health.longestWaitSeconds)} />
      <Stat label="Agents Available" value={String(health.agentsAvailable)} />
      <Stat
        label="SLA Risk"
        value={String(health.slaRisk)}
        emphasize={health.slaRisk > 0}
      />
    </div>
  )
}
