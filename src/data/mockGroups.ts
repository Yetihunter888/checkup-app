import type { Group } from '../types/groups'

export const initialGroups: Group[] = [
  {
    id: 'g-team-east',
    name: 'Team East',
    kind: 'static',
    metric: { label: 'Avg QA Score', value: '91%' },
    members: [
      { id: 'm-maria', name: 'Maria Alvarez', team: 'Team East' },
      { id: 'm-priya', name: 'Priya Natarajan', team: 'Team East' },
      { id: 'm-theo', name: 'Theo Nakamura', team: 'Team East' },
      { id: 'm-grace', name: "Grace O'Donnell", team: 'Team East' },
      { id: 'm-luis', name: 'Luis Reyes', team: 'Team East' },
    ],
  },
  {
    id: 'g-billing',
    name: 'Billing Specialists',
    kind: 'static',
    metric: { label: 'CSAT', value: '4.6' },
    members: [
      { id: 'm-devon', name: 'Devon Marsh', team: 'Billing Specialists' },
      { id: 'm-elle', name: 'Elle Fischer', team: 'Billing Specialists' },
      { id: 'm-ana', name: 'Ana Kowalski', team: 'Billing Specialists' },
      { id: 'm-ravi', name: 'Ravi Shah', team: 'Billing Specialists' },
    ],
  },
  {
    id: 'g-team-west',
    name: 'Team West',
    kind: 'static',
    metric: { label: 'Avg QA Score', value: '87%' },
    members: [
      { id: 'm-sam', name: "Sam O'Rourke", team: 'Team West' },
      { id: 'm-carlos', name: 'Carlos Mendez', team: 'Team West' },
      { id: 'm-nadia', name: 'Nadia Farouk', team: 'Team West' },
      { id: 'm-ben', name: 'Ben Whitfield', team: 'Team West' },
    ],
  },
  {
    id: 'g-retention',
    name: 'Retention',
    kind: 'static',
    metric: { label: 'CSAT', value: '4.3' },
    members: [
      { id: 'm-jonah', name: 'Jonah Kessler', team: 'Retention' },
      { id: 'm-katrina', name: 'Katrina Liu', team: 'Retention' },
      { id: 'm-farah', name: 'Farah Idris', team: 'Retention' },
    ],
  },
  {
    id: 'g-spanish',
    name: 'Spanish Bilingual',
    kind: 'dynamic',
    metric: { label: 'Avg QA Score', value: '89%' },
    members: [
      { id: 'm-maria', name: 'Maria Alvarez', team: 'Team East' },
      { id: 'm-ana', name: 'Ana Kowalski', team: 'Billing Specialists' },
      { id: 'm-carlos', name: 'Carlos Mendez', team: 'Team West' },
      { id: 'm-farah', name: 'Farah Idris', team: 'Retention' },
    ],
  },
  {
    id: 'g-tier2',
    name: 'Tier 2 Escalations',
    kind: 'dynamic',
    metric: { label: 'CSAT', value: '4.1' },
    members: [
      { id: 'm-jonah', name: 'Jonah Kessler', team: 'Retention' },
      { id: 'm-priya', name: 'Priya Natarajan', team: 'Team East' },
      { id: 'm-devon', name: 'Devon Marsh', team: 'Billing Specialists' },
    ],
  },
]
