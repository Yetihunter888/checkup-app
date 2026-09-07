// Deterministic pseudo-waveform silhouette (no real audio data available).
// Combines a few sine waves so it reads as organic rather than uniform,
// and is stable across renders since it's seeded by bar index only.
export function generateBarHeights(count: number): number[] {
  const heights: number[] = []
  for (let i = 0; i < count; i++) {
    const t = i / count
    const wave =
      Math.sin(t * Math.PI * 9) * 0.35 +
      Math.sin(t * Math.PI * 21 + 1.3) * 0.2 +
      Math.sin(t * Math.PI * 5 + 0.6) * 0.25
    const height = 0.32 + wave * 0.5
    heights.push(Math.min(1, Math.max(0.12, height)))
  }
  return heights
}
