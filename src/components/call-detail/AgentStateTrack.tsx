import type { StateSegment } from '../../types/call-detail'

const STATE_COLOR: Record<StateSegment['state'], string> = {
  talking: 'bg-status-live',
  hold: 'bg-status-hold',
  silence: 'bg-status-silence',
}

/**
 * Replaces the old continuous sentiment gradient that used to run beneath
 * the waveform — that slot now shows the agent's actual state instead
 * (talking/hold/silence), reusing the same three status tokens already
 * defined for exactly this purpose in DESIGN-checkup.md. Sentiment moved
 * to its own checkpoint-based track above the waveform (SentimentStoryTrack).
 */
export function AgentStateTrack({
  segments,
  durationSeconds,
}: {
  segments: StateSegment[]
  durationSeconds: number
}) {
  return (
    <div className="flex h-1 w-full overflow-hidden rounded-full">
      {segments.map((segment, index) => (
        <div
          key={index}
          className={STATE_COLOR[segment.state]}
          style={{ width: `${((segment.endSeconds - segment.startSeconds) / durationSeconds) * 100}%` }}
        />
      ))}
    </div>
  )
}
