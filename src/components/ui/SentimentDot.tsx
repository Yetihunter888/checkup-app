import type { Sentiment } from '../../types/live-feed'

const SENTIMENT_CONFIG: Record<Sentiment, { label: string; className: string }> = {
  positive: { label: 'Positive sentiment', className: 'bg-sentiment-positive' },
  neutral: { label: 'Neutral sentiment', className: 'bg-sentiment-neutral' },
  negative: { label: 'Negative sentiment', className: 'bg-sentiment-negative' },
}

export function SentimentDot({ sentiment }: { sentiment: Sentiment }) {
  const config = SENTIMENT_CONFIG[sentiment]
  return (
    <span
      className={`inline-block size-2.5 rounded-full ${config.className}`}
      role="img"
      aria-label={config.label}
      title={config.label}
    />
  )
}
