import type { FilterOption } from '../../types/analytics'

/**
 * Same visual language as Chip.tsx's FilterChip (pill, surface-elevated,
 * label + chevron), but a real native <select> underneath — FilterChip
 * itself has no interaction, and this filter bar has to actually change
 * what's on screen.
 */
export function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}) {
  return (
    <div className="relative inline-flex shrink-0 items-center gap-xs rounded-full bg-surface-elevated py-[6px] pl-md pr-lg">
      <span className="type-body-sm text-mute">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="type-body-sm appearance-none bg-transparent text-ink outline-none"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-surface-elevated text-ink">
            {option.label}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 text-mute"
      >
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
