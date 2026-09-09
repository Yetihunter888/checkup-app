import { SegmentedControl } from '../ui/SegmentedControl'
import type { PassFailValue } from '../../types/qa-scoring'

/**
 * Tapping either option both sets the value and marks the category
 * supervisor-owned — accepting the AI's existing choice as-is still
 * counts as a conversion, matching DESIGN-checkup.md's rule that
 * accepting or editing an AI-suggested item converts it.
 */
export function PassFailControl({
  value,
  onChoose,
}: {
  value: PassFailValue | null
  onChoose: (value: PassFailValue) => void
}) {
  return (
    <SegmentedControl
      value={value}
      onChange={onChoose}
      options={[
        { value: 'pass', label: 'Pass', activeClassName: 'bg-primary text-on-primary' },
        { value: 'fail', label: 'Fail', activeClassName: 'bg-status-escalation text-on-primary' },
      ]}
    />
  )
}
