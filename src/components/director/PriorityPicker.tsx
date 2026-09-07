import type { TagPriority } from '../../types/director'

const OPTIONS: { value: TagPriority; label: string; active: string }[] = [
  { value: 'low', label: 'Low', active: 'bg-stone text-on-primary' },
  { value: 'medium', label: 'Medium', active: 'bg-status-hold text-canvas-dark' },
  { value: 'high', label: 'High', active: 'bg-status-escalation text-on-primary' },
]

/** Optional — reuses the same severity vocabulary as the rest of the app (neutral/amber/red) rather than a new priority-specific hue. */
export function PriorityPicker({
  value,
  onChange,
}: {
  value: TagPriority | null
  onChange: (value: TagPriority | null) => void
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-full bg-surface-elevated p-[3px]">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(value === option.value ? null : option.value)}
          className={`type-button-sm flex h-8 items-center justify-center rounded-full px-lg transition-colors ${
            value === option.value ? option.active : 'text-mute'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
