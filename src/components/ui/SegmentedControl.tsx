/**
 * Shared pill-shaped segmented control (QA Scoring's Pass/Fail, Director's
 * PriorityPicker) — same container/button shape, only the option set and
 * active-state color differ per use.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; activeClassName: string }[]
  value: T | null
  onChange: (value: T) => void
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-full bg-surface-elevated p-[3px]">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`type-button-sm flex h-8 items-center justify-center rounded-full px-lg transition-colors ${
            value === option.value ? option.activeClassName : 'text-mute'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
