import { SegmentedControl } from '../ui/SegmentedControl'
import type { TagPriority } from '../../types/director'

/** Optional — reuses the same severity vocabulary as the rest of the app (neutral/amber/red) rather than a new priority-specific hue. */
export function PriorityPicker({
  value,
  onChange,
}: {
  value: TagPriority | null
  onChange: (value: TagPriority | null) => void
}) {
  return (
    <SegmentedControl
      value={value}
      onChange={(next) => onChange(value === next ? null : next)}
      options={[
        { value: 'low', label: 'Low', activeClassName: 'bg-stone text-on-primary' },
        { value: 'medium', label: 'Medium', activeClassName: 'bg-status-hold text-canvas-dark' },
        { value: 'high', label: 'High', activeClassName: 'bg-status-escalation text-on-primary' },
      ]}
    />
  )
}
