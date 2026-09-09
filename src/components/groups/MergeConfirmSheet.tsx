import { useState } from 'react'
import { BottomSheet } from '../ui/BottomSheet'
import type { Group } from '../../types/groups'

function GroupSummary({ group }: { group: Group }) {
  return (
    <div className="flex flex-1 flex-col gap-xxs rounded-md bg-surface p-md">
      <span className="type-body-strong truncate text-ink">{group.name}</span>
      <span className="type-caption-sm text-mute">{group.members.length} members</span>
    </div>
  )
}

/**
 * Elevation level 3 from DESIGN-checkup.md ("Soft shadow — bottom sheets
 * and modals only") — the one place in the system a shadow is the right
 * depth cue instead of a surface-color step.
 */
export function MergeConfirmSheet({
  groupA,
  groupB,
  onCancel,
  onConfirm,
}: {
  groupA: Group
  groupB: Group
  onCancel: () => void
  onConfirm: (mergedName: string) => void
}) {
  const [mergedName, setMergedName] = useState(`${groupA.name} + ${groupB.name}`)

  return (
    <BottomSheet onDismiss={onCancel}>
      <div className="flex flex-col gap-xxs">
        <span className="type-heading-md text-ink">Merge these groups?</span>
        <span className="type-body-sm text-mute">
          Members from both groups will be combined. This can't be undone automatically.
        </span>
      </div>

      <div className="flex items-center gap-sm">
        <GroupSummary group={groupA} />
        <span className="type-heading-md text-mute">+</span>
        <GroupSummary group={groupB} />
      </div>

      <label className="flex flex-col gap-xs">
        <span className="type-caption-md text-mute">New group name</span>
        <input
          type="text"
          value={mergedName}
          onChange={(event) => setMergedName(event.target.value)}
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
          onClick={() => onConfirm(mergedName.trim() || `${groupA.name} + ${groupB.name}`)}
          className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-dark"
        >
          Confirm Merge
        </button>
      </div>
    </BottomSheet>
  )
}
