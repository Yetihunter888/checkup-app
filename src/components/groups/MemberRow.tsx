import { Avatar } from '../ui/Avatar'
import type { GroupMember } from '../../types/groups'

/** Simplified `agent-row` — same surface/rounding as CallRow, without call-specific state. */
export function MemberRow({ member }: { member: GroupMember }) {
  return (
    <div className="flex items-center gap-md rounded-lg bg-surface px-lg py-md">
      <Avatar name={member.name} />
      <div className="flex min-w-0 flex-col gap-xxs">
        <span className="type-card-title truncate text-ink">{member.name}</span>
        <span className="type-body-sm truncate text-mute">{member.team}</span>
      </div>
    </div>
  )
}
