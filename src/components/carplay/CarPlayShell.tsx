import { useState } from 'react'
import { CarPlayCallListScreen } from './CarPlayCallListScreen'
import { CarPlaySidebar } from './CarPlaySidebar'
import type { SidebarView } from './CarPlaySidebar'
import { LiveInterventionScreen } from '../intervention/LiveInterventionScreen'
import type { Call } from '../../types/live-feed'

/**
 * SAFETY-SENSITIVE SURFACE — NEEDS REAL DEVICE/SIMULATOR TESTING.
 *
 * This shell has only been built and checked in a desktop browser at a
 * landscape viewport approximating a CarPlay display. It has not been
 * verified against Apple's actual CPListTemplate/CPGridTemplate behavior,
 * real head-unit touch-target physics, glare/daylight contrast, or the
 * CarPlay simulator. Do not treat this as validated for in-vehicle use
 * until it's been through Xcode's CarPlay simulator and a real head unit —
 * this is the one part of the app where a layout mistake has real-world
 * consequences while someone is driving.
 */
export function CarPlayShell() {
  const [view, setView] = useState<SidebarView>('calls')
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  // LiveInterventionScreen's CarPlay branch (deliberately unmodified —
  // see the note above) renders no back control at all, only its mobile
  // branch does. So the sidebar has to be able to exit the detail view on
  // its own: selecting either destination here always returns to that
  // destination's list, never leaves selectedCall dangling with no way out.
  function selectSidebarView(next: SidebarView) {
    setView(next)
    setSelectedCall(null)
  }

  if (selectedCall) {
    return (
      <div className="flex h-dvh w-full">
        <CarPlaySidebar active={view} onSelect={selectSidebarView} />
        <div className="flex-1">
          <LiveInterventionScreen onBack={() => setSelectedCall(null)} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-dvh w-full">
      <CarPlaySidebar active={view} onSelect={selectSidebarView} />
      <CarPlayCallListScreen view={view} onSelectCall={setSelectedCall} />
    </div>
  )
}
