import { DueLabel } from './DueLabel'
import { EmptySectionState } from './EmptySectionState'
import { PriorityBadge } from './PriorityBadge'
import { SectionHeader } from './SectionHeader'
import { TaskItemCard } from './TaskItemCard'
import { NoteBadge } from '../ui/NoteBadge'
import { useSupervisorTags } from '../../data/supervisorTagsStore'

const ACCENT_BY_PRIORITY: Record<string, string> = {
  high: 'bg-status-escalation',
  medium: 'bg-status-hold',
  low: 'bg-hairline-strong',
}

/**
 * The one section required to be genuinely live: reads directly from the
 * supervisorTagsStore module (via useSupervisorTags), the same store the
 * Director Call Review screen writes to. No mock array here.
 */
export function DirectorTagsSection({
  completedIds,
  onComplete,
  priorityFilter = 'all',
}: {
  completedIds: Set<string>
  onComplete: (id: string) => void
  priorityFilter?: 'all' | 'high'
}) {
  const allTags = useSupervisorTags().filter((tag) => !completedIds.has(tag.id))
  const tags = allTags.filter((tag) => priorityFilter === 'all' || tag.priority === 'high')

  return (
    <div className="flex flex-col gap-sm">
      <SectionHeader title="Tagged by Director" count={tags.length} />
      {tags.length === 0 ? (
        <EmptySectionState
          message={
            allTags.length === 0
              ? 'All caught up — no director tags right now.'
              : 'No high-priority director tags right now.'
          }
        />
      ) : (
        tags.map((tag) => (
          <TaskItemCard
            key={tag.id}
            title={tag.agentName}
            subtitle={tag.note}
            accentColorClassName={tag.priority ? ACCENT_BY_PRIORITY[tag.priority] : 'bg-hairline-strong'}
            sourceBadge={<NoteBadge author="director" />}
            priorityBadge={tag.priority ? <PriorityBadge priority={tag.priority} /> : undefined}
            trailing={<DueLabel dueDate={tag.dueDate} />}
            onComplete={() => onComplete(tag.id)}
          />
        ))
      )}
    </div>
  )
}
