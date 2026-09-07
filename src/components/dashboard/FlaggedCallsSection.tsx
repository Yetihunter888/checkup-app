import { EmptySectionState } from './EmptySectionState'
import { SectionHeader } from './SectionHeader'
import { TaskItemCard } from './TaskItemCard'
import { NoteBadge } from '../ui/NoteBadge'
import { AttentionBadge } from '../ui/StatusBadge'
import { calls } from '../../data/mockCalls'

/** Reuses the same `calls` mock data as the Live Call Feed — the same flagged rows, not a separate list. */
export function FlaggedCallsSection({
  completedIds,
  onComplete,
}: {
  completedIds: Set<string>
  onComplete: (id: string) => void
}) {
  const flagged = calls.filter((call) => call.needsAttention && !completedIds.has(call.id))

  return (
    <div className="flex flex-col gap-sm">
      <SectionHeader title="Flagged Calls Pending Review" count={flagged.length} />
      {flagged.length === 0 ? (
        <EmptySectionState message="No flagged calls waiting on review." />
      ) : (
        flagged.map((call) => (
          <TaskItemCard
            key={call.id}
            title={call.agentName}
            subtitle={call.aiFlagReason ?? call.team}
            accentColorClassName="bg-status-escalation"
            sourceBadge={<NoteBadge author="ai" />}
            trailing={<AttentionBadge />}
            onComplete={() => onComplete(call.id)}
          />
        ))
      )}
    </div>
  )
}
