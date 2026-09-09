import { useSyncExternalStore } from 'react'
import { mockEscalations } from './mockEscalations'
import type { EscalationRecord } from '../types/dashboard'

/**
 * Module-level store, same shared-store pattern as supervisorTagsStore.ts —
 * the single source of truth a Takeover confirmation writes into and the
 * Task Dashboard's Escalations section reads from. Seeded with the existing
 * mock rows so the dashboard isn't empty before any takeover happens.
 */
let escalations: EscalationRecord[] = [...mockEscalations]
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function addEscalation(record: EscalationRecord) {
  escalations = [record, ...escalations]
  emit()
}

export function getEscalations(): EscalationRecord[] {
  return escalations
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useEscalations(): EscalationRecord[] {
  return useSyncExternalStore(subscribe, getEscalations, getEscalations)
}
