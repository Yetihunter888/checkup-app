import type { NoteAuthor } from '../components/ui/NoteBadge'

export type CommentTag = 'coaching' | 'great-win' | 'compliance-risk' | 'escalation' | 'policy-error'

export interface Comment {
  id: string
  timestampSeconds: number
  tag: CommentTag
  author: NoteAuthor
  /** The actual person's name for supervisor/director notes (e.g. "Jamie Torres"); just "AI" for AI-authored ones — there's no person behind those. */
  authorName: string
  /** ISO timestamp of when the note was added — distinct from timestampSeconds, which is the note's position in the call. */
  createdAt: string
  text: string
}

export interface SilenceRange {
  startSeconds: number
  endSeconds: number
}

/**
 * A distinct mood axis from the shared `Sentiment` type (live-feed's
 * positive/neutral/negative) — "shifting" is a real third state ("trending
 * uncertain"), not a renamed "neutral" ("no signal"), so it's kept separate
 * rather than extending `Sentiment` with a case its other consumers
 * (SentimentDot, live-feed rows) have no data for.
 */
export type SentimentMood = 'positive' | 'shifting' | 'negative'

/** A single checkpoint in the call's sentiment story — a point in time, not a range. */
export interface SentimentCheckpoint {
  timestampSeconds: number
  mood: SentimentMood
}

/** Agent's actual state at a point in the call — drives the track below the waveform. */
export type AgentState = 'talking' | 'hold' | 'silence'

export interface StateSegment {
  startSeconds: number
  endSeconds: number
  state: AgentState
}

export interface QaQuota {
  completed: number
  total: number
}

export interface CallDetail {
  id: string
  agentName: string
  customerName: string
  durationSeconds: number
  qaQuota: QaQuota
  comments: Comment[]
  silenceRanges: SilenceRange[]
  agentStateTrack: StateSegment[]
  sentimentCheckpoints: SentimentCheckpoint[]
}
