import { useState } from 'react'
import { PriorityPicker } from './PriorityPicker'
import { SupervisorPicker } from './SupervisorPicker'
import { BottomSheet } from '../ui/BottomSheet'
import { addSupervisorTag } from '../../data/supervisorTagsStore'
import { supervisors } from '../../data/mockSupervisors'
import type { Supervisor, TagPriority } from '../../types/director'

/** Elevation level 3 (shadow-modal) — same bottom-sheet pattern used for merge/takeover confirmations. */
export function TagSupervisorSheet({
  agentName,
  callId,
  onCancel,
  onSubmitted,
}: {
  agentName: string
  callId: string
  onCancel: () => void
  onSubmitted: (supervisorName: string) => void
}) {
  const [selected, setSelected] = useState<Supervisor | null>(null)
  const [note, setNote] = useState('')
  const [priority, setPriority] = useState<TagPriority | null>(null)
  const [dueDate, setDueDate] = useState('')

  const canSend = selected !== null && note.trim().length > 0

  function handleSend() {
    if (!selected || !canSend) return
    addSupervisorTag({
      id: `tag-${Date.now()}`,
      supervisorId: selected.id,
      supervisorName: selected.name,
      note: note.trim(),
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      agentName,
      callId,
    })
    onSubmitted(selected.name)
  }

  return (
    <BottomSheet onDismiss={onCancel} className="max-h-[85vh] overflow-y-auto">
      <div className="flex flex-col gap-xxs">
        <span className="type-heading-md text-ink">Tag a Supervisor</span>
        <span className="type-body-sm text-mute">Regarding {agentName}&rsquo;s call</span>
      </div>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">Supervisor</span>
        <SupervisorPicker supervisors={supervisors} selectedId={selected?.id ?? null} onSelect={setSelected} />
      </div>

      <label className="flex flex-col gap-xs">
        <span className="type-caption-md text-mute">Note / Context</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
          placeholder="What should the supervisor follow up on?"
          className="type-body-md resize-none rounded-md bg-surface px-md py-sm text-ink placeholder-mute outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <div className="flex flex-col gap-xs">
        <span className="type-caption-md text-mute">Priority (optional)</span>
        <PriorityPicker value={priority} onChange={setPriority} />
      </div>

      <label className="flex flex-col gap-xs">
        <span className="type-caption-md text-mute">Due Date (optional)</span>
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="type-body-md h-12 rounded-md bg-surface px-md text-ink outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <div className="flex gap-sm">
        <button
          type="button"
          onClick={onCancel}
          className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full border-[1.5px] border-primary text-primary transition-colors hover:bg-primary-pale"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={`type-button-md flex h-12 flex-1 items-center justify-center rounded-full transition-colors ${
            canSend ? 'bg-primary text-on-primary hover:bg-primary-dark' : 'bg-surface text-ash'
          }`}
        >
          Send Tag
        </button>
      </div>
    </BottomSheet>
  )
}
