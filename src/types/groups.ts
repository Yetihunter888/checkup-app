import type { TrendPoint } from './qa-scoring'

export type GroupKind = 'static' | 'dynamic'

export type MemberStatus = 'available' | 'on-call' | 'wrap-up' | 'unavailable' | 'not-logged-in'

/** A single recognition/award shown on Agent Profile — e.g. "Top CSAT — Q2 2026". */
export interface Recognition {
  label: string
}

export interface GroupMember {
  id: string
  name: string
  team: string
  status: MemberStatus
  /** Everything below backs the Agent Profile screen. */
  role: string
  skills: string[]
  languages: string[]
  location: string
  timezone: string
  /** ISO date the agent started. */
  employedSince: string
  /** Most recent completed QA score (0-100) — the sparkline's "Now" point. */
  currentQaScore: number
  /** The 4 scores before currentQaScore, oldest first — same shape as QA Scoring's TrendSparkline history. */
  qaScoreTrend: TrendPoint[]
  recognitions: Recognition[]
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
  /** A team can handle more than one contact type at once (e.g. Inbound Call + Chat). */
  contactTypes: ContactType[]
  teamLead: string
  members: GroupMember[]
}
