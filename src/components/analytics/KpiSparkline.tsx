import { Line, LineChart, ResponsiveContainer } from 'recharts'
import { CHART_COLORS } from './chartTheme'
import type { KpiHistoryPoint } from '../../lib/kpiTrend'

export function KpiSparkline({ history, isGood }: { history: KpiHistoryPoint[]; isGood: boolean }) {
  return (
    <div className="h-8 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isGood ? CHART_COLORS.primary : CHART_COLORS.statusEscalation}
            strokeWidth={1.75}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
