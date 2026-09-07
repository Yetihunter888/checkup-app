/** Contextual bar shown while in multi-select merge mode. */
export function MergeSelectionBar({
  selectedCount,
  onCancel,
  onMerge,
}: {
  selectedCount: number
  onCancel: () => void
  onMerge: () => void
}) {
  const canMerge = selectedCount === 2

  return (
    <div className="flex flex-col gap-sm rounded-lg bg-surface-elevated px-lg py-md">
      <div className="flex flex-col gap-xxs">
        <span className="type-body-strong text-ink">{selectedCount} selected</span>
        {!canMerge && <span className="type-body-sm text-mute">Pick exactly 2 to merge</span>}
      </div>
      <div className="flex items-center justify-end gap-sm">
        <button
          type="button"
          onClick={onCancel}
          className="type-button-sm flex h-9 items-center justify-center rounded-full px-md text-mute transition-colors hover:text-ink"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onMerge}
          disabled={!canMerge}
          className={`type-button-sm flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-lg transition-colors ${
            canMerge
              ? 'bg-primary text-on-primary hover:bg-primary-dark'
              : 'bg-surface text-ash'
          }`}
        >
          Merge Groups
        </button>
      </div>
    </div>
  )
}
