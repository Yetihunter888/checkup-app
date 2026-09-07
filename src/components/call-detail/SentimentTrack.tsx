import type { SentimentSegment } from '../../types/call-detail'

const SENTIMENT_COLOR: Record<SentimentSegment['sentiment'], string> = {
  positive: 'bg-sentiment-positive',
  neutral: 'bg-sentiment-neutral',
  negative: 'bg-sentiment-negative',
}

/** "A thin sentiment gradient track directly beneath the waveform" per DESIGN-checkup.md. */
export function SentimentTrack({
  segments,
  durationSeconds,
}: {
  segments: SentimentSegment[]
  durationSeconds: number
}) {
  return (
    <div className="flex h-1 w-full overflow-hidden rounded-full">
      {segments.map((segment, index) => (
        <div
          key={index}
          className={SENTIMENT_COLOR[segment.sentiment]}
          style={{ width: `${((segment.endSeconds - segment.startSeconds) / durationSeconds) * 100}%` }}
        />
      ))}
    </div>
  )
}
