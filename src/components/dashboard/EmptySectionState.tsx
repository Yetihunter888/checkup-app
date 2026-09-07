export function EmptySectionState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-sm rounded-lg bg-surface-sunken px-lg py-md">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-pale text-primary">
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4.5l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="type-body-sm text-mute">{message}</span>
    </div>
  )
}
