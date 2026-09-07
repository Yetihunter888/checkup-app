export type GroupKind = 'static' | 'dynamic'

export interface GroupMember {
  id: string
  name: string
  team: string
}

export interface GroupMetric {
  label: 'Avg QA Score' | 'CSAT'
  value: string
}

export interface Group {
  id: string
  name: string
  kind: GroupKind
  metric: GroupMetric
  members: GroupMember[]
}
