import { formatDueLabel } from '../../lib/dueDate'

export function DueLabel({ dueDate }: { dueDate: string | null }) {
  const due = formatDueLabel(dueDate)
  if (!due) return null

  return (
    <span className={`type-caption-sm shrink-0 ${due.overdue ? 'text-status-escalation' : 'text-mute'}`}>
      {due.text}
    </span>
  )
}
