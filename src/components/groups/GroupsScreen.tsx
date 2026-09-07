import { useState } from 'react'
import { BottomTabBar } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { GroupCard } from './GroupCard'
import { GroupDetailScreen } from './GroupDetailScreen'
import { GroupsToolbar } from './GroupsToolbar'
import { MergeConfirmSheet } from './MergeConfirmSheet'
import { MergeSelectionBar } from './MergeSelectionBar'
import { initialGroups } from '../../data/mockGroups'
import { mergeGroups } from '../../lib/mergeGroups'
import type { Group } from '../../types/groups'

export function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [openGroupId, setOpenGroupId] = useState<string | null>(null)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [mergePair, setMergePair] = useState<[Group, Group] | null>(null)

  const openGroup = groups.find((group) => group.id === openGroupId) ?? null

  function toggleSelected(group: Group) {
    setSelectedIds((current) =>
      current.includes(group.id)
        ? current.filter((id) => id !== group.id)
        : [...current, group.id],
    )
  }

  function cancelSelect() {
    setSelectMode(false)
    setSelectedIds([])
  }

  function requestMerge() {
    const [aId, bId] = selectedIds
    const a = groups.find((group) => group.id === aId)
    const b = groups.find((group) => group.id === bId)
    if (a && b) setMergePair([a, b])
  }

  function confirmMerge(mergedName: string) {
    if (!mergePair) return
    const [a, b] = mergePair
    const merged = mergeGroups(a, b, mergedName)
    setGroups((current) => [...current.filter((g) => g.id !== a.id && g.id !== b.id), merged])
    setMergePair(null)
    cancelSelect()
  }

  function handleAddMembers() {
    // Opens the add-members flow once it exists; stubbed for now.
    console.log('add members ->', openGroupId)
  }

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <TopHeader title="Groups" />

      <main className="flex flex-1 flex-col gap-lg overflow-y-auto px-lg py-lg">
        {openGroup ? (
          <GroupDetailScreen
            group={openGroup}
            onBack={() => setOpenGroupId(null)}
            onAddMembers={handleAddMembers}
          />
        ) : (
          <>
            {selectMode ? (
              <MergeSelectionBar
                selectedCount={selectedIds.length}
                onCancel={cancelSelect}
                onMerge={requestMerge}
              />
            ) : (
              <GroupsToolbar
                onCreate={() => console.log('create group')}
                onStartMerge={() => setSelectMode(true)}
              />
            )}

            <div className="grid grid-cols-2 gap-lg max-[360px]:grid-cols-1">
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  mode={selectMode ? 'select' : 'browse'}
                  selected={selectedIds.includes(group.id)}
                  onOpen={(g) => setOpenGroupId(g.id)}
                  onToggleSelect={toggleSelected}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {mergePair && (
        <MergeConfirmSheet
          groupA={mergePair[0]}
          groupB={mergePair[1]}
          onCancel={() => setMergePair(null)}
          onConfirm={confirmMerge}
        />
      )}

      <BottomTabBar />
    </div>
  )
}
