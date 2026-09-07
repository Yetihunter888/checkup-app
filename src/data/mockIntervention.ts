import type { Comment } from '../types/call-detail'
import type { Sentiment } from '../types/live-feed'

// Same live call as the rest of the mock data (Maria Alvarez, Team East).
export const liveCall = {
  agentName: 'Maria Alvarez',
  team: 'Team East',
}

export const currentSentiment: Sentiment = 'negative'

export const issueSummary =
  'Customer disputing a $45 fee; agent has been unable to resolve after three attempts.'

export const lastThreeNotes: Comment[] = [
  {
    id: 'lm-1',
    timestampSeconds: 118,
    tag: 'policy-error',
    author: 'ai',
    text: 'Fee waiver policy was not offered even though the customer qualifies.',
  },
  {
    id: 'lm-2',
    timestampSeconds: 142,
    tag: 'coaching',
    author: 'ai',
    text: 'Agent talked over the customer twice in the last two minutes.',
  },
  {
    id: 'lm-3',
    timestampSeconds: 160,
    tag: 'escalation',
    author: 'director',
    text: 'Customer has asked for a supervisor twice now.',
  },
]
