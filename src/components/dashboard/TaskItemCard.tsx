import type { ReactNode } from 'react'
import { CardAccentBar } from '../ui/CardAccentBar'

/**
 * Generic task row shared by every dashboard section — accent bar carries
 * urgency/priority color, the leading circle is the tap-to-complete
 * target. Tapping it removes the item from view immediately (the parent
 * section owns the completed-id set), rather than leaving a checked item
 * sitting in an already-reviewed list.
 */
export function TaskItemCard({
  title,
  subtitle,
  accentColorClassName,
  sourceBadge,
  priorityBadge,
  trailing,
  onComplete,
}: {
  title: string
  subtitle?: string
  accentColorClassName: string
  sourceBadge?: ReactNode
  priorityBadge?: ReactNode
  trailing?: ReactNode
  onComplete: () => void
}) {
  return (
    <div className="flex w-full">
      <CardAccentBar colorClassName={accentColorClassName} />
      <div className="flex flex-1 items-start gap-md rounded-r-lg bg-surface p-md">
        <button
          type="button"
          onClick={onComplete}
          aria-label={`Mark "${title}" complete`}
          className="mt-[2px] flex size-6 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-transparent transition-colors hover:border-primary hover:bg-primary-pale hover:text-primary"
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5l3.2 3.2L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <div className="flex items-start justify-between gap-sm">
            <span className="type-card-title truncate text-ink">{title}</span>
            {trailing}
          </div>
          {subtitle && <p className="type-body-sm text-mute">{subtitle}</p>}
          {(sourceBadge || priorityBadge) && (
            <div className="flex flex-wrap items-center gap-xs pt-xxs">
              {sourceBadge}
              {priorityBadge}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
