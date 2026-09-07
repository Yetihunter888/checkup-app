import type { TagPriority } from './director'

export interface EscalationRecord {
  id: string
  agentName: string
  reason: string
  dueDate: string | null
  priority: TagPriority
}
