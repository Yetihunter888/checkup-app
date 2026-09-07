import { useSyncExternalStore } from 'react'
import type { SupervisorTag } from '../types/director'

/**
 * Module-level store, not screen state — this is the single source of
 * truth a Director's "Tag a Supervisor" write goes into and whatever
 * builds the Supervisor Task Dashboard (Prompt 8) reads from. Deliberately
 * not passed down as a prop between the two screens, since they don't
 * share a parent that should know about either.
 */
let tags: SupervisorTag[] = []
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function addSupervisorTag(tag: SupervisorTag) {
  tags = [tag, ...tags]
  emit()
}

export function getSupervisorTags(): SupervisorTag[] {
  return tags
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useSupervisorTags(): SupervisorTag[] {
  return useSyncExternalStore(subscribe, getSupervisorTags, getSupervisorTags)
}
