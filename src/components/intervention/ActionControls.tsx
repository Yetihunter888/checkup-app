import type { InterventionMode, Platform } from '../../types/intervention'

/**
 * Risk scales with severity through both size and fill weight, not just
 * color: Whisper is an outline pill (low friction, one tap), Barge is
 * filled amber (one tap, but visually heavier), Takeover is the largest,
 * filled status-escalation red, and set apart with extra space below the
 * other two — it never activates on its own tap, only opens the
 * confirmation panel (see LiveInterventionScreen).
 */
export function ActionControls({
  mode,
  platform,
  onWhisper,
  onBarge,
  onTakeoverTap,
  onEndTakeover,
}: {
  mode: InterventionMode
  platform: Platform
  onWhisper: () => void
  onBarge: () => void
  onTakeoverTap: () => void
  onEndTakeover: () => void
}) {
  const isCarPlay = platform === 'carplay'
  const controlHeight = isCarPlay ? 'h-16' : 'h-12'
  const typeClass = isCarPlay ? 'type-carplay-md' : 'type-button-md'

  if (mode === 'takeover-active') {
    return (
      <button
        type="button"
        onClick={onEndTakeover}
        className={`${typeClass} flex ${controlHeight} w-full items-center justify-center rounded-full border-[1.5px] border-status-escalation text-status-escalation transition-colors hover:bg-status-escalation/10`}
      >
        Return Control to Agent
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex gap-sm">
        <button
          type="button"
          onClick={onWhisper}
          aria-pressed={mode === 'whisper'}
          className={`${typeClass} flex ${controlHeight} flex-1 items-center justify-center rounded-full border-[1.5px] transition-colors ${
            mode === 'whisper'
              ? 'border-primary bg-primary-pale text-primary'
              : 'border-primary text-primary hover:bg-primary-pale'
          }`}
        >
          Whisper
        </button>

        {isCarPlay ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={`${typeClass} flex ${controlHeight} flex-1 cursor-not-allowed items-center justify-center rounded-full bg-surface-elevated text-ash`}
          >
            Barge
          </button>
        ) : (
          <button
            type="button"
            onClick={onBarge}
            aria-pressed={mode === 'barge'}
            className={`${typeClass} flex ${controlHeight} flex-1 items-center justify-center rounded-full transition-colors ${
              mode === 'barge' ? 'bg-status-hold text-canvas-dark' : 'bg-status-hold/80 text-canvas-dark hover:bg-status-hold'
            }`}
          >
            Barge
          </button>
        )}
      </div>

      {isCarPlay ? (
        <div className="flex flex-col gap-xs">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={`${typeClass} flex h-16 w-full cursor-not-allowed items-center justify-center rounded-full bg-surface-elevated text-ash`}
          >
            Takeover
          </button>
          <p className="type-carplay-md text-center text-mute">
            Barge &amp; Takeover aren&rsquo;t available while driving
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={onTakeoverTap}
          className="type-button-md flex h-14 w-full items-center justify-center rounded-full bg-status-escalation text-on-primary transition-colors hover:bg-status-escalation/90"
        >
          Takeover
        </button>
      )}
    </div>
  )
}
