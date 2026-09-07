export interface KpiHistoryPoint {
  label: string
  value: number
}

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (Math.imul(hash, 31) + input.charCodeAt(i)) | 0
  }
  return hash
}

function seededRandom(seed: number) {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

/** Deterministic, reproducible "trend" for a KPI — same seed always produces the same shape, so the UI doesn't flicker between renders. The final point always equals the real current value. */
export function generateHistory(seedKey: string, currentValue: number, volatility: number, labels: string[]): KpiHistoryPoint[] {
  const rand = seededRandom(Math.abs(hashString(seedKey)) || 1)
  const points: KpiHistoryPoint[] = []

  for (let i = 0; i < labels.length; i++) {
    const t = i / (labels.length - 1)
    const trend = currentValue - volatility * (1 - t)
    const noise = (rand() - 0.5) * volatility * 0.7
    points.push({ label: labels[i], value: Math.round((trend + noise) * 100) / 100 })
  }

  points[points.length - 1] = { label: labels[labels.length - 1], value: currentValue }
  return points
}

/** Deterministic ±8% adjustment so every filter combination visibly (and reproducibly) changes the numbers. */
export function filterVariation(seedKey: string): number {
  const hash = Math.abs(hashString(seedKey))
  return ((hash % 1000) / 1000) * 0.16 - 0.08
}
