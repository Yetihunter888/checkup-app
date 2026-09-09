import { useEffect, useState } from 'react'
import { ReviewOnlyBadge } from './ReviewOnlyBadge'
import { TagConfirmation } from './TagConfirmation'
import { TagSupervisorSheet } from './TagSupervisorSheet'
import { AgentStateTrack } from '../call-detail/AgentStateTrack'
import { CommentFeed } from '../call-detail/CommentFeed'
import { PlaybackControls } from '../call-detail/PlaybackControls'
import { SentimentStoryTrack } from '../call-detail/SentimentStoryTrack'
import { Waveform } from '../call-detail/Waveform'
import { BackButton } from '../ui/BackButton'
import { mockCallDetail } from '../../data/mockCallDetail'
import type { Comment } from '../../types/call-detail'

// NOTE: this file must never import from `components/intervention/` or
// reference Whisper/Barge/Takeover in any form — Directors reviewing a
// recording have no code path to live-call controls, not just a hidden
// one. See the tsc/build confirmation for how this was verified.

const SPEEDS = [1, 1.25, 1.5, 2]
const TICK_MS = 250

type SheetState = 'closed' | 'form' | 'confirmed'

export function DirectorCallReviewScreen({ onBack }: { onBack: () => void }) {
  const call = mockCallDetail
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [skipSilence, setSkipSilence] = useState(false)
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<SheetState>('closed')
  const [taggedSupervisor, setTaggedSupervisor] = useState('')
  // TEST-ONLY toggle, not a real product state: this screen is a recorded
  // call (see ReviewOnlyBadge) and a Director never has a live call to
  // review, per the persona rules already verified elsewhere in this app.
  // This exists solely to build and demonstrate Waveform's isLive capability
  // — flipping it also auto-starts playback so the growing timestamp is
  // visible without a second click.
  const [liveModeForTesting, setLiveModeForTesting] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentTime((time) => {
        let next = time + (TICK_MS / 1000) * speed

        if (skipSilence) {
          const activeSilence = call.silenceRanges.find(
            (range) => next >= range.startSeconds && next < range.endSeconds,
          )
          if (activeSilence) next = activeSilence.endSeconds
        }

        if (next >= call.durationSeconds) {
          setIsPlaying(false)
          return call.durationSeconds
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [isPlaying, speed, skipSilence, call.silenceRanges, call.durationSeconds])

  function seekTo(seconds: number) {
    setCurrentTime(Math.min(call.durationSeconds, Math.max(0, seconds)))
    setActiveCommentId(null)
  }

  function selectComment(comment: Comment) {
    setCurrentTime(comment.timestampSeconds)
    setActiveCommentId(comment.id)
    setIsPlaying(false)
  }

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <header className="flex h-14 shrink-0 items-center gap-md bg-surface px-lg">
        <BackButton onBack={onBack} label="Back" />
        <span className="type-heading-lg flex-1 text-center text-ink">Director Review</span>
        <span className="size-11" aria-hidden="true" />
      </header>

      <main className="flex flex-1 flex-col gap-lg overflow-y-auto px-lg py-lg">
        <div className="flex flex-col gap-xs">
          <ReviewOnlyBadge />
          <span className="type-heading-md text-ink">{call.agentName}</span>
          <span className="type-body-sm text-mute">{call.customerName}</span>
          <button
            type="button"
            onClick={() => {
              const next = !liveModeForTesting
              setLiveModeForTesting(next)
              if (next) setIsPlaying(true)
            }}
            className={`type-caption-sm w-fit shrink-0 rounded-full px-sm py-[3px] transition-colors ${
              liveModeForTesting ? 'bg-status-live/15 text-status-live' : 'bg-surface-elevated text-mute'
            }`}
            title="Test-only: simulates a live call to verify the growing timestamp"
          >
            {liveModeForTesting ? 'Simulating Live' : 'Simulate Live (test)'}
          </button>
        </div>

        <div className="flex flex-col gap-sm">
          <Waveform
            durationSeconds={call.durationSeconds}
            currentTimeSeconds={currentTime}
            comments={call.comments}
            silenceRanges={call.silenceRanges}
            activeCommentId={activeCommentId}
            hoveredCommentId={hoveredCommentId}
            isLive={liveModeForTesting}
            onSeek={seekTo}
            onSelectComment={(id) => {
              const comment = call.comments.find((c) => c.id === id)
              if (comment) selectComment(comment)
            }}
            onHoverComment={setHoveredCommentId}
          />
          <SentimentStoryTrack
            checkpoints={call.sentimentCheckpoints}
            durationSeconds={call.durationSeconds}
            onSeek={seekTo}
          />
          <AgentStateTrack segments={call.agentStateTrack} durationSeconds={call.durationSeconds} />
        </div>

        <PlaybackControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((playing) => !playing)}
          onSkip={(delta) => seekTo(currentTime + delta)}
          speed={speed}
          onCycleSpeed={() => setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length])}
          skipSilence={skipSilence}
          onToggleSkipSilence={() => setSkipSilence((v) => !v)}
        />

        <div className="flex flex-col gap-sm">
          <span className="type-caption-md text-mute">Transcript Notes</span>
          <CommentFeed
            comments={call.comments}
            activeCommentId={activeCommentId}
            hoveredCommentId={hoveredCommentId}
            onSelect={selectComment}
            onHoverComment={setHoveredCommentId}
          />
        </div>
      </main>

      <div className="shrink-0 px-lg pb-lg">
        <button
          type="button"
          onClick={() => setSheet('form')}
          className="type-button-md flex h-12 w-full items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-dark"
        >
          Tag a Supervisor
        </button>
      </div>

      {sheet === 'form' && (
        <TagSupervisorSheet
          agentName={call.agentName}
          agentId={call.agentId}
          callId={call.id}
          onCancel={() => setSheet('closed')}
          onSubmitted={(supervisorName) => {
            setTaggedSupervisor(supervisorName)
            setSheet('confirmed')
          }}
        />
      )}

      {sheet === 'confirmed' && (
        <TagConfirmation supervisorName={taggedSupervisor} onDone={() => setSheet('closed')} />
      )}
    </div>
  )
}
