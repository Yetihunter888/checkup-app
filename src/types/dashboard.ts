import type { TagPriority } from './director'

export interface EscalationRecord {
  id: string
  agentName: string
  /** GroupMember.id of the escalated agent — lets Agent Profile pull real linked history instead of a disconnected list. */
  agentId: string
  reason: string
  /** ISO timestamp of when the escalation was logged — distinct from dueDate, which is when the follow-up is owed. */
  createdAt: string
  dueDate: string | null
  priority: TagPriority
}
