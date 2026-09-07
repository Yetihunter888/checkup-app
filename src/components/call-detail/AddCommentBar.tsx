import { useState } from 'react'

function MicIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <rect x="5" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 9a6 6 0 0 0 12 0M8 15v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8h13M8 1l6 7-6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** `text-input` + `button-icon-round` from DESIGN-checkup.md, plus a voice-memo entry point. */
export function AddCommentBar({
  onSubmit,
  onVoiceMemo,
}: {
  onSubmit: (text: string) => void
  onVoiceMemo: () => void
}) {
  const [text, setText] = useState('')
  const canSend = text.trim().length > 0

  function handleSubmit() {
    if (!canSend) return
    onSubmit(text.trim())
    setText('')
  }

  return (
    <div className="flex items-center gap-sm rounded-lg bg-surface p-sm">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
        placeholder="Add a comment…"
        className="type-body-md h-11 flex-1 rounded-md bg-surface-elevated px-md text-ink placeholder-mute outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="button"
        onClick={onVoiceMemo}
        aria-label="Add voice memo"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-ink"
      >
        <MicIcon />
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSend}
        aria-label="Send comment"
        className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors ${
          canSend ? 'bg-primary text-on-primary' : 'bg-surface-elevated text-ash'
        }`}
      >
        <SendIcon />
      </button>
    </div>
  )
}
