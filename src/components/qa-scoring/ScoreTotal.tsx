export function ScoreTotal({ total }: { total: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface p-lg">
      <span className="type-caption-md text-mute">Total Score</span>
      <span className="type-display-lg text-ink">
        {total}
        <span className="type-heading-md text-mute">/100</span>
      </span>
    </div>
  )
}
