import { mockCallDetail } from '../data/mockCallDetail'
import { lastThreeNotes } from '../data/mockIntervention'
import type { NoteAuthor } from '../components/ui/NoteBadge'
import type { EscalationRecord } from '../types/dashboard'
import type { SupervisorTag } from '../types/director'

export interface CoachingHistoryEntry {
  id: string
  author: NoteAuthor
  authorName: string
  createdAt: string
  text: string
  sourceLabel: string
}

/**
 * Pulls an agent's real linked history from every existing source that
 * carries an `agentId` — Call Detail comments, Live Intervention notes,
 * escalations, and supervisor tags — rather than a static list that looks
 * the same regardless of which agent's profile is open. `escalations` and
 * `supervisorTags` are passed in (already subscribed via useEscalations /
 * useSupervisorTags) so this stays reactive to their shared stores.
 */
export function buildCoachingHistory(
  agentId: string,
  escalations: EscalationRecord[],
  supervisorTags: SupervisorTag[],
): CoachingHistoryEntry[] {
  const fromCallDetail: CoachingHistoryEntry[] = mockCallDetail.comments
    .filter((comment) => comment.agentId === agentId)
    .map((comment) => ({
      id: comment.id,
      author: comment.author,
      authorName: comment.authorName,
      createdAt: comment.createdAt,
      text: comment.text,
      sourceLabel: 'Call Review',
    }))

  const fromIntervention: CoachingHistoryEntry[] = lastThreeNotes
    .filter((note) => note.agentId === agentId)
    .map((note) => ({
      id: note.id,
      author: note.author,
      authorName: note.authorName,
      createdAt: note.createdAt,
      text: note.text,
      sourceLabel: 'Live Intervention',
    }))

  const fromEscalations: CoachingHistoryEntry[] = escalations
    .filter((escalation) => escalation.agentId === agentId)
    .map((escalation) => ({
      id: escalation.id,
      author: 'supervisor',
      authorName: 'Takeover',
      createdAt: escalation.createdAt,
      text: escalation.reason,
      sourceLabel: 'Escalation',
    }))

  const fromSupervisorTags: CoachingHistoryEntry[] = supervisorTags
    .filter((tag) => tag.agentId === agentId)
    .map((tag) => ({
      id: tag.id,
      author: 'director',
      authorName: tag.supervisorName,
      createdAt: tag.createdAt,
      text: tag.note,
      sourceLabel: 'Director Tag',
    }))

  return [...fromCallDetail, ...fromIntervention, ...fromEscalations, ...fromSupervisorTags].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
