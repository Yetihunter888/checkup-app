import type { EscalationRecord } from '../types/dashboard'

function daysFromNow(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

// Seed rows for escalationsStore.ts — real takeovers from
// LiveInterventionScreen get prepended to this list at runtime via
// addEscalation, the same shared-store pattern as supervisorTagsStore.ts.
export const mockEscalations: EscalationRecord[] = [
  {
    id: 'esc-1',
    agentName: 'Jonah Kessler',
    agentId: 'm-jonah',
    reason: 'Takeover completed after 20s of dead air — needs a QA follow-up this week.',
    createdAt: daysFromNow(-2),
    dueDate: daysFromNow(-1),
    priority: 'high',
  },
  {
    id: 'esc-2',
    agentName: 'Sam O’Rourke',
    agentId: 'm-sam',
    reason: 'Supervisor whispered coaching mid-call; agent should be checked in on.',
    createdAt: daysFromNow(-1),
    dueDate: daysFromNow(3),
    priority: 'medium',
  },
]
