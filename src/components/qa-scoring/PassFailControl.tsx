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
    <div className="inline-flex overflow-hidden rounded-full bg-surface-elevated p-[3px]">
      <button
        type="button"
        onClick={() => onChoose('pass')}
        className={`type-button-sm flex h-8 items-center justify-center rounded-full px-lg transition-colors ${
          value === 'pass' ? 'bg-primary text-on-primary' : 'text-mute'
        }`}
      >
        Pass
      </button>
      <button
        type="button"
        onClick={() => onChoose('fail')}
        className={`type-button-sm flex h-8 items-center justify-center rounded-full px-lg transition-colors ${
          value === 'fail' ? 'bg-status-escalation text-on-primary' : 'text-mute'
        }`}
      >
        Fail
      </button>
    </div>
  )
}
