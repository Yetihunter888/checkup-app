import type { CallDetail } from '../types/call-detail'

// Same call as c-1 in mockCalls.ts (Maria Alvarez, 5:12, flagged for
// "rising frustration, 2 escalation phrases") — this is that call opened
// for review.
export const mockCallDetail: CallDetail = {
  id: 'c-1',
  agentName: 'Maria Alvarez',
  customerName: 'Customer — Diane R.',
  durationSeconds: 312,
  qaQuota: { completed: 12, total: 15 },
  sentimentTrack: [
    { startSeconds: 0, endSeconds: 80, sentiment: 'neutral' },
    { startSeconds: 80, endSeconds: 270, sentiment: 'negative' },
    { startSeconds: 270, endSeconds: 312, sentiment: 'neutral' },
  ],
  silenceRanges: [{ startSeconds: 210, endSeconds: 225 }],
  comments: [
    {
      id: 'cm-1',
      timestampSeconds: 32,
      tag: 'coaching',
      author: 'ai',
      authorName: 'AI',
      createdAt: '2026-09-03T14:32:00',
      text: 'Agent skipped the standard greeting disclosure — worth a coaching note on call openings.',
    },
    {
      id: 'cm-2',
      timestampSeconds: 95,
      tag: 'great-win',
      author: 'supervisor',
      authorName: 'Jamie Torres',
      createdAt: '2026-09-04T10:05:00',
      text: "Great empathy statement — acknowledged the customer's frustration before explaining the fee.",
    },
    {
      id: 'cm-3',
      timestampSeconds: 161,
      tag: 'compliance-risk',
      author: 'ai',
      authorName: 'AI',
      createdAt: '2026-09-03T14:32:00',
      text: 'Identity verification was not confirmed before account details were discussed.',
    },
    {
      id: 'cm-4',
      timestampSeconds: 238,
      tag: 'escalation',
      author: 'director',
      authorName: 'Alicia Grant',
      createdAt: '2026-09-05T16:20:00',
      text: 'Customer threatened to cancel. Please review with Maria this week.',
    },
  ],
}
