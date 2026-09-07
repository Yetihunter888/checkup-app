import type { InterventionMode } from '../../types/intervention'

const BANNER_CONFIG: Record<
  Exclude<InterventionMode, 'takeover-confirm'>,
  { text: string; bg: string; textColor: string; dot: string }
> = {
  listen: { text: 'Listening — Silent', bg: 'bg-surface-elevated', textColor: 'text-mute', dot: 'bg-mute' },
  whisper: { text: 'Whispering to Agent', bg: 'bg-primary-pale', textColor: 'text-primary', dot: 'bg-primary' },
  barge: {
    text: "You're Live on This Call",
    bg: 'bg-status-hold/15',
    textColor: 'text-status-hold',
    dot: 'bg-status-hold',
  },
  'takeover-active': {
    text: 'You Have Taken Over the Call',
    bg: 'bg-status-escalation/15',
    textColor: 'text-status-escalation',
    dot: 'bg-status-escalation',
  },
}

/**
 * The mode banner is the single "what's happening right now" indicator —
 * color intensity scales listen (neutral) -> whisper (green) -> barge
 * (amber) -> takeover (red), reusing the same status vocabulary as the
 * rest of the app rather than a one-off color per mode.
 */
export function LiveBanner({ mode }: { mode: Exclude<InterventionMode, 'takeover-confirm'> }) {
  const config = BANNER_CONFIG[mode]
  return (
    <div className={`flex items-center justify-center gap-xs rounded-lg px-lg py-md ${config.bg}`}>
      <span className={`size-2 shrink-0 rounded-full ${config.dot}`} aria-hidden="true" />
      <span className={`type-body-strong ${config.textColor}`}>{config.text}</span>
    </div>
  )
}
