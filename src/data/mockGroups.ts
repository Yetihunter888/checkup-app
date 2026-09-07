import type { Group, GroupMember } from '../types/groups'

/**
 * Single source of truth for member data, keyed by id. Spanish Bilingual
 * and Tier 2 Escalations (dynamic groups) share members with the static
 * teams — status must be looked up here, not duplicated per group, or the
 * same person could show a different status depending on which group
 * card you're looking at.
 */
const MEMBERS: Record<string, GroupMember> = {
  'm-maria': { id: 'm-maria', name: 'Maria Alvarez', team: 'Team East', status: 'available' },
  'm-priya': { id: 'm-priya', name: 'Priya Natarajan', team: 'Team East', status: 'on-call' },
  'm-theo': { id: 'm-theo', name: 'Theo Nakamura', team: 'Team East', status: 'available' },
  'm-grace': { id: 'm-grace', name: "Grace O'Donnell", team: 'Team East', status: 'wrap-up' },
  'm-luis': { id: 'm-luis', name: 'Luis Reyes', team: 'Team East', status: 'not-logged-in' },

  'm-devon': { id: 'm-devon', name: 'Devon Marsh', team: 'Billing Specialists', status: 'on-call' },
  'm-elle': { id: 'm-elle', name: 'Elle Fischer', team: 'Billing Specialists', status: 'available' },
  'm-ana': { id: 'm-ana', name: 'Ana Kowalski', team: 'Billing Specialists', status: 'unavailable' },
  'm-ravi': { id: 'm-ravi', name: 'Ravi Shah', team: 'Billing Specialists', status: 'available' },

  'm-sam': { id: 'm-sam', name: "Sam O'Rourke", team: 'Team West', status: 'not-logged-in' },
  'm-carlos': { id: 'm-carlos', name: 'Carlos Mendez', team: 'Team West', status: 'available' },
  'm-nadia': { id: 'm-nadia', name: 'Nadia Farouk', team: 'Team West', status: 'on-call' },
  'm-ben': { id: 'm-ben', name: 'Ben Whitfield', team: 'Team West', status: 'wrap-up' },

  'm-jonah': { id: 'm-jonah', name: 'Jonah Kessler', team: 'Retention', status: 'unavailable' },
  'm-katrina': { id: 'm-katrina', name: 'Katrina Liu', team: 'Retention', status: 'available' },
  'm-farah': { id: 'm-farah', name: 'Farah Idris', team: 'Retention', status: 'available' },
}

function membersOf(ids: string[]): GroupMember[] {
  return ids.map((id) => MEMBERS[id])
}

export const initialGroups: Group[] = [
  {
    id: 'g-team-east',
    name: 'Team East',
    kind: 'static',
    metric: { label: 'Avg QA Score', value: '91%' },
    // Handles two contact types — the multi-type case: Inbound Call + Chat.
    contactTypes: ['inbound-call', 'chat'],
    teamLead: 'Jordan Blake',
    members: membersOf(['m-maria', 'm-priya', 'm-theo', 'm-grace', 'm-luis']),
  },
  {
    id: 'g-billing',
    name: 'Billing Specialists',
    kind: 'static',
    metric: { label: 'CSAT', value: '4.6' },
    contactTypes: ['email'],
    teamLead: 'Casey Nguyen',
    members: membersOf(['m-devon', 'm-elle', 'm-ana', 'm-ravi']),
  },
  {
    id: 'g-team-west',
    name: 'Team West',
    kind: 'static',
    metric: { label: 'Avg QA Score', value: '87%' },
    contactTypes: ['outbound-call'],
    teamLead: 'Marcus Chen',
    members: membersOf(['m-sam', 'm-carlos', 'm-nadia', 'm-ben']),
  },
  {
    id: 'g-retention',
    name: 'Retention',
    kind: 'static',
    metric: { label: 'CSAT', value: '4.3' },
    contactTypes: ['chat'],
    teamLead: 'Elena Vasquez',
    members: membersOf(['m-jonah', 'm-katrina', 'm-farah']),
  },
  {
    id: 'g-spanish',
    name: 'Spanish Bilingual',
    kind: 'dynamic',
    metric: { label: 'Avg QA Score', value: '89%' },
    contactTypes: ['social'],
    teamLead: 'Jordan Blake',
    members: membersOf(['m-maria', 'm-ana', 'm-carlos', 'm-farah']),
  },
  {
    id: 'g-tier2',
    name: 'Tier 2 Escalations',
    kind: 'dynamic',
    metric: { label: 'CSAT', value: '4.1' },
    contactTypes: ['work-item'],
    teamLead: 'Marcus Chen',
    members: membersOf(['m-jonah', 'm-priya', 'm-devon']),
  },
]
