import { NumericControl } from './NumericControl'
import { PassFailControl } from './PassFailControl'
import { NoteBadge } from '../ui/NoteBadge'
import type { PassFailValue, ScoreCategory } from '../../types/qa-scoring'

export function ScoreCategoryRow({
  category,
  onChange,
}: {
  category: ScoreCategory
  onChange: (next: ScoreCategory) => void
}) {
  function acceptOrOverride(value: ScoreCategory['value']) {
    onChange({ ...category, value, source: 'supervisor' })
  }

  return (
    <div className="flex flex-col gap-sm rounded-lg bg-surface p-lg">
      <div className="flex items-center justify-between gap-sm">
        <span className="type-card-title text-ink">{category.label}</span>
        <span className="type-caption-sm shrink-0 text-mute">{category.weight}%</span>
      </div>

      <div className="flex items-center justify-between gap-sm">
        {category.controlType === 'pass-fail' ? (
          <PassFailControl
            value={category.value as PassFailValue | null}
            onChoose={(value) => acceptOrOverride(value)}
          />
        ) : (
          <NumericControl
            value={category.value as number | null}
            onAccept={() => acceptOrOverride(category.value)}
            onChange={(value) => acceptOrOverride(value)}
          />
        )}
        <NoteBadge author={category.source} />
      </div>
    </div>
  )
}
