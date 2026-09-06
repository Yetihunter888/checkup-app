export type CallStatus = 'talking' | 'hold' | 'transferring' | 'silence'

export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface Call {
  id: string
  agentName: string
  team: string
  durationSeconds: number
  status: CallStatus
  sentiment: Sentiment
  needsAttention: boolean
  aiFlagReason?: string
}

export interface SavedView {
  id: string
  label: string
}

export interface QueueHealth {
  callsWaiting: number
  longestWaitSeconds: number
  agentsAvailable: number
  slaRisk: number
}
