import type { SentimentCheckpoint, SentimentMood } from '../../types/call-detail'

function FaceIcon({ mood }: { mood: SentimentMood }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5.5" cy="6.2" r="0.9" fill="currentColor" />
      <circle cx="10.5" cy="6.2" r="0.9" fill="currentColor" />
      {mood === 'positive' && (
        <path d="M5 10q3 2.5 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      )}
      {mood === 'shifting' && <path d="M5 10.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
      {mood === 'negative' && (
        <path d="M5 11q3-2.5 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      )}
    </svg>
  )
}

const MOOD_COLOR: Record<SentimentMood, string> = {
  positive: 'text-sentiment-positive',
  shifting: 'text-sentiment-shifting',
  negative: 'text-sentiment-negative',
}

const MOOD_LABEL: Record<SentimentMood, string> = {
  positive: 'Positive',
  shifting: 'Shifting',
  negative: 'Negative',
}

/**
 * The call's sentiment story as a scannable row of small face icons,
 * sitting directly above the waveform (not the old gradient bar that used
 * to run beneath it — see AgentStateTrack for what replaced that slot).
 * Clicking a face seeks, same as a waveform flag marker.
 */
export function SentimentStoryTrack({
  checkpoints,
  durationSeconds,
  onSeek,
}: {
  checkpoints: SentimentCheckpoint[]
  durationSeconds: number
  onSeek: (seconds: number) => void
}) {
  return (
    <div className="relative h-5 w-full">
      {checkpoints.map((checkpoint) => (
        <button
          key={checkpoint.timestampSeconds}
          type="button"
          onClick={() => onSeek(checkpoint.timestampSeconds)}
          className={`absolute top-0 -translate-x-1/2 ${MOOD_COLOR[checkpoint.mood]} transition-transform hover:scale-125`}
          style={{ left: `${(checkpoint.timestampSeconds / durationSeconds) * 100}%` }}
          aria-label={`${MOOD_LABEL[checkpoint.mood]} sentiment at ${checkpoint.timestampSeconds}s`}
        >
          <FaceIcon mood={checkpoint.mood} />
        </button>
      ))}
    </div>
  )
}
