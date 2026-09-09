export type TagPriority = 'low' | 'medium' | 'high'

export interface Supervisor {
  id: string
  name: string
  team: string
}

export interface SupervisorTag {
  id: string
  supervisorId: string
  supervisorName: string
  note: string
  priority: TagPriority | null
  dueDate: string | null
  createdAt: string
  agentName: string
  /** GroupMember.id of the tagged agent — lets Agent Profile pull real linked history instead of a disconnected list. */
  agentId: string
  callId: string
}
