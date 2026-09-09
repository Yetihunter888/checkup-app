export function formatDuration(totalSeconds: number) {
  // Floored here, not just at call sites — a live-ticking clock (0.25s
  // steps) can hand this a fractional value, and "0:3.5" is a real bug
  // that surfaced from exactly that, not a hypothetical one.
  const whole = Math.floor(totalSeconds)
  const minutes = Math.floor(whole / 60)
  const seconds = whole % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/** For "when was this note added" — distinct from formatDuration, which formats a position within the call. */
export function formatNoteDate(isoDate: string) {
  const date = new Date(isoDate)
  const datePart = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const timePart = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${datePart}, ${timePart}`
}

/** For "employed since" — a hire date has no time component, so it gets its own formatter rather than reusing formatNoteDate. */
export function formatMonthYear(isoDate: string) {
  return new Date(isoDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}
