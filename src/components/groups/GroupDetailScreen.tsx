import { useState } from 'react'
import { Avatar } from '../ui/Avatar'
import { BackButton } from '../ui/BackButton'
import { GroupKindBadge } from './GroupKindBadge'
import { MemberRow } from './MemberRow'
import { AgentProfileScreen } from '../agent-profile/AgentProfileScreen'
import type { Group, GroupMember } from '../../types/groups'

const STACK_PREVIEW_COUNT = 4

export function GroupDetailScreen({
  group,
  onBack,
  onAddMembers,
}: {
  group: Group
  onBack: () => void
  onAddMembers: () => void
}) {
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null)
  const preview = group.members.slice(0, STACK_PREVIEW_COUNT)
  const overflow = group.members.length - preview.length

  if (selectedMember) {
    return <AgentProfileScreen member={selectedMember} onBack={() => setSelectedMember(null)} />
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <BackButton onBack={onBack} label="Back to groups" />
        <div className="flex min-w-0 flex-col gap-xxs">
          <span className="type-heading-md truncate text-ink">{group.name}</span>
          {group.kind === 'dynamic' && <GroupKindBadge />}
        </div>
      </div>

      <div className="flex items-center gap-md rounded-lg bg-surface p-lg">
        <Avatar name={group.teamLead} />
        <div className="flex min-w-0 flex-col gap-xxs">
          <span className="type-caption-md text-mute">Team Lead</span>
          <span className="type-card-title truncate text-ink">{group.teamLead}</span>
        </div>
      </div>

      <div className="flex items-center gap-lg rounded-lg bg-surface p-lg">
        <div className="flex -space-x-3">
          {preview.map((member) => (
            <div key={member.id} className="rounded-full ring-2 ring-surface">
              <Avatar name={member.name} />
            </div>
          ))}
          {overflow > 0 && (
            <div className="flex size-11 items-center justify-center rounded-full bg-surface-elevated text-body ring-2 ring-surface type-caption-sm">
              +{overflow}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-xxs">
          <span className="type-caption-md text-mute">{group.metric.label}</span>
          <span className="type-heading-md text-ink">{group.metric.value}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddMembers}
        className="type-button-md flex h-12 items-center justify-center rounded-full border-[1.5px] border-primary text-primary transition-colors hover:bg-primary-pale"
      >
        Add Members
      </button>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">
          {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
        </span>
        {group.members.map((member) => (
          <MemberRow key={member.id} member={member} onSelect={setSelectedMember} />
        ))}
      </div>
    </div>
  )
}
