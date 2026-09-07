export function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="type-heading-md text-ink">{title}</span>
      {count > 0 && <span className="type-caption-sm text-mute">{count}</span>}
    </div>
  )
}
