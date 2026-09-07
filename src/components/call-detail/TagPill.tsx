import { TAG_CONFIG } from './tagColors'
import type { CommentTag } from '../../types/call-detail'

/** Same rounded-square shape convention as NoteBadge — classification, not a live-status pill. */
export function TagPill({ tag }: { tag: CommentTag }) {
  const config = TAG_CONFIG[tag]
  return (
    <span
      className={`type-caption-md inline-flex shrink-0 items-center gap-xs whitespace-nowrap rounded-sm border px-sm py-[3px] ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`size-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  )
}
