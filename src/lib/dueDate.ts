export function formatDueLabel(dueDateIso: string | null): { text: string; overdue: boolean } | null {
  if (!dueDateIso) return null

  const due = new Date(dueDateIso)
  const today = new Date()
  due.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { text: `Overdue by ${Math.abs(diffDays)}d`, overdue: true }
  }
  if (diffDays === 0) return { text: 'Due today', overdue: false }
  if (diffDays === 1) return { text: 'Due tomorrow', overdue: false }
  return { text: `Due in ${diffDays}d`, overdue: false }
}
