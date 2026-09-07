import { BackButton } from '../ui/BackButton'
import { QuotaProgress } from '../ui/QuotaProgress'
import { formatDuration } from '../../lib/format'
import type { QaQuota } from '../../types/call-detail'

export function CallDetailHeader({
  agentName,
  customerName,
  durationSeconds,
  qaQuota,
  onBack,
}: {
  agentName: string
  customerName: string
  durationSeconds: number
  qaQuota: QaQuota
  onBack: () => void
}) {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <BackButton onBack={onBack} label="Back to feed" />
        <div className="flex min-w-0 flex-1 flex-col gap-xxs">
          <span className="type-heading-md truncate text-ink">{agentName}</span>
          <span className="type-body-sm truncate text-mute">{customerName}</span>
        </div>
        <span className="type-body-sm shrink-0 text-mute">{formatDuration(durationSeconds)}</span>
      </div>

      <QuotaProgress
        label="QA Quota"
        completed={qaQuota.completed}
        total={qaQuota.total}
        suffix="weekly reviews complete"
      />
    </div>
  )
}
