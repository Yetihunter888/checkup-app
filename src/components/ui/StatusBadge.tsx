import type { CallStatus } from '../../types/live-feed'

const STATUS_CONFIG: Record<CallStatus, { label: string; dot: string; text: string }> = {
  talking: { label: 'Talking', dot: 'bg-status-live', text: 'text-status-live' },
  hold: { label: 'On Hold', dot: 'bg-status-hold', text: 'text-status-hold' },
  transferring: { label: 'Transferring', dot: 'bg-status-hold', text: 'text-status-hold' },
  silence: { label: 'Silence', dot: 'bg-status-silence', text: 'text-status-silence' },
}

/** `status-badge` component from DESIGN-checkup.md: transparent pill, colored text + leading dot. */
export function StatusBadge({ status }: { status: CallStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={`type-caption-md inline-flex shrink-0 items-center gap-xs whitespace-nowrap rounded-full px-sm py-[3px] ${config.text}`}
    >
      <span className={`size-2 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  )
}

/** Escalation-toned status badge for the "needs attention" flag, reusing the same shape. */
export function AttentionBadge() {
  return (
    <span className="type-caption-md inline-flex items-center gap-xs rounded-full px-sm py-[3px] text-status-escalation">
      <span className="size-2 rounded-full bg-status-escalation" aria-hidden="true" />
      Needs Attention
    </span>
  )
}
