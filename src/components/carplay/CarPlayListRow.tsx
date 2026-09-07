import { useRef } from 'react'
import { CardAccentBar } from '../ui/CardAccentBar'
import { AttentionBadge, StatusBadge } from '../ui/StatusBadge'
import type { Call } from '../../types/live-feed'

const DRAG_THRESHOLD_PX = 10

/**
 * `carplay-list-row` from DESIGN-checkup.md.
 *
 * Status keeps its full four-color vocabulary here (see DESIGN-checkup.md's
 * revised CarPlay rules) — Talking/Hold/Transferring/Silence must stay
 * visually distinct even in this simplified list, since collapsing them to
 * one green "Talking" made a call on hold and 12 minutes of dead air look
 * identical, which is itself a safety/attentiveness risk.
 *
 * Tap detection is pointer-based, not a plain onClick: a scroll gesture
 * that happens to start on a row must never fire navigation. pointerdown
 * captures the start position; if pointerup lands more than
 * DRAG_THRESHOLD_PX away, the click is treated as a scroll and suppressed.
 */
export function CarPlayListRow({
  call,
  selected,
  onSelect,
}: {
  call: Call
  selected: boolean
  onSelect: (call: Call) => void
}) {
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null)
  const wasDrag = useRef(false)

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    pointerDownPos.current = { x: event.clientX, y: event.clientY }
    wasDrag.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!pointerDownPos.current) return
    const dx = Math.abs(event.clientX - pointerDownPos.current.x)
    const dy = Math.abs(event.clientY - pointerDownPos.current.y)
    if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
      wasDrag.current = true
    }
  }

  function handleClick() {
    if (wasDrag.current) {
      wasDrag.current = false
      return
    }
    onSelect(call)
  }

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      className="flex w-full text-left"
    >
      {call.needsAttention && <CardAccentBar colorClassName="bg-status-escalation" />}
      <div
        className={`flex min-h-[88px] flex-1 items-center justify-between gap-lg px-lg py-md transition-colors ${
          call.needsAttention ? 'rounded-r-md' : 'rounded-md'
        } ${selected ? 'bg-surface-elevated ring-2 ring-primary' : 'bg-surface'}`}
      >
        <div className="flex min-w-0 flex-col gap-xxs">
          <span className="type-carplay-md truncate text-ink">{call.agentName}</span>
          <span className="type-carplay-md truncate text-mute">{call.team}</span>
        </div>
        {call.needsAttention ? <AttentionBadge size="carplay" /> : <StatusBadge status={call.status} size="carplay" />}
      </div>
    </button>
  )
}
