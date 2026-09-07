import type { CommentTag } from '../../types/call-detail'

/**
 * DESIGN-checkup.md defines exactly three flag colors for the waveform,
 * tied to meaning: "a green flag = a Supervisor-tagged 'Great Win,' a
 * purple flag = an AI-detected moment worth reviewing, a red flag = an
 * escalation/compliance risk." Prompt 4 asks for four tag types, so
 * Compliance Risk and Escalation intentionally share status-escalation
 * red — that doubling is the doc's own rule, not a new color. Coaching
 * Opportunity reuses note-ai purple ("worth reviewing"); Great Win reuses
 * note-supervisor green. No new hue was introduced for this screen.
 */
export const TAG_CONFIG: Record<CommentTag, { label: string; text: string; bg: string; border: string; dot: string }> = {
  coaching: {
    label: 'Coaching Opportunity',
    text: 'text-note-ai',
    bg: 'bg-note-ai-pale',
    border: 'border-note-ai',
    dot: 'bg-note-ai',
  },
  'great-win': {
    label: 'Great Win',
    text: 'text-note-supervisor',
    bg: 'bg-note-supervisor-pale',
    border: 'border-note-supervisor',
    dot: 'bg-note-supervisor',
  },
  'compliance-risk': {
    label: 'Compliance Risk',
    text: 'text-status-escalation',
    bg: 'bg-status-escalation/10',
    border: 'border-status-escalation',
    dot: 'bg-status-escalation',
  },
  escalation: {
    label: 'Escalation',
    text: 'text-status-escalation',
    bg: 'bg-status-escalation/10',
    border: 'border-status-escalation',
    dot: 'bg-status-escalation',
  },
  'policy-error': {
    label: 'Policy Error',
    text: 'text-status-escalation',
    bg: 'bg-status-escalation/10',
    border: 'border-status-escalation',
    dot: 'bg-status-escalation',
  },
}
