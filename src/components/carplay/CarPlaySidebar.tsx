export type SidebarView = 'calls' | 'escalations'

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5 21.5 20h-19L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 10v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17.3" r="1" fill="currentColor" />
    </svg>
  )
}

/**
 * `carplay-sidebar` from DESIGN-checkup.md: a narrow icon rail (88px),
 * icon-only — no text labels. This is deliberate, not an omission: at
 * carplay-md (20px) minimum, labels like "Escalations" won't fit an
 * 88px-wide rail without wrapping, and the doc describes this as an icon
 * rail, in contrast to bottom-tab-bar's icon+label pattern. Accessible
 * names live in aria-label instead of visible text.
 */
export function CarPlaySidebar({
  active,
  onSelect,
}: {
  active: SidebarView
  onSelect: (view: SidebarView) => void
}) {
  return (
    <nav className="flex h-full w-[88px] shrink-0 flex-col items-center gap-lg bg-surface-sunken py-xl">
      <button
        type="button"
        onClick={() => onSelect('calls')}
        aria-label="Live Calls"
        aria-pressed={active === 'calls'}
        className={`flex size-16 items-center justify-center rounded-lg transition-colors ${
          active === 'calls' ? 'text-primary' : 'text-mute'
        }`}
      >
        <PhoneIcon />
      </button>

      <button
        type="button"
        onClick={() => onSelect('escalations')}
        aria-label="Escalations"
        aria-pressed={active === 'escalations'}
        className={`flex size-16 items-center justify-center rounded-lg transition-colors ${
          active === 'escalations' ? 'text-primary' : 'text-mute'
        }`}
      >
        <WarningIcon />
      </button>
    </nav>
  )
}
