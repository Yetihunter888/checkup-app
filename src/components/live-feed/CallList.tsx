import { CallRow } from './CallRow'
import { EmptyState } from './EmptyState'
import type { Call } from '../../types/live-feed'

export function CallList({
  calls,
  onSelectCall,
}: {
  calls: Call[]
  onSelectCall: (call: Call) => void
}) {
  if (calls.length === 0) {
    return <EmptyState message="No calls match this view right now." />
  }

  return (
    <div className="flex flex-col gap-sm">
      {calls.map((call) => (
        <CallRow key={call.id} call={call} onSelect={onSelectCall} />
      ))}
    </div>
  )
}
