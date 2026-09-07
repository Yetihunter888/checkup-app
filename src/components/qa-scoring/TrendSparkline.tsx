import type { TrendPoint } from '../../types/qa-scoring'

const WIDTH = 280
const HEIGHT = 64
const PAD = 8

function toXY(index: number, count: number, score: number) {
  const x = PAD + (index / (count - 1)) * (WIDTH - PAD * 2)
  const y = HEIGHT - PAD - (score / 100) * (HEIGHT - PAD * 2)
  return [x, y] as const
}

/** Compares this in-progress score against the agent's last 5 — the current point is live and dashed-in, the rest are settled history. */
export function TrendSparkline({ history, currentScore }: { history: TrendPoint[]; currentScore: number }) {
  const points = [...history, { label: 'Now', score: currentScore }]
  const coords = points.map((point, index) => toXY(index, points.length, point.score))

  const historyPath = coords
    .slice(0, history.length)
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
    .join(' ')

  const liveSegment = `M${coords[history.length - 1][0]},${coords[history.length - 1][1]} L${coords[history.length][0]},${coords[history.length][1]}`

  return (
    <div className="flex flex-col gap-xs rounded-lg bg-surface p-lg">
      <div className="flex items-center justify-between">
        <span className="type-caption-md text-mute">Last 5 Scores</span>
        <span className="type-caption-sm text-mute">vs. this call</span>
      </div>
      <svg width="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="overflow-visible">
        <path d={historyPath} fill="none" className="stroke-stone" strokeWidth="2" />
        <path d={liveSegment} fill="none" className="stroke-primary" strokeWidth="2" strokeDasharray="4 3" />
        {coords.slice(0, history.length).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" className="fill-stone" />
        ))}
        <circle cx={coords[history.length][0]} cy={coords[history.length][1]} r="4.5" className="fill-primary" />
      </svg>
    </div>
  )
}
