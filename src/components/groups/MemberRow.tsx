import { Avatar } from '../ui/Avatar'
import type { GroupMember } from '../../types/groups'

/**
 * Simplified `agent-row` — same surface/rounding as CallRow, without
 * call-specific state. The whole row is the tap target that opens the
 * member's Agent Profile, same "whole row = tap target" convention CallRow
 * uses for opening a call.
 */
export function MemberRow({ member, onSelect }: { member: GroupMember; onSelect: (member: GroupMember) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      className="group flex w-full items-center gap-md rounded-lg bg-surface px-lg py-md text-left transition-colors hover:bg-surface-elevated hover:ring-1 hover:ring-primary focus-visible:bg-surface-elevated focus-visible:ring-1 focus-visible:ring-primary"
    >
      <Avatar name={member.name} />
      <div className="flex min-w-0 flex-col gap-xxs">
        <span className="type-card-title truncate text-ink">{member.name}</span>
        <span className="type-body-sm truncate text-mute">{member.team}</span>
      </div>
    </button>
  )
}
