/**
 * Screen-specific, not a general design-system badge: signals "this is a
 * recording, there is nothing live here to control" at a glance, using
 * the neutral status-silence tone rather than status-live green — the
 * opposite of what a live-monitoring screen would show.
 */
export function ReviewOnlyBadge() {
  return (
    <span className="type-caption-md inline-flex w-fit shrink-0 items-center gap-xs rounded-full bg-surface-elevated px-sm py-[3px] text-status-silence">
      <span className="size-2 rounded-full bg-status-silence" aria-hidden="true" />
      Recorded Call — Review Only
    </span>
  )
}
