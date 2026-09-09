import type { ReactNode } from 'react'

/** `pill-tab` / `pill-tab-active` from DESIGN-checkup.md — used for saved-view selection. */
export function SavedViewChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? 'type-button-sm shrink-0 rounded-full bg-primary px-lg py-sm text-on-primary'
          : 'type-button-sm shrink-0 rounded-full px-lg py-sm text-mute transition-colors hover:text-ink'
      }
    >
      {children}
    </button>
  )
}

/** `chip-filter` from DESIGN-checkup.md, without the value/chevron — a plain static label pill for tags like skills or certifications. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="type-body-sm inline-flex shrink-0 items-center rounded-full bg-surface-elevated px-md py-[6px] text-ink">
      {children}
    </span>
  )
}

/** `chip-filter` from DESIGN-checkup.md — static filter affordance (team / group / metric). */
export function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      className="type-body-sm inline-flex shrink-0 items-center gap-xs rounded-full bg-surface-elevated px-md py-[6px] text-ink transition-colors hover:bg-hairline"
    >
      <span className="text-mute">{label}</span>
      <span>{value}</span>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        aria-hidden="true"
        className="text-mute"
      >
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
