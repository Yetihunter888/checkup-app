import type { NoteAuthor } from '../components/ui/NoteBadge'
import type { QaQuota } from './call-detail'

export type ScoreControlType = 'numeric' | 'pass-fail'
export type PassFailValue = 'pass' | 'fail'

export interface ScoreCategory {
  id: string
  label: string
  /** Percentage points this category contributes to the total; all categories sum to 100. */
  weight: number
  controlType: ScoreControlType
  /** 0-10 for numeric categories, 'pass'/'fail' for pass-fail, null = not yet scored. */
  value: number | PassFailValue | null
  /** Only 'ai' and 'supervisor' apply to scoring — a Director doesn't score calls. */
  source: NoteAuthor
}

export interface TrendPoint {
  label: string
  score: number
}

export interface QaScorecard {
  agentName: string
  qaQuota: QaQuota
  categories: ScoreCategory[]
  trend: TrendPoint[]
}
