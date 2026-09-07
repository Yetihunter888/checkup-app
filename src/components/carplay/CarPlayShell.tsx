import { useState } from 'react'
import { CarPlayCallListScreen } from './CarPlayCallListScreen'
import { CarPlayDetailPane } from './CarPlayDetailPane'
import { CarPlaySidebar } from './CarPlaySidebar'
import type { SidebarView } from './CarPlaySidebar'
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
 *
 * Three-pane head-unit layout (icon rail / list / detail), all visible at
 * once — this is a CarPlay-appropriate wide-format layout, not the
 * full-screen push/replace navigation the rest of this app uses on a
 * narrow phone screen. Selecting a row never unmounts the list; it just
 * updates which call the third pane shows.
 */
export function CarPlayShell() {
  const [view, setView] = useState<SidebarView>('calls')
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  function selectSidebarView(next: SidebarView) {
    setView(next)
    setSelectedCall(null)
  }

  return (
    <div className="flex h-dvh w-full">
      <CarPlaySidebar active={view} onSelect={selectSidebarView} />
      <CarPlayCallListScreen view={view} selectedCallId={selectedCall?.id ?? null} onSelectCall={setSelectedCall} />
      <CarPlayDetailPane call={selectedCall} onClose={() => setSelectedCall(null)} />
    </div>
  )
}
