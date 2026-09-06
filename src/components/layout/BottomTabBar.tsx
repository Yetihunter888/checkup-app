import { useState } from 'react'

const TABS = [
  {
    id: 'feed',
    label: 'Feed',
    icon: (
      <path
        d="M3 6h14M3 12h14M3 18h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: 'groups',
    label: 'Groups',
    icon: (
      <>
        <circle cx="7" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="14" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M2.5 17c0.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4M10.5 17c0.6-2.6 2.4-4 4.5-4s3.4 1.1 4.1 3.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: (
      <>
        <rect x="3" y="4" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6.5 11l2 2 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (
      <path
        d="M4 16V10M10 16V4M16 16v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
] as const

/** `bottom-tab-bar` from DESIGN-checkup.md — dark surface, green active icon. */
export function BottomTabBar() {
  const [active, setActive] = useState<string>('feed')

  return (
    <nav className="flex h-16 shrink-0 items-center justify-around border-t border-hairline bg-surface">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`flex flex-1 flex-col items-center gap-xxs py-xs ${
              isActive ? 'text-primary' : 'text-mute'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {tab.icon}
            </svg>
            <span className="type-caption-sm">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
