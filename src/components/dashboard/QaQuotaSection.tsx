import { EmptySectionState } from './EmptySectionState'
import { SectionHeader } from './SectionHeader'
import { QuotaProgress } from '../ui/QuotaProgress'
import { mockQaScorecard } from '../../data/mockQaScorecard'

/** Reuses the same quota figures as QaScoringScreen — one number across the app, not a duplicated one. */
export function QaQuotaSection() {
  const { completed, total } = mockQaScorecard.qaQuota
  const remaining = total - completed

  return (
    <div className="flex flex-col gap-sm">
      <SectionHeader title="QA Quota Status" count={0} />
      <div className="flex flex-col gap-md rounded-lg bg-surface p-lg">
        <QuotaProgress label="Weekly QA Quota" completed={completed} total={total} />
        {remaining > 0 ? (
          <span className="type-body-sm text-mute">
            {remaining} more review{remaining === 1 ? '' : 's'} needed this week.
          </span>
        ) : (
          <EmptySectionState message="Weekly QA quota complete." />
        )}
      </div>
    </div>
  )
}
