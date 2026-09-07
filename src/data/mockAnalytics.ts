import { initialGroups } from './mockGroups'
import { mockQaScorecard } from './mockQaScorecard'
import type { FilterOption, Kpi } from '../types/analytics'

// The only KPI reusing real app data rather than an invented number: QA
// Average = the same weekly quota figure shown on the Call Detail header,
// QA Scoring screen, and Task Dashboard (mockQaScorecard.qaQuota, 12 of
// 15 → 80%). "QA average" reads most naturally as "average QA score,"
// but qaQuota measures completion, not a score — there's no fleet-wide
// score-average anywhere in this app (the one real score, from QA
// Scoring's weightedTotal(), belongs to a single in-progress draft, not
// an aggregate), so quota completion is the honest metric to reuse here.
const qaAverageValue = Math.round((mockQaScorecard.qaQuota.completed / mockQaScorecard.qaQuota.total) * 100)

export const kpis: Kpi[] = [
  { id: 'csat', label: 'CSAT', unit: 'score5', currentValue: 4.3, volatility: 0.3, goodDirection: 'up' },
  { id: 'aht', label: 'AHT', unit: 'time', currentValue: 408, volatility: 45, goodDirection: 'down' },
  { id: 'fcr', label: 'FCR', unit: 'percent', currentValue: 76, volatility: 6, goodDirection: 'up' },
  { id: 'qa-average', label: 'QA Average', unit: 'percent', currentValue: qaAverageValue, volatility: 5, goodDirection: 'up' },
  { id: 'sla', label: 'SLA Adherence', unit: 'percent', currentValue: 94, volatility: 4, goodDirection: 'up' },
  { id: 'occupancy', label: 'Occupancy', unit: 'percent', currentValue: 87, volatility: 5, goodDirection: 'up' },
  { id: 'abandon', label: 'Abandon Rate', unit: 'rate', currentValue: 4.2, volatility: 1.4, goodDirection: 'down' },
]

export const dateRangeOptions: FilterOption[] = [
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
]

// Reuses the same team names as mockCalls.ts / GroupsScreen rather than a
// disconnected list.
export const teamOptions: FilterOption[] = [
  { id: 'all', label: 'All Teams' },
  { id: 'team-east', label: 'Team East' },
  { id: 'billing', label: 'Billing Specialists' },
  { id: 'team-west', label: 'Team West' },
  { id: 'retention', label: 'Retention' },
]

// Reuses the actual groups from mockGroups.ts.
export const groupOptions: FilterOption[] = [
  { id: 'all', label: 'All Groups' },
  ...initialGroups.map((group) => ({ id: group.id, label: group.name })),
]

export const callTypeOptions: FilterOption[] = [
  { id: 'all', label: 'All Types' },
  { id: 'inbound', label: 'Inbound' },
  { id: 'outbound', label: 'Outbound' },
]

export const channelOptions: FilterOption[] = [
  { id: 'all', label: 'All Channels' },
  { id: 'voice', label: 'Voice' },
  { id: 'chat', label: 'Chat' },
  { id: 'email', label: 'Email' },
]
