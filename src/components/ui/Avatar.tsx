function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ name }: { name: string }) {
  return (
    <div
      className="type-body-sm flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-ink"
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
