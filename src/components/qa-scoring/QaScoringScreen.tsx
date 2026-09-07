import { useState } from 'react'
import { ScoreActions } from './ScoreActions'
import { ScoreCategoryRow } from './ScoreCategoryRow'
import { ScoreTotal } from './ScoreTotal'
import { TrendSparkline } from './TrendSparkline'
import { BackButton } from '../ui/BackButton'
import { QuotaProgress } from '../ui/QuotaProgress'
import { BottomTabBar } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { mockQaScorecard } from '../../data/mockQaScorecard'
import { weightedTotal } from '../../lib/scoring'
import type { ScoreCategory } from '../../types/qa-scoring'

export function QaScoringScreen({ onBack }: { onBack: () => void }) {
  const scorecard = mockQaScorecard
  const [categories, setCategories] = useState<ScoreCategory[]>(scorecard.categories)

  function updateCategory(next: ScoreCategory) {
    setCategories((current) => current.map((category) => (category.id === next.id ? next : category)))
  }

  const total = weightedTotal(categories)

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <TopHeader title="Check Up" />

      <main className="flex flex-1 flex-col gap-lg overflow-y-auto px-lg py-lg">
        <div className="flex items-center gap-md">
          <BackButton onBack={onBack} label="Back to call" />
          <div className="flex min-w-0 flex-1 flex-col gap-xxs">
            <span className="type-heading-md truncate text-ink">QA Scorecard</span>
            <span className="type-body-sm truncate text-mute">{scorecard.agentName}</span>
          </div>
        </div>

        <QuotaProgress
          label="Weekly QA Quota"
          completed={scorecard.qaQuota.completed}
          total={scorecard.qaQuota.total}
        />

        <ScoreTotal total={total} />

        <TrendSparkline history={scorecard.trend} currentScore={total} />

        <div className="flex flex-col gap-sm">
          <span className="type-caption-md text-mute">Categories</span>
          {categories.map((category) => (
            <ScoreCategoryRow key={category.id} category={category} onChange={updateCategory} />
          ))}
        </div>
      </main>

      <div className="shrink-0 px-lg pb-sm">
        <ScoreActions
          onSaveDraft={() => console.log('save draft', categories)}
          onSubmit={() => console.log('submit', categories, 'total:', total)}
        />
      </div>

      <BottomTabBar />
    </div>
  )
}
