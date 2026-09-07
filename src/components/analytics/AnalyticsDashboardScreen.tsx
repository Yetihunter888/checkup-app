import { useMemo, useState } from 'react'
import { AnomalyCallout } from './AnomalyCallout'
import { FilterBar } from './FilterBar'
import { KpiCard } from './KpiCard'
import { KpiTrendChart } from './KpiTrendChart'
import { BottomTabBar } from '../layout/BottomTabBar'
import type { TabId } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { kpis } from '../../data/mockAnalytics'
import { filterVariation, generateHistory } from '../../lib/kpiTrend'
import type { AnalyticsFilters } from '../../types/analytics'

const DAILY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKLY_LABELS = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5']

const DEFAULT_FILTERS: AnalyticsFilters = {
  dateRange: '7d',
  team: 'all',
  group: 'all',
  callType: 'all',
  channel: 'all',
}

export function AnalyticsDashboardScreen({ onNavigateTab }: { onNavigateTab: (tab: TabId) => void }) {
  const [filters, setFilters] = useState<AnalyticsFilters>(DEFAULT_FILTERS)
  const [selectedKpiId, setSelectedKpiId] = useState(kpis[3].id) // QA Average by default

  /**
   * Every one of the five filters feeds a deterministic hash (see
   * lib/kpiTrend.ts) that nudges each KPI's value and history by up to
   * ±8% — so changing any control (not just team/date) visibly changes
   * the numbers, reproducibly, without hand-authoring a value for every
   * filter combination.
   */
  const isUnfiltered =
    filters.team === 'all' && filters.group === 'all' && filters.callType === 'all' && filters.channel === 'all'

  const series = useMemo(() => {
    const labels = filters.dateRange === '7d' ? DAILY_LABELS : WEEKLY_LABELS
    return kpis.map((kpi) => {
      // "All Teams / All Groups / All Types / All Channels" shows the
      // real unmodified value — QA Average must read exactly the true
      // 12-of-15 figure here, not a hash-nudged approximation of it.
      const variationSeed = `${kpi.id}|${filters.team}|${filters.group}|${filters.callType}|${filters.channel}`
      const factor = isUnfiltered ? 0 : filterVariation(variationSeed)
      const adjustedCurrent = kpi.currentValue * (1 + factor)
      const history = generateHistory(`${kpi.id}|${filters.dateRange}|${variationSeed}`, adjustedCurrent, kpi.volatility, labels)
      return { kpi, currentValue: adjustedCurrent, history }
    })
  }, [filters, isUnfiltered])

  const selected = series.find((entry) => entry.kpi.id === selectedKpiId) ?? series[0]

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <TopHeader title="Check Up" />

      <main className="flex flex-1 flex-col gap-xl overflow-y-auto px-lg py-lg">
        <div className="flex flex-col gap-xxs">
          <span className="type-heading-xl text-ink">Analytics</span>
          <span className="type-body-sm text-mute">Fleet performance across every team, this period.</span>
        </div>

        <FilterBar filters={filters} onChange={setFilters} />

        <div className="flex flex-col gap-sm">
          <span className="type-caption-md text-mute">Tap a KPI to trend it below</span>
          <div className="flex gap-sm overflow-x-auto pb-xxs">
            {series.map(({ kpi, currentValue, history }) => (
              <KpiCard
                key={kpi.id}
                kpi={kpi}
                currentValue={currentValue}
                history={history}
                selected={kpi.id === selectedKpiId}
                onSelect={() => setSelectedKpiId(kpi.id)}
              />
            ))}
          </div>
        </div>

        <KpiTrendChart kpi={selected.kpi} currentValue={selected.currentValue} history={selected.history} />

        <AnomalyCallout
          headline="Team East sentiment dropped 18% this week"
          detail="AI-detected across 6 flagged calls — worth a closer look before next week's QA cycle."
        />
      </main>

      <BottomTabBar active="reports" onNavigate={onNavigateTab} />
    </div>
  )
}
