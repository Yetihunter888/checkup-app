import { useState } from 'react'
import { AnalyticsDashboardScreen } from './components/analytics/AnalyticsDashboardScreen'
import { CallDetailScreen } from './components/call-detail/CallDetailScreen'
import { CarPlayShell } from './components/carplay/CarPlayShell'
import { TaskDashboardScreen } from './components/dashboard/TaskDashboardScreen'
import { DirectorCallReviewScreen } from './components/director/DirectorCallReviewScreen'
import { GroupsScreen } from './components/groups/GroupsScreen'
import { LiveInterventionScreen } from './components/intervention/LiveInterventionScreen'
import type { TabId } from './components/layout/BottomTabBar'
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
  | 'carplay'

// Dev-only screen switcher — there's no router yet, so this is scaffolding
// to reach the screens with no real in-app entry point (Intervene, Director,
// CarPlay). Feed/Groups/Tasks/Reports are reachable for real now, via
// BottomTabBar — see handleNavigateTab below.
function App() {
  const [screen, setScreen] = useState<Screen>('feed')

  // Hidden only on the two drill-down screens, which already have a working
  // back button *and* real BottomTabBar navigation now — every other screen
  // keeps this visible so there's always a way to reach Intervene/Director/
  // CarPlay (and back to Feed from CarPlay, which has no back button of its
  // own — it represents a different device entirely, not a phone screen).
  const showSwitcher = screen !== 'call-detail' && screen !== 'qa-scoring'

  function handleNavigateTab(tab: TabId) {
    if (tab === 'feed') setScreen('feed')
    if (tab === 'groups') setScreen('groups')
    if (tab === 'tasks') setScreen('dashboard')
    if (tab === 'reports') setScreen('analytics')
  }

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
            onClick={() => setScreen('intervention')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'intervention' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            Intervene
          </button>
          <button
            type="button"
            onClick={() => setScreen('director')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'director' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            Director
          </button>
          <button
            type="button"
            onClick={() => setScreen('carplay')}
            className={`type-caption-sm rounded-full px-md py-xs ${
              screen === 'carplay' ? 'bg-surface text-ink' : 'text-mute'
            }`}
          >
            CarPlay
          </button>
        </div>
      )}

      {screen === 'feed' && (
        <LiveCallFeedScreen onSelectCall={() => setScreen('call-detail')} onNavigateTab={handleNavigateTab} />
      )}
      {screen === 'groups' && <GroupsScreen onNavigateTab={handleNavigateTab} />}
      {screen === 'call-detail' && (
        <CallDetailScreen
          onBack={() => setScreen('feed')}
          onOpenScoring={() => setScreen('qa-scoring')}
          onNavigateTab={handleNavigateTab}
        />
      )}
      {screen === 'qa-scoring' && (
        <QaScoringScreen onBack={() => setScreen('call-detail')} onNavigateTab={handleNavigateTab} />
      )}
      {screen === 'intervention' && <LiveInterventionScreen onBack={() => setScreen('feed')} />}
      {screen === 'director' && <DirectorCallReviewScreen onBack={() => setScreen('feed')} />}
      {screen === 'dashboard' && <TaskDashboardScreen onNavigateTab={handleNavigateTab} />}
      {screen === 'analytics' && <AnalyticsDashboardScreen onNavigateTab={handleNavigateTab} />}
      {screen === 'carplay' && <CarPlayShell />}
    </div>
  )
}

export default App
