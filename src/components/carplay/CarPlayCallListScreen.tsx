import { CarPlayListRow } from './CarPlayListRow'
import type { SidebarView } from './CarPlaySidebar'
import { calls } from '../../data/mockCalls'
import type { Call } from '../../types/live-feed'

export function CarPlayCallListScreen({
  view,
  onSelectCall,
}: {
  view: SidebarView
  onSelectCall: (call: Call) => void
}) {
  const visible = view === 'escalations' ? calls.filter((call) => call.needsAttention) : calls

  return (
    <div className="flex h-full flex-1 flex-col gap-lg overflow-y-auto bg-canvas-dark p-xl">
      <span className="type-carplay-lg text-ink">{view === 'escalations' ? 'Escalations' : 'Live Calls'}</span>

      {visible.length === 0 ? (
        <span className="type-carplay-md text-mute">No escalations right now.</span>
      ) : (
        <div className="flex flex-col gap-md">
          {visible.map((call) => (
            <CarPlayListRow key={call.id} call={call} onSelect={onSelectCall} />
          ))}
        </div>
      )}
    </div>
  )
}
