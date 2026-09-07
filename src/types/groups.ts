export type GroupKind = 'static' | 'dynamic'

export type MemberStatus = 'available' | 'on-call' | 'wrap-up' | 'unavailable' | 'not-logged-in'

export interface GroupMember {
  id: string
  name: string
  team: string
  status: MemberStatus
}

export interface GroupMetric {
  label: 'Avg QA Score' | 'CSAT'
  value: string
}

export type ContactType = 'inbound-call' | 'outbound-call' | 'email' | 'social' | 'chat' | 'work-item'

export interface Group {
  id: string
  name: string
  kind: GroupKind
  metric: GroupMetric
  contactType: ContactType
  members: GroupMember[]
}
