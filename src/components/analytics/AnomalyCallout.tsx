import { CardAccentBar } from '../ui/CardAccentBar'
import { AttentionBadge } from '../ui/StatusBadge'

export function AnomalyCallout({ headline, detail }: { headline: string; detail: string }) {
  return (
    <div className="flex w-full">
      <CardAccentBar colorClassName="bg-status-escalation" />
      <div className="flex flex-1 flex-col gap-xs rounded-r-lg bg-status-escalation/10 p-lg">
        <AttentionBadge />
        <span className="type-body-strong text-ink">{headline}</span>
        <p className="type-body-sm text-body">{detail}</p>
      </div>
    </div>
  )
}
