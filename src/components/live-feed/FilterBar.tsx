import { FilterChip, SavedViewChip } from '../ui/Chip'
import type { SavedView } from '../../types/live-feed'

export function FilterBar({
  savedViews,
  activeViewId,
  onSelectView,
}: {
  savedViews: SavedView[]
  activeViewId: string
  onSelectView: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex gap-sm overflow-x-auto pb-xxs">
        <FilterChip label="Team" value="All" />
        <FilterChip label="Group" value="All" />
        <FilterChip label="Metric" value="None" />
      </div>
      <div className="flex gap-xs overflow-x-auto pb-xxs">
        {savedViews.map((view) => (
          <SavedViewChip
            key={view.id}
            active={view.id === activeViewId}
            onClick={() => onSelectView(view.id)}
          >
            {view.label}
          </SavedViewChip>
        ))}
      </div>
    </div>
  )
}
