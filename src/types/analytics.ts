export type KpiUnit = 'percent' | 'score5' | 'time' | 'rate'
export type GoodDirection = 'up' | 'down'

export interface Kpi {
  id: string
  label: string
  unit: KpiUnit
  currentValue: number
  volatility: number
  goodDirection: GoodDirection
}

export interface FilterOption {
  id: string
  label: string
}

export type DateRangeId = '7d' | '30d'

export interface AnalyticsFilters {
  dateRange: DateRangeId
  team: string
  group: string
  callType: string
  channel: string
}
