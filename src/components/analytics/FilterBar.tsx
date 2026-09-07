import { FilterSelect } from './FilterSelect'
import {
  callTypeOptions,
  channelOptions,
  dateRangeOptions,
  groupOptions,
  teamOptions,
} from '../../data/mockAnalytics'
import { SavedViewChip } from '../ui/Chip'
import type { AnalyticsFilters, DateRangeId } from '../../types/analytics'

export function FilterBar({
  filters,
  onChange,
}: {
  filters: AnalyticsFilters
  onChange: (next: AnalyticsFilters) => void
}) {
  function set<K extends keyof AnalyticsFilters>(key: K, value: AnalyticsFilters[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex gap-xs">
        {dateRangeOptions.map((option) => (
          <SavedViewChip
            key={option.id}
            active={filters.dateRange === option.id}
            onClick={() => set('dateRange', option.id as DateRangeId)}
          >
            {option.label}
          </SavedViewChip>
        ))}
      </div>

      <div className="flex gap-sm overflow-x-auto pb-xxs">
        <FilterSelect label="Team" value={filters.team} options={teamOptions} onChange={(v) => set('team', v)} />
        <FilterSelect label="Group" value={filters.group} options={groupOptions} onChange={(v) => set('group', v)} />
        <FilterSelect
          label="Type"
          value={filters.callType}
          options={callTypeOptions}
          onChange={(v) => set('callType', v)}
        />
        <FilterSelect
          label="Channel"
          value={filters.channel}
          options={channelOptions}
          onChange={(v) => set('channel', v)}
        />
      </div>
    </div>
  )
}
