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
  // Agent's actual state across the call — talking is the default; the two
  // exceptions below are deliberately placed to double as test fixtures:
  // a hold segment (95-118s) and a silence segment 20s+ long (210-233s,
  // 23s), matching silenceRanges below exactly so the dead-air overlay,
  // skip-silence playback, and this state track never disagree.
  agentStateTrack: [
    { startSeconds: 0, endSeconds: 95, state: 'talking' },
    { startSeconds: 95, endSeconds: 118, state: 'hold' },
    { startSeconds: 118, endSeconds: 210, state: 'talking' },
    { startSeconds: 210, endSeconds: 233, state: 'silence' },
    { startSeconds: 233, endSeconds: 312, state: 'talking' },
  ],
  // Checkpoints starting at 10s, every 50s after — a clear
  // positive -> shifting -> negative story matching the call's own
  // narrative (fine at first, wobbling after the hold, negative once the
  // long silence and the escalation comment at 238s land).
  sentimentCheckpoints: [
    { timestampSeconds: 10, mood: 'positive' },
    { timestampSeconds: 60, mood: 'positive' },
    { timestampSeconds: 110, mood: 'shifting' },
    { timestampSeconds: 160, mood: 'shifting' },
    { timestampSeconds: 210, mood: 'negative' },
    { timestampSeconds: 260, mood: 'negative' },
    { timestampSeconds: 310, mood: 'negative' },
  ],
  silenceRanges: [{ startSeconds: 210, endSeconds: 233 }],
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
