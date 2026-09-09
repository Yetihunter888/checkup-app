import { CoachingHistoryCard } from './CoachingHistoryCard'
import { RecognitionRow } from './RecognitionRow'
import { ScoreTotal } from '../qa-scoring/ScoreTotal'
import { TrendSparkline } from '../qa-scoring/TrendSparkline'
import { Avatar } from '../ui/Avatar'
import { BackButton } from '../ui/BackButton'
import { Chip } from '../ui/Chip'
import { StatusBadge } from '../ui/StatusBadge'
import { useEscalations } from '../../data/escalationsStore'
import { useSupervisorTags } from '../../data/supervisorTagsStore'
import { buildCoachingHistory } from '../../lib/agentCoachingHistory'
import { formatMonthYear } from '../../lib/format'
import type { GroupMember } from '../../types/groups'

export function AgentProfileScreen({ member, onBack }: { member: GroupMember; onBack: () => void }) {
  const escalations = useEscalations()
  const supervisorTags = useSupervisorTags()
  const history = buildCoachingHistory(member.id, escalations, supervisorTags)

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <BackButton onBack={onBack} label="Back to group" />
        <span className="type-heading-md truncate text-ink">Agent Profile</span>
      </div>

      <div className="flex items-center gap-md rounded-lg bg-surface p-lg">
        <Avatar name={member.name} />
        <div className="flex min-w-0 flex-1 flex-col gap-xxs">
          <span className="type-card-title truncate text-ink">{member.name}</span>
          <span className="type-body-sm truncate text-mute">
            {member.role} · {member.team}
          </span>
        </div>
        <StatusBadge status={member.status} />
      </div>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">Skills & Certifications</span>
        <div className="flex flex-wrap gap-xs">
          {member.skills.map((skill) => (
            <Chip key={skill}>{skill}</Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">Performance</span>
        <ScoreTotal total={member.currentQaScore} />
        <TrendSparkline
          history={member.qaScoreTrend}
          currentScore={member.currentQaScore}
          caption="most recent score"
        />
        <div className="flex items-center justify-between rounded-lg bg-surface p-lg">
          <span className="type-caption-md text-mute">Employed Since</span>
          <span className="type-body-strong text-ink">{formatMonthYear(member.employedSince)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">Recent Coaching History</span>
        {history.length === 0 ? (
          <div className="rounded-lg bg-surface-sunken px-lg py-md">
            <span className="type-body-sm text-mute">No coaching notes yet for this agent.</span>
          </div>
        ) : (
          history.map((entry) => <CoachingHistoryCard key={entry.id} entry={entry} />)
        )}
      </div>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">Additional Info</span>
        <div className="flex flex-col gap-sm rounded-lg bg-surface p-lg">
          <div className="flex items-center justify-between">
            <span className="type-caption-md text-mute">Languages</span>
            <span className="type-body-sm text-ink">{member.languages.join(', ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="type-caption-md text-mute">Location</span>
            <span className="type-body-sm text-ink">{member.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="type-caption-md text-mute">Timezone</span>
            <span className="type-body-sm text-ink">{member.timezone}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <span className="type-caption-md text-mute">Recognition</span>
        {member.recognitions.length === 0 ? (
          <div className="rounded-lg bg-surface-sunken px-lg py-md">
            <span className="type-body-sm text-mute">No recognitions yet.</span>
          </div>
        ) : (
          <RecognitionRow recognitions={member.recognitions} />
        )}
      </div>
    </div>
  )
}
