import type { CallStatus } from '../../types/live-feed'
import type { MemberStatus } from '../../types/groups'

/** Exported so other components (e.g. CallRow's accent bar) can reuse the exact same status→color mapping rather than duplicating it. */
export const STATUS_CONFIG: Record<CallStatus, { label: string; dot: string; text: string }> = {
  talking: { label: 'Talking', dot: 'bg-status-live', text: 'text-status-live' },
  hold: { label: 'On Hold', dot: 'bg-status-hold', text: 'text-status-hold' },
  transferring: { label: 'Transferring', dot: 'bg-status-hold', text: 'text-status-hold' },
  silence: { label: 'Silence', dot: 'bg-status-silence', text: 'text-status-silence' },
}

/**
 * Same status-color vocabulary MemberStatusBreakdown already established
 * for group cards (available/on-call -> live, wrap-up -> hold, unavailable
 * -> silence, not-logged-in -> ash) — reused here so Agent Profile's status
 * badge agrees with the group list it was opened from.
 */
export const MEMBER_STATUS_CONFIG: Record<MemberStatus, { label: string; dot: string; text: string }> = {
  available: { label: 'Available', dot: 'bg-status-live', text: 'text-status-live' },
  'on-call': { label: 'On Call', dot: 'bg-status-live', text: 'text-status-live' },
  'wrap-up': { label: 'Wrap Up', dot: 'bg-status-hold', text: 'text-status-hold' },
  unavailable: { label: 'Unavailable', dot: 'bg-status-silence', text: 'text-status-silence' },
  'not-logged-in': { label: 'Not Logged In', dot: 'bg-ash', text: 'text-ash' },
}

const COMBINED_STATUS_CONFIG: Record<CallStatus | MemberStatus, { label: string; dot: string; text: string }> = {
  ...STATUS_CONFIG,
  ...MEMBER_STATUS_CONFIG,
}

type BadgeSize = 'default' | 'carplay'

/**
 * `size="carplay"` swaps the type-caption-md (12px) default for
 * type-carplay-md (20px) — CarPlay never allows type below that minimum,
 * even for a small status pill. Every existing call site is unaffected
 * (size defaults to 'default', identical output to before this prop).
 */
function badgeTypeClass(size: BadgeSize) {
  return size === 'carplay' ? 'type-carplay-md' : 'type-caption-md'
}

/** `status-badge` component from DESIGN-checkup.md: transparent pill, colored text + leading dot. */
export function StatusBadge({ status, size = 'default' }: { status: CallStatus | MemberStatus; size?: BadgeSize }) {
  const config = COMBINED_STATUS_CONFIG[status]
  return (
    <span
      className={`${badgeTypeClass(size)} inline-flex shrink-0 items-center gap-xs whitespace-nowrap rounded-full px-sm py-[3px] ${config.text}`}
    >
      <span className={`size-2 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  )
}

/** Escalation-toned status badge for the "needs attention" flag, reusing the same shape. */
export function AttentionBadge({ size = 'default' }: { size?: BadgeSize }) {
  return (
    <span className={`${badgeTypeClass(size)} inline-flex items-center gap-xs rounded-full px-sm py-[3px] text-status-escalation`}>
      <span className="size-2 rounded-full bg-status-escalation" aria-hidden="true" />
      Needs Attention
    </span>
  )
}
