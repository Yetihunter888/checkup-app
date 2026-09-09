import type { ReactNode } from 'react'

/**
 * Elevation level 3 (shadow-modal) from DESIGN-checkup.md — the shared
 * outer wrapper for every bottom sheet in the app (takeover confirm, tag
 * supervisor, tag confirmation, merge confirm). `onDismiss` fires on
 * backdrop tap; screens that want the sheet non-dismissable that way can
 * still add their own explicit Cancel/Done button inside `children`.
 */
export function BottomSheet({
  onDismiss,
  className = '',
  children,
}: {
  onDismiss: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center">
      <div className="absolute inset-0 bg-canvas-dark/70" onClick={onDismiss} />
      <div
        className={`shadow-modal relative z-10 flex w-full max-w-[390px] flex-col gap-lg rounded-t-xl bg-surface-elevated p-xl ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
