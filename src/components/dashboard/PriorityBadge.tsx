import type { TagPriority } from '../../types/director'

const CONFIG: Record<TagPriority, { label: string; text: string; border: string; bg: string }> = {
  low: { label: 'Low', text: 'text-mute', border: 'border-hairline-strong', bg: 'bg-surface-elevated' },
  medium: { label: 'Medium', text: 'text-status-hold', border: 'border-status-hold', bg: 'bg-status-hold/10' },
  high: { label: 'High', text: 'text-status-escalation', border: 'border-status-escalation', bg: 'bg-status-escalation/10' },
}

/** Same rounded-square classification shape as NoteBadge, reusing the app's existing severity colors (neutral/amber/red) rather than a new priority palette. */
export function PriorityBadge({ priority }: { priority: TagPriority }) {
  const config = CONFIG[priority]
  return (
    <span
      className={`type-caption-md inline-flex shrink-0 items-center whitespace-nowrap rounded-sm border px-sm py-[3px] ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  )
}
