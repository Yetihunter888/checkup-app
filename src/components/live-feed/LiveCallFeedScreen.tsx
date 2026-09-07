import { useMemo, useState } from 'react'
import { BottomTabBar } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { CallList } from './CallList'
import { FilterBar } from './FilterBar'
import { QueueHealthStrip } from './QueueHealthStrip'
import { calls, queueHealth, savedViews } from '../../data/mockCalls'
import type { Call } from '../../types/live-feed'

export function LiveCallFeedScreen({ onSelectCall }: { onSelectCall?: (call: Call) => void }) {
  const [activeViewId, setActiveViewId] = useState(savedViews[0].id)

  const filteredCalls = useMemo(() => {
    if (activeViewId === 'escalations') {
      return calls.filter((call) => call.needsAttention)
    }
    if (activeViewId === 'my-team') {
      return calls.filter((call) => call.team === 'Team East')
    }
    return calls
  }, [activeViewId])

  function handleSelectCall(call: Call) {
    onSelectCall?.(call)
  }

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <TopHeader title="Check Up" />

      <main className="flex flex-1 flex-col gap-lg overflow-y-auto px-lg py-lg">
        <QueueHealthStrip health={queueHealth} />
        <FilterBar
          savedViews={savedViews}
          activeViewId={activeViewId}
          onSelectView={setActiveViewId}
        />
        <CallList calls={filteredCalls} onSelectCall={handleSelectCall} />
      </main>

      <BottomTabBar />
    </div>
  )
}
