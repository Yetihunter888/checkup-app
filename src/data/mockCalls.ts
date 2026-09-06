import type { Call, QueueHealth, SavedView } from '../types/live-feed'

export const queueHealth: QueueHealth = {
  callsWaiting: 6,
  longestWaitSeconds: 245,
  agentsAvailable: 14,
  slaRisk: 2,
}

export const savedViews: SavedView[] = [
  { id: 'all', label: 'All Calls' },
  { id: 'my-team', label: 'My Team' },
  { id: 'escalations', label: 'Escalations Only' },
]

export const calls: Call[] = [
  {
    id: 'c-1',
    agentName: 'Maria Alvarez',
    team: 'Team East',
    durationSeconds: 312,
    status: 'talking',
    sentiment: 'negative',
    needsAttention: true,
    aiFlagReason: 'Rising frustration detected, 2 escalation phrases',
  },
  {
    id: 'c-2',
    agentName: 'Devon Marsh',
    team: 'Billing Specialists',
    durationSeconds: 96,
    status: 'talking',
    sentiment: 'positive',
    needsAttention: false,
  },
  {
    id: 'c-3',
    agentName: 'Priya Natarajan',
    team: 'Team East',
    durationSeconds: 184,
    status: 'hold',
    sentiment: 'neutral',
    needsAttention: false,
  },
  {
    id: 'c-4',
    agentName: 'Jonah Kessler',
    team: 'Retention',
    durationSeconds: 421,
    status: 'talking',
    sentiment: 'negative',
    needsAttention: true,
    aiFlagReason: 'Silence over 20s detected mid-call',
  },
  {
    id: 'c-5',
    agentName: 'Elle Fischer',
    team: 'Billing Specialists',
    durationSeconds: 58,
    status: 'transferring',
    sentiment: 'neutral',
    needsAttention: false,
  },
  {
    id: 'c-6',
    agentName: 'Sam O’Rourke',
    team: 'Team West',
    durationSeconds: 733,
    status: 'silence',
    sentiment: 'neutral',
    needsAttention: false,
  },
  {
    id: 'c-7',
    agentName: 'Katrina Liu',
    team: 'Retention',
    durationSeconds: 142,
    status: 'talking',
    sentiment: 'positive',
    needsAttention: false,
  },
]
