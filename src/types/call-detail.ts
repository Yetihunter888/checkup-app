import type { NoteAuthor } from '../components/ui/NoteBadge'
import type { Sentiment } from './live-feed'

export type CommentTag = 'coaching' | 'great-win' | 'compliance-risk' | 'escalation' | 'policy-error'

export interface Comment {
  id: string
  timestampSeconds: number
  tag: CommentTag
  author: NoteAuthor
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
