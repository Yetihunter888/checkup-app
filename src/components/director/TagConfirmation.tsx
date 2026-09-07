export function TagConfirmation({ supervisorName, onDone }: { supervisorName: string; onDone: () => void }) {
  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center">
      <div className="absolute inset-0 bg-canvas-dark/70" onClick={onDone} />

      <div className="shadow-modal relative z-10 flex w-full max-w-[390px] flex-col items-center gap-lg rounded-t-xl bg-surface-elevated p-xl text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-pale text-primary">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M1 8l6 6L19 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <div className="flex flex-col gap-xxs">
          <span className="type-heading-md text-ink">Tag Sent</span>
          <span className="type-body-md text-mute">
            {supervisorName} will see this on their task dashboard.
          </span>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="type-button-md flex h-12 w-full items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-dark"
        >
          Done
        </button>
      </div>
    </div>
  )
}
