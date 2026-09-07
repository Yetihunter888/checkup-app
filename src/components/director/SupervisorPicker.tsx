import { Avatar } from '../ui/Avatar'
import type { Supervisor } from '../../types/director'

export function SupervisorPicker({
  supervisors,
  selectedId,
  onSelect,
}: {
  supervisors: Supervisor[]
  selectedId: string | null
  onSelect: (supervisor: Supervisor) => void
}) {
  return (
    <div className="flex flex-col gap-sm">
      {supervisors.map((supervisor) => {
        const selected = supervisor.id === selectedId
        return (
          <button
            key={supervisor.id}
            type="button"
            onClick={() => onSelect(supervisor)}
            className={`flex items-center gap-md rounded-lg bg-surface p-md text-left transition-colors ${
              selected ? 'bg-surface-elevated ring-1 ring-primary' : 'hover:bg-surface-elevated'
            }`}
          >
            <Avatar name={supervisor.name} />
            <div className="flex min-w-0 flex-col gap-xxs">
              <span className="type-card-title truncate text-ink">{supervisor.name}</span>
              <span className="type-body-sm truncate text-mute">{supervisor.team}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
