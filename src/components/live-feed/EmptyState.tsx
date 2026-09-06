export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-sm rounded-lg bg-surface-sunken px-xl py-xxl text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-surface-elevated text-mute">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <p className="type-body-md text-mute">{message}</p>
    </div>
  )
}
