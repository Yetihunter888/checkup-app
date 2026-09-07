import { GroupKindBadge } from './GroupKindBadge'
import type { Group } from '../../types/groups'

function SelectionMark({ selected }: { selected: boolean }) {
  return (
    <span
      className={`absolute right-3 top-3 flex size-6 items-center justify-center rounded-full ${
        selected ? 'bg-primary text-on-primary' : 'border border-hairline-strong bg-transparent'
      }`}
      aria-hidden="true"
    >
      {selected && (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5l3.2 3.2L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

/**
 * `data-card` from DESIGN-checkup.md. Doubles as the multi-select surface
 * for the merge flow: in select mode the whole card becomes a toggle and
 * reuses the same border-primary + surface-elevated language CallRow uses
 * for its selected/hover state, so "selected" means the same thing across
 * both screens.
 */
export function GroupCard({
  group,
  mode,
  selected = false,
  onOpen,
  onToggleSelect,
}: {
  group: Group
  mode: 'browse' | 'select'
  selected?: boolean
  onOpen?: (group: Group) => void
  onToggleSelect?: (group: Group) => void
}) {
  return (
    <button
      type="button"
      onClick={() => (mode === 'select' ? onToggleSelect?.(group) : onOpen?.(group))}
      className={`relative flex flex-col items-start gap-sm rounded-lg bg-surface p-lg text-left transition-colors hover:bg-surface-elevated ${
        mode === 'select' && selected ? 'bg-surface-elevated ring-1 ring-primary' : ''
      }`}
    >
      {mode === 'select' && <SelectionMark selected={selected} />}

      <div className="flex w-full flex-col gap-xxs pr-6">
        <span className="type-card-title text-ink">{group.name}</span>
        {group.kind === 'dynamic' && <GroupKindBadge />}
      </div>

      <span className="type-body-sm text-mute">
        {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
      </span>

      <div className="flex flex-col gap-xxs">
        <span className="type-caption-md text-mute">{group.metric.label}</span>
        <span className="type-heading-md text-ink">{group.metric.value}</span>
      </div>
    </button>
  )
}
