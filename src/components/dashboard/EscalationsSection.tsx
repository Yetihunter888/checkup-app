import { DueLabel } from './DueLabel'
import { EmptySectionState } from './EmptySectionState'
import { PriorityBadge } from './PriorityBadge'
import { SectionHeader } from './SectionHeader'
import { TaskItemCard } from './TaskItemCard'
import { NoteBadge } from '../ui/NoteBadge'
import { mockEscalations } from '../../data/mockEscalations'

const ACCENT_BY_PRIORITY: Record<string, string> = {
  high: 'bg-status-escalation',
  medium: 'bg-status-hold',
  low: 'bg-hairline-strong',
}

export function EscalationsSection({
  completedIds,
  onComplete,
  priorityFilter = 'all',
}: {
  completedIds: Set<string>
  onComplete: (id: string) => void
  priorityFilter?: 'all' | 'high'
}) {
  const allEscalations = mockEscalations.filter((item) => !completedIds.has(item.id))
  const escalations = allEscalations.filter((item) => priorityFilter === 'all' || item.priority === 'high')

  return (
    <div className="flex flex-col gap-sm">
      <SectionHeader title="Escalations from Interventions" count={escalations.length} />
      {escalations.length === 0 ? (
        <EmptySectionState
          message={
            allEscalations.length === 0
              ? 'No open escalations from interventions.'
              : 'No high-priority escalations right now.'
          }
        />
      ) : (
        escalations.map((item) => (
          <TaskItemCard
            key={item.id}
            title={item.agentName}
            subtitle={item.reason}
            accentColorClassName={ACCENT_BY_PRIORITY[item.priority]}
            sourceBadge={<NoteBadge author="supervisor" label="Takeover" />}
            priorityBadge={<PriorityBadge priority={item.priority} />}
            trailing={<DueLabel dueDate={item.dueDate} />}
            onComplete={() => onComplete(item.id)}
          />
        ))
      )}
    </div>
  )
}
