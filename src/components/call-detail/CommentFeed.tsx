import { CommentRow } from './CommentRow'
import type { Comment } from '../../types/call-detail'

export function CommentFeed({
  comments,
  activeCommentId,
  hoveredCommentId,
  onSelect,
  onHoverComment,
}: {
  comments: Comment[]
  activeCommentId: string | null
  hoveredCommentId: string | null
  onSelect: (comment: Comment) => void
  onHoverComment: (id: string | null) => void
}) {
  const sorted = [...comments].sort((a, b) => a.timestampSeconds - b.timestampSeconds)

  return (
    <div className="flex flex-col gap-sm">
      {sorted.map((comment) => (
        <CommentRow
          key={comment.id}
          comment={comment}
          active={comment.id === activeCommentId}
          hovered={comment.id === hoveredCommentId}
          onSelect={onSelect}
          onHover={onHoverComment}
        />
      ))}
    </div>
  )
}
