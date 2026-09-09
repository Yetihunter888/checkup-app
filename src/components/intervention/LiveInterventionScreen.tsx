import { useEffect, useState } from 'react'
import { ActionControls } from './ActionControls'
import { LiveBanner } from './LiveBanner'
import { TakeoverConfirmSheet } from './TakeoverConfirmSheet'
import { BackButton } from '../ui/BackButton'
import { StatusBadge } from '../ui/StatusBadge'
import { addEscalation } from '../../data/escalationsStore'
import { currentSentiment, issueSummary, lastThreeNotes, liveCall } from '../../data/mockIntervention'
import { formatDuration } from '../../lib/format'
import type { InterventionMode, Platform } from '../../types/intervention'

/**
 * CarPlay defaults on load since that's the variant under review right
 * now — the toggle below switches back to the normal mobile rendering.
 */
export function LiveInterventionScreen({ onBack }: { onBack: () => void }) {
  const [platform, setPlatform] = useState<Platform>('carplay')
  const [mode, setMode] = useState<InterventionMode>('listen')
  const [durationSeconds, setDurationSeconds] = useState(187)

  useEffect(() => {
    const interval = setInterval(() => setDurationSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const isCarPlay = platform === 'carplay'
  const bannerMode = mode === 'takeover-confirm' ? 'listen' : mode

  function confirmTakeover() {
    addEscalation({
      id: `esc-${Date.now()}`,
      agentName: liveCall.agentName,
      agentId: liveCall.agentId,
      reason: `Takeover completed after ${formatDuration(durationSeconds)} on the call — ${issueSummary}`,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
    })
    setMode('takeover-active')
  }

  return (
    <div className={`flex h-dvh flex-col ${isCarPlay ? 'bg-surface-sunken' : 'bg-canvas-dark'}`}>
      <div className="flex shrink-0 items-center justify-center gap-xs bg-surface p-xs">
        <button
          type="button"
          onClick={() => setPlatform('mobile')}
          className={`type-caption-sm rounded-full px-md py-xs ${
            platform === 'mobile' ? 'bg-surface-elevated text-ink' : 'text-mute'
          }`}
        >
          Mobile
        </button>
        <button
          type="button"
          onClick={() => setPlatform('carplay')}
          className={`type-caption-sm rounded-full px-md py-xs ${
            platform === 'carplay' ? 'bg-surface-elevated text-ink' : 'text-mute'
          }`}
        >
          CarPlay
        </button>
      </div>

      <header
        className={`flex shrink-0 items-center gap-md ${
          isCarPlay ? 'bg-surface-sunken px-xl py-lg' : 'h-14 bg-primary px-lg'
        }`}
      >
        {isCarPlay ? (
          <>
            <div className="flex min-w-0 flex-1 flex-col gap-xxs">
              <span className="type-carplay-lg truncate text-ink">{liveCall.agentName}</span>
              <span className="type-carplay-md text-mute">{liveCall.team}</span>
            </div>
            <div className="flex flex-col items-end gap-xxs">
              <StatusBadge status="talking" />
              <span className="type-carplay-md text-mute">{formatDuration(durationSeconds)}</span>
            </div>
          </>
        ) : (
          <>
            <BackButton onBack={onBack} label="Back to feed" />
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <span className="type-heading-lg text-on-primary">{liveCall.agentName}</span>
            </div>
            <span className="type-body-sm text-on-dark-mute">{formatDuration(durationSeconds)}</span>
          </>
        )}
      </header>

      <main className={`flex flex-1 flex-col justify-between gap-xl overflow-y-auto ${isCarPlay ? 'p-xl' : 'p-lg'}`}>
        <LiveBanner mode={bannerMode} />

        <ActionControls
          mode={mode}
          platform={platform}
          onWhisper={() => setMode((m) => (m === 'whisper' ? 'listen' : 'whisper'))}
          onBarge={() => setMode((m) => (m === 'barge' ? 'listen' : 'barge'))}
          onTakeoverTap={() => setMode('takeover-confirm')}
          onEndTakeover={() => setMode('listen')}
        />
      </main>

      {mode === 'takeover-confirm' && (
        <TakeoverConfirmSheet
          sentiment={currentSentiment}
          issueSummary={issueSummary}
          notes={lastThreeNotes}
          onCancel={() => setMode('listen')}
          onConfirm={confirmTakeover}
        />
      )}
    </div>
  )
}
