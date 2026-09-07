import { CarPlayListRow } from './CarPlayListRow'
import type { SidebarView } from './CarPlaySidebar'
import { calls } from '../../data/mockCalls'
import type { Call } from '../../types/live-feed'

/**
 * The middle pane of the three-pane head-unit layout — fixed width, not
 * flex-1, so the detail pane gets the remaining (larger) share of a wide
 * CarPlay display. Selecting a row no longer navigates away from this
 * pane; it just marks that row selected and hands the call up to the
 * shell, which populates the third pane.
 */
export function CarPlayCallListScreen({
  view,
  selectedCallId,
  onSelectCall,
}: {
  view: SidebarView
  selectedCallId: string | null
  onSelectCall: (call: Call) => void
}) {
  const visible = view === 'escalations' ? calls.filter((call) => call.needsAttention) : calls

  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col gap-lg overflow-y-auto border-r border-hairline bg-canvas-dark p-xl">
      <span className="type-carplay-lg text-ink">{view === 'escalations' ? 'Escalations' : 'Live Calls'}</span>

      {visible.length === 0 ? (
        <span className="type-carplay-md text-mute">No escalations right now.</span>
      ) : (
        <div className="flex flex-col gap-md">
          {visible.map((call) => (
            <CarPlayListRow
              key={call.id}
              call={call}
              selected={call.id === selectedCallId}
              onSelect={onSelectCall}
            />
          ))}
        </div>
      )}
    </div>
  )
}
