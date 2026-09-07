import { useState } from 'react'
import { DirectorTagsSection } from './DirectorTagsSection'
import { EscalationsSection } from './EscalationsSection'
import { FlaggedCallsSection } from './FlaggedCallsSection'
import { QaQuotaSection } from './QaQuotaSection'
import { BottomTabBar } from '../layout/BottomTabBar'
import type { TabId } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { SavedViewChip } from '../ui/Chip'

export function TaskDashboardScreen({ onNavigateTab }: { onNavigateTab: (tab: TabId) => void }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high'>('all')

  function completeItem(id: string) {
    setCompletedIds((current) => {
      const next = new Set(current)
      next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <TopHeader title="Check Up" />

      <main className="flex flex-1 flex-col gap-xl overflow-y-auto px-lg py-lg">
        <div className="flex flex-col gap-xxs">
          <span className="type-heading-xl text-ink">Today</span>
          <span className="type-body-sm text-mute">Everything that needs your attention.</span>
        </div>

        <div className="flex gap-xs">
          <SavedViewChip active={priorityFilter === 'all'} onClick={() => setPriorityFilter('all')}>
            All Tasks
          </SavedViewChip>
          <SavedViewChip active={priorityFilter === 'high'} onClick={() => setPriorityFilter('high')}>
            High Priority Only
          </SavedViewChip>
        </div>

        <DirectorTagsSection completedIds={completedIds} onComplete={completeItem} priorityFilter={priorityFilter} />
        <QaQuotaSection />
        <FlaggedCallsSection completedIds={completedIds} onComplete={completeItem} />
        <EscalationsSection completedIds={completedIds} onComplete={completeItem} priorityFilter={priorityFilter} />
      </main>

      <BottomTabBar active="tasks" onNavigate={onNavigateTab} />
    </div>
  )
}
