/**
 * Not one of the doc's three authorship colors (AI/Supervisor/Director) —
 * "dynamic vs. static" is a different axis of meaning (how the group was
 * built, not who wrote something), so it deliberately stays neutral rather
 * than borrowing note-ai purple. Shape follows NoteBadge's convention
 * (rounded-square, dashed = auto-generated) so it still reads as
 * "classification," not as a live operational status pill.
 */
export function GroupKindBadge() {
  return (
    <span className="type-caption-md inline-flex shrink-0 items-center whitespace-nowrap rounded-sm border border-dashed border-hairline-strong bg-surface-elevated px-sm py-[3px] text-mute">
      Dynamic
    </span>
  )
}
