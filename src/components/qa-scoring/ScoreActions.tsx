/** `button-outline` + `button-primary` from DESIGN-checkup.md. */
export function ScoreActions({
  onSaveDraft,
  onSubmit,
}: {
  onSaveDraft: () => void
  onSubmit: () => void
}) {
  return (
    <div className="flex gap-sm rounded-lg bg-canvas-dark p-sm">
      <button
        type="button"
        onClick={onSaveDraft}
        className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full border-[1.5px] border-primary text-primary transition-colors hover:bg-primary-pale"
      >
        Save Draft
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="type-button-md flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-dark"
      >
        Submit
      </button>
    </div>
  )
}
