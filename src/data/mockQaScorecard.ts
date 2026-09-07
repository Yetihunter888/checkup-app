import type { QaScorecard } from '../types/qa-scoring'

// Same call/agent as mockCallDetail.ts (Maria Alvarez) — the scorecard
// opened after reviewing that call.
export const mockQaScorecard: QaScorecard = {
  agentName: 'Maria Alvarez',
  qaQuota: { completed: 12, total: 15 },
  categories: [
    { id: 'greeting', label: 'Greeting', weight: 15, controlType: 'pass-fail', value: 'pass', source: 'ai' },
    { id: 'issue-resolution', label: 'Issue Resolution', weight: 35, controlType: 'numeric', value: 7, source: 'ai' },
    { id: 'compliance', label: 'Compliance Disclosures', weight: 35, controlType: 'pass-fail', value: 'fail', source: 'ai' },
    { id: 'closing', label: 'Closing', weight: 15, controlType: 'numeric', value: null, source: 'supervisor' },
  ],
  trend: [
    { label: '5 ago', score: 74 },
    { label: '4 ago', score: 81 },
    { label: '3 ago', score: 77 },
    { label: '2 ago', score: 85 },
    { label: 'Last', score: 88 },
  ],
}
