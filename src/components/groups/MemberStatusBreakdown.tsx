import type { GroupMember, MemberStatus } from '../../types/groups'

function AvailableIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="5" r="5" />
    </svg>
  )
}

function OnCallIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 1.3h1.6l.7 2-1 .8a5.6 5.6 0 0 0 2.6 2.6l.8-1 2 .7V8a1 1 0 0 1-1 1C4.5 9 1 5.5 1 2.3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WrapUpIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
      <path d="M5 2.6V5l1.6 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function UnavailableIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
      <path d="M3 5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function NotLoggedInIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1.5v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M7.2 2.4a4 4 0 1 1-4.4 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

const STATUS_ORDER: MemberStatus[] = ['available', 'on-call', 'wrap-up', 'unavailable', 'not-logged-in']

const STATUS_CONFIG: Record<MemberStatus, { label: string; colorClass: string; Icon: () => React.JSX.Element }> = {
  available: { label: 'Available', colorClass: 'text-status-live', Icon: AvailableIcon },
  'on-call': { label: 'On Call', colorClass: 'text-status-live', Icon: OnCallIcon },
  'wrap-up': { label: 'Wrap Up', colorClass: 'text-status-hold', Icon: WrapUpIcon },
  unavailable: { label: 'Unavailable', colorClass: 'text-status-silence', Icon: UnavailableIcon },
  'not-logged-in': { label: 'Not Logged In', colorClass: 'text-ash', Icon: NotLoggedInIcon },
}

/**
 * Icon + count only, no text labels — a state with zero members is
 * dropped entirely rather than shown as "0", so a group with nobody in
 * Wrap Up simply doesn't mention Wrap Up. Reuses the existing status
 * color vocabulary (status-live/status-hold/status-silence/ash) rather
 * than inventing new colors; the icon shape is what actually distinguishes
 * Available from On Call, since both share the same green.
 */
export function MemberStatusBreakdown({ members }: { members: GroupMember[] }) {
  const counts = members.reduce<Partial<Record<MemberStatus, number>>>((acc, member) => {
    acc[member.status] = (acc[member.status] ?? 0) + 1
    return acc
  }, {})

  const populated = STATUS_ORDER.filter((status) => (counts[status] ?? 0) > 0)
  if (populated.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-sm">
      {populated.map((status) => {
        const config = STATUS_CONFIG[status]
        const count = counts[status] ?? 0
        return (
          <span
            key={status}
            className={`inline-flex items-center gap-xxs ${config.colorClass}`}
            title={`${config.label}: ${count}`}
          >
            <config.Icon />
            <span className="type-caption-sm">{count}</span>
          </span>
        )
      })}
    </div>
  )
}
