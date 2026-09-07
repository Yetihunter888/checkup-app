import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CHART_COLORS } from './chartTheme'
import { formatKpiValue } from '../../lib/kpiFormat'
import type { KpiHistoryPoint } from '../../lib/kpiTrend'
import type { Kpi } from '../../types/analytics'

function ChartTooltip({
  active,
  payload,
  unit,
}: {
  active?: boolean
  payload?: { value: number; payload: KpiHistoryPoint }[]
  unit: Kpi['unit']
}) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="rounded-md border border-hairline bg-surface-elevated px-md py-sm shadow-modal">
      <p className="type-caption-sm text-mute">{point.label}</p>
      <p className="type-body-strong text-ink">{formatKpiValue(unit, point.value)}</p>
    </div>
  )
}

/** The one larger chart — a full trend for whichever KPI is selected above, styled entirely from DESIGN-checkup.md tokens rather than recharts' default theme. */
export function KpiTrendChart({
  kpi,
  currentValue,
  history,
}: {
  kpi: Kpi
  currentValue: number
  history: KpiHistoryPoint[]
}) {
  return (
    <div className="flex flex-col gap-md rounded-lg bg-surface p-lg">
      <div className="flex items-center justify-between">
        <span className="type-heading-md text-ink">{kpi.label} Trend</span>
        <span className="type-heading-md text-primary">{formatKpiValue(kpi.unit, currentValue)}</span>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="kpiFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.35} />
                <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_COLORS.hairline} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: CHART_COLORS.mute, fontSize: 11 }}
              axisLine={{ stroke: CHART_COLORS.hairline }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: CHART_COLORS.mute, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip content={<ChartTooltip unit={kpi.unit} />} cursor={{ stroke: CHART_COLORS.hairline }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              fill="url(#kpiFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
