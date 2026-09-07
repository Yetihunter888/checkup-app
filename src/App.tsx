import { useState } from 'react'
import { AnalyticsDashboardScreen } from './components/analytics/AnalyticsDashboardScreen'
import { CallDetailScreen } from './components/call-detail/CallDetailScreen'
import { TaskDashboardScreen } from './components/dashboard/TaskDashboardScreen'
import { DirectorCallReviewScreen } from './components/director/DirectorCallReviewScreen'
import { GroupsScreen } from './components/groups/GroupsScreen'
import { LiveInterventionScreen } from './components/intervention/LiveInterventionScreen'
import { LiveCallFeedScreen } from './components/live-feed/LiveCallFeedScreen'
import { QaScoringScreen } from './components/qa-scoring/QaScoringScreen'

type Screen =
  | 'feed'
  | 'groups'
  | 'call-detail'
  | 'qa-scoring'
  | 'intervention'
  | 'director'
  | 'dashboard'
  | 'analytics'

// Dev-only screen switcher — there's no router yet, so this is scaffolding
// to reach the built screens, not part of the Check Up design system.
function App() {
  const [screen, setScreen] = useState<Screen>('feed')

  const showSwitcher =
    screen === 'feed' || screen === 'groups' || screen === 'dashboard' || screen === 'analytics'

  return (
    <div className="relative">
      {showSwitcher && (
        <div className="fixed left-1/2 top-16 z-50 flex -translate-x-1/2 gap-xs rounded-full bg-surface-elevated/95 p-xxs shadow-modal">
          <button
            type="button"
            onClick={() => setScreen('feed')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'feed' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            Feed
          </button>
          <button
            type="button"
            onClick={() => setScreen('groups')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'groups' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            Groups
          </button>
          <button
            type="button"
            onClick={() => setScreen('intervention')}
            className="type-caption-sm rounded-full px-md py-xs text-mute"
          >
            Intervene
          </button>
          <button
            type="button"
            onClick={() => setScreen('director')}
            className="type-caption-sm rounded-full px-md py-xs text-mute"
          >
            Director
          </button>
          <button
            type="button"
            onClick={() => setScreen('dashboard')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'dashboard' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            Tasks
          </button>
          <button
            type="button"
            onClick={() => setScreen('analytics')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'analytics' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            Analytics
          </button>
        </div>
      )}

      {screen === 'feed' && <LiveCallFeedScreen onSelectCall={() => setScreen('call-detail')} />}
      {screen === 'groups' && <GroupsScreen />}
      {screen === 'call-detail' && (
        <CallDetailScreen onBack={() => setScreen('feed')} onOpenScoring={() => setScreen('qa-scoring')} />
      )}
      {screen === 'qa-scoring' && <QaScoringScreen onBack={() => setScreen('call-detail')} />}
      {screen === 'intervention' && <LiveInterventionScreen onBack={() => setScreen('feed')} />}
      {screen === 'director' && <DirectorCallReviewScreen onBack={() => setScreen('feed')} />}
      {screen === 'dashboard' && <TaskDashboardScreen />}
      {screen === 'analytics' && <AnalyticsDashboardScreen />}
    </div>
  )
}

export default App
