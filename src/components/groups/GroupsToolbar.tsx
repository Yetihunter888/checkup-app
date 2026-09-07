/** `button-primary` + `button-outline` from DESIGN-checkup.md. */
export function GroupsToolbar({
  onCreate,
  onStartMerge,
}: {
  onCreate: () => void
  onStartMerge: () => void
}) {
  return (
    <div className="flex gap-sm">
      <button
        type="button"
        onClick={onCreate}
        className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-xl text-on-primary transition-colors hover:bg-primary-dark"
      >
        Create New Group
      </button>
      <button
        type="button"
        onClick={onStartMerge}
        className="type-button-md flex h-12 items-center justify-center rounded-full border-[1.5px] border-primary px-lg text-primary transition-colors hover:bg-primary-pale"
      >
        Merge
      </button>
    </div>
  )
}
