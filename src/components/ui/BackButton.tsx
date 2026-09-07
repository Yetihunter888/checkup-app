export function BackButton({ onBack, label = 'Back' }: { onBack: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-ink"
      aria-label={label}
    >
      <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
        <path d="M8 1L2 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
