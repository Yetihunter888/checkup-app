import type { NoteAuthor } from '../components/ui/NoteBadge'
import type { Sentiment } from './live-feed'

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

export interface SentimentSegment {
  startSeconds: number
  endSeconds: number
  sentiment: Sentiment
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
  sentimentTrack: SentimentSegment[]
}
