import type { Group, GroupMetric } from '../types/groups'

function averageMetric(a: GroupMetric, b: GroupMetric): GroupMetric {
  const parse = (value: string) => parseFloat(value.replace('%', ''))
  const suffix = a.value.includes('%') ? '%' : ''
  const decimals = suffix === '%' ? 0 : 1

  if (a.label !== b.label) return a

  const average = (parse(a.value) + parse(b.value)) / 2
  return { label: a.label, value: `${average.toFixed(decimals)}${suffix}` }
}

export function mergeGroups(a: Group, b: Group, mergedName: string): Group {
  const memberMap = new Map(a.members.map((member) => [member.id, member]))
  for (const member of b.members) memberMap.set(member.id, member)

  return {
    id: `g-merged-${a.id}-${b.id}`,
    name: mergedName,
    kind: 'static',
    metric: averageMetric(a.metric, b.metric),
    // Inherits the first group's contact type — there's no meaningful way
    // to "average" Inbound Call and Email, so this picks one deterministically
    // rather than guessing at a rule the product hasn't defined.
    contactType: a.contactType,
    members: Array.from(memberMap.values()),
  }
}
