import { KpiSparkline } from './KpiSparkline'
import { CardAccentBar } from '../ui/CardAccentBar'
import { formatKpiDelta, formatKpiValue } from '../../lib/kpiFormat'
import type { KpiHistoryPoint } from '../../lib/kpiTrend'
import type { Kpi } from '../../types/analytics'

/**
 * The accent bar only appears when the trend is unfavorable — an "at a
 * glance, which of these seven needs attention" signal, the same
 * card-accent-bar meaning used everywhere else (status/urgency, never
 * authorship). Clicking selects this KPI for the big trend chart below;
 * the chevron + hover ring are a separate, still-inert affordance for a
 * future "open the underlying call list" drill-down.
 */
export function KpiCard({
  kpi,
  currentValue,
  history,
  selected,
  onSelect,
}: {
  kpi: Kpi
  currentValue: number
  history: KpiHistoryPoint[]
  selected: boolean
  onSelect: () => void
}) {
  const first = history[0]?.value ?? currentValue
  const last = history[history.length - 1]?.value ?? currentValue
  const delta = last - first
  const isGood = kpi.goodDirection === 'up' ? delta >= 0 : delta <= 0
  const isFlat = Math.abs(delta) < 0.001

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex w-[168px] shrink-0 text-left"
    >
      {!isFlat && !isGood && <CardAccentBar colorClassName="bg-status-escalation" />}
      <div
        className={`flex flex-1 flex-col gap-sm p-lg transition-colors ${
          !isFlat && !isGood ? 'rounded-r-lg' : 'rounded-lg'
        } ${selected ? 'bg-surface-elevated ring-1 ring-primary' : 'bg-surface group-hover:bg-surface-elevated group-hover:ring-1 group-hover:ring-primary'}`}
      >
        <div className="flex items-center justify-between gap-xs">
          <span className="type-caption-md text-mute">{kpi.label}</span>
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            className="shrink-0 text-mute opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          >
            <path d="M1 1l5 4.5L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className="type-heading-lg text-ink">{formatKpiValue(kpi.unit, currentValue)}</span>

        <span className={`type-caption-sm ${isFlat ? 'text-mute' : isGood ? 'text-primary' : 'text-status-escalation'}`}>
          {isFlat ? 'No change' : formatKpiDelta(kpi.unit, delta)}
        </span>

        <KpiSparkline history={history} isGood={isFlat ? true : isGood} />
      </div>
    </button>
  )
}
