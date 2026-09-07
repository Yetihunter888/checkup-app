function SkipIcon({ direction }: { direction: 'back' | 'forward' }) {
  const flip = direction === 'back' ? 'scale-x-[-1]' : ''
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className={flip}>
      <path d="M2 4a1 1 0 0 1 1.53-.85l6 3.8a1 1 0 0 1 0 1.7l-6 3.8A1 1 0 0 1 2 11.6V4Z" />
      <path d="M10 4a1 1 0 0 1 1.53-.85l6 3.8a1 1 0 0 1 0 1.7l-6 3.8A1 1 0 0 1 10 11.6V4Z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 14 16" fill="currentColor">
      <path d="M0 0.8C0 0.13 0.73-0.28 1.3 0.07l12 7.2a0.75 0.75 0 0 1 0 1.28l-12 7.2C0.73 16.1 0 15.7 0 15V0.8Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 14 16" fill="currentColor">
      <rect x="1" y="0" width="4" height="16" rx="1.2" />
      <rect x="9" y="0" width="4" height="16" rx="1.2" />
    </svg>
  )
}

/**
 * `button-transport-primary` (the 56px white circle) flanked by smaller
 * ghost icon buttons for skip/rewind, per DESIGN-checkup.md — the
 * Spotify-influenced part of the system.
 */
export function PlaybackControls({
  isPlaying,
  onTogglePlay,
  onSkip,
  speed,
  onCycleSpeed,
  skipSilence,
  onToggleSkipSilence,
}: {
  isPlaying: boolean
  onTogglePlay: () => void
  onSkip: (deltaSeconds: number) => void
  speed: number
  onCycleSpeed: () => void
  skipSilence: boolean
  onToggleSkipSilence: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-lg">
      <div className="flex items-center gap-xl">
        <button
          type="button"
          onClick={() => onSkip(-15)}
          className="flex size-11 items-center justify-center text-mute transition-colors hover:text-ink"
          aria-label="Skip back 15 seconds"
        >
          <SkipIcon direction="back" />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          className="flex size-14 items-center justify-center rounded-full bg-on-dark text-canvas-dark"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          type="button"
          onClick={() => onSkip(15)}
          className="flex size-11 items-center justify-center text-mute transition-colors hover:text-ink"
          aria-label="Skip forward 15 seconds"
        >
          <SkipIcon direction="forward" />
        </button>
      </div>

      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={onCycleSpeed}
          className="type-button-sm flex h-9 items-center justify-center rounded-full bg-surface-elevated px-lg text-ink"
        >
          {speed}x
        </button>
        <button
          type="button"
          onClick={onToggleSkipSilence}
          aria-pressed={skipSilence}
          className={`type-button-sm flex h-9 items-center justify-center gap-xs rounded-full px-lg transition-colors ${
            skipSilence ? 'bg-primary text-on-primary' : 'bg-surface-elevated text-mute'
          }`}
        >
          Skip Silence
        </button>
      </div>
    </div>
  )
}
