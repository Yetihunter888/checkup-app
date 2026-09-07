/**
 * Tapping the score itself accepts an AI value as-is; tapping +/- overrides
 * it. Both count as taking ownership of an AI-drafted category, per
 * DESIGN-checkup.md's accept-or-override rule.
 */
export function NumericControl({
  value,
  onAccept,
  onChange,
}: {
  value: number | null
  onAccept: () => void
  onChange: (value: number) => void
}) {
  const current = value ?? 0

  function step(delta: number) {
    onChange(Math.min(10, Math.max(0, current + delta)))
  }

  return (
    <div className="inline-flex items-center gap-sm rounded-full bg-surface-elevated p-xxs">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Decrease score"
        className="flex size-8 items-center justify-center rounded-full text-mute transition-colors hover:text-ink"
      >
        −
      </button>
      <button
        type="button"
        onClick={onAccept}
        className="type-button-md min-w-10 text-center text-ink"
      >
        {value === null ? '—' : value}
        <span className="type-caption-sm text-mute">/10</span>
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Increase score"
        className="flex size-8 items-center justify-center rounded-full text-mute transition-colors hover:text-ink"
      >
        +
      </button>
    </div>
  )
}
