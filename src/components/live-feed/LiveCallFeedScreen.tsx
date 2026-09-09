import { useEffect, useMemo, useState } from 'react'
import { BottomTabBar } from '../layout/BottomTabBar'
import type { TabId } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { CallList } from './CallList'
import { FilterBar } from './FilterBar'
import { QueueHealthStrip } from './QueueHealthStrip'
import { calls as initialCalls, queueHealth, savedViews } from '../../data/mockCalls'
import type { Call, CallStatus } from '../../types/live-feed'

// Deterministic status cycle for one agent, so the row's accent color is
// demonstrably reactive (not just set once at render) without relying on
// real audio/backend state. Priya Natarajan (c-3) is on Team East (visible
// in the default "My Team" view) and isn't flagged, so cycling her status
// doesn't interact with the escalation-accent priority logic.
const SIMULATED_CALL_ID = 'c-3'
const STATE_CYCLE: CallStatus[] = ['talking', 'hold', 'transferring', 'silence']
const SIMULATION_INTERVAL_MS = 4000

export function LiveCallFeedScreen({
  onSelectCall,
  onNavigateTab,
}: {
  onSelectCall?: (call: Call) => void
  onNavigateTab: (tab: TabId) => void
}) {
  const [activeViewId, setActiveViewId] = useState(savedViews[0].id)
  const [calls, setCalls] = useState<Call[]>(initialCalls)

  useEffect(() => {
    let step = 0
    const interval = setInterval(() => {
      step += 1
      setCalls((current) =>
        current.map((call) =>
          call.id === SIMULATED_CALL_ID
            ? { ...call, status: STATE_CYCLE[step % STATE_CYCLE.length] }
            : call,
        ),
      )
    }, SIMULATION_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const filteredCalls = useMemo(() => {
    if (activeViewId === 'escalations') {
      return calls.filter((call) => call.needsAttention)
    }
    if (activeViewId === 'my-team') {
      return calls.filter((call) => call.team === 'Team East')
    }
    return calls
  }, [calls, activeViewId])

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

      <BottomTabBar active="feed" onNavigate={onNavigateTab} />
    </div>
  )
}
