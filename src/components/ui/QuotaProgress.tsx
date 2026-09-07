export function QuotaProgress({
  label,
  completed,
  total,
  suffix = 'complete',
}: {
  label: string
  completed: number
  total: number
  suffix?: string
}) {
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="flex flex-col gap-xs">
      <div className="flex items-center justify-between">
        <span className="type-caption-md text-mute">{label}</span>
        <span className="type-caption-sm text-mute">
          {completed} of {total} {suffix}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
