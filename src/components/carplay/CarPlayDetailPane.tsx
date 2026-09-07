import { CallDetailScreen } from '../call-detail/CallDetailScreen'
import { LiveInterventionScreen } from '../intervention/LiveInterventionScreen'
import { mockCallDetail } from '../../data/mockCallDetail'
import type { Call } from '../../types/live-feed'

function EmptyDetailPane() {
  return (
    <div className="flex flex-1 items-center justify-center bg-canvas-dark p-xl">
      <span className="type-carplay-md text-mute">Select a call to view details</span>
    </div>
  )
}

/**
 * Routing note (per review): the `Call` type carries no ended/live flag —
 * mockCalls.ts represents currently-active calls only, full stop. The one
 * "already ended" call record anywhere in this codebase is
 * mockCallDetail.ts, which happens to share id 'c-1' with Maria Alvarez's
 * live-feed entry. So "is this call still live or already ended" is
 * answered here by matching against that one real record, not a fabricated
 * status field — every other call (including Jonah Kessler's escalation)
 * has no ended-call data to route to, so it goes to LiveInterventionScreen.
 */
export function CarPlayDetailPane({ call, onClose }: { call: Call | null; onClose: () => void }) {
  if (!call) return <EmptyDetailPane />

  const hasEndedCallRecord = call.id === mockCallDetail.id

  if (hasEndedCallRecord) {
    // CallDetailScreen has its own working back button (wired to onClose),
    // so no extra shell-level control is needed here.
    return (
      <div className="flex-1">
        <CallDetailScreen
          onBack={onClose}
          // QA scoring doesn't belong in a driving context — CallDetailScreen
          // requires this prop, so it's intentionally a no-op here, not an
          // oversight.
          onOpenScoring={() => {}}
          // Same reasoning: CallDetailScreen's BottomTabBar has no
          // equivalent "Feed/Groups/Tasks/Reports" concept inside the
          // CarPlay shell — intentionally a no-op, not a missed wire-up.
          onNavigateTab={() => {}}
        />
      </div>
    )
  }

  return (
    <div className="relative flex-1">
      {/* LiveInterventionScreen's CarPlay branch (deliberately unmodified)
          renders no back control at all — see CarPlayShell's earlier note.
          This is the shell-level close affordance for that case. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close call detail"
        className="absolute right-lg top-lg z-30 flex size-11 items-center justify-center rounded-full bg-surface-elevated text-ink"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <LiveInterventionScreen onBack={onClose} />
    </div>
  )
}
