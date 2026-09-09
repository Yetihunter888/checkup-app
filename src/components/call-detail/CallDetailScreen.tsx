import { useEffect, useState } from 'react'
import { AddCommentBar } from './AddCommentBar'
import { AgentStateTrack } from './AgentStateTrack'
import { CallDetailHeader } from './CallDetailHeader'
import { CommentFeed } from './CommentFeed'
import { PlaybackControls } from './PlaybackControls'
import { SentimentStoryTrack } from './SentimentStoryTrack'
import { Waveform } from './Waveform'
import { BottomTabBar } from '../layout/BottomTabBar'
import type { TabId } from '../layout/BottomTabBar'
import { TopHeader } from '../layout/TopHeader'
import { mockCallDetail } from '../../data/mockCallDetail'
import type { Comment } from '../../types/call-detail'

const SPEEDS = [1, 1.25, 1.5, 2]
const TICK_MS = 250

export function CallDetailScreen({
  onBack,
  onOpenScoring,
  onNavigateTab,
}: {
  onBack: () => void
  onOpenScoring: () => void
  onNavigateTab: (tab: TabId) => void
}) {
  const call = mockCallDetail
  const [comments, setComments] = useState<Comment[]>(call.comments)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [skipSilence, setSkipSilence] = useState(false)
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentTime((time) => {
        let next = time + (TICK_MS / 1000) * speed

        if (skipSilence) {
          const activeSilence = call.silenceRanges.find(
            (range) => next >= range.startSeconds && next < range.endSeconds,
          )
          if (activeSilence) next = activeSilence.endSeconds
        }

        if (next >= call.durationSeconds) {
          setIsPlaying(false)
          return call.durationSeconds
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [isPlaying, speed, skipSilence, call.silenceRanges, call.durationSeconds])

  function seekTo(seconds: number) {
    setCurrentTime(Math.min(call.durationSeconds, Math.max(0, seconds)))
    setActiveCommentId(null)
  }

  function selectComment(comment: Comment) {
    setCurrentTime(comment.timestampSeconds)
    setActiveCommentId(comment.id)
    setIsPlaying(false)
  }

  function addComment(text: string) {
    const comment: Comment = {
      id: `cm-${Date.now()}`,
      timestampSeconds: Math.round(currentTime),
      tag: 'coaching',
      author: 'supervisor',
      authorName: 'You',
      createdAt: new Date().toISOString(),
      text,
      agentId: call.agentId,
    }
    setComments((current) => [...current, comment])
    setActiveCommentId(comment.id)
  }

  return (
    <div className="flex h-dvh flex-col bg-canvas-dark">
      <TopHeader title="Check Up" />

      <main className="flex flex-1 flex-col gap-lg overflow-y-auto px-lg py-lg">
        <CallDetailHeader
          agentName={call.agentName}
          customerName={call.customerName}
          durationSeconds={call.durationSeconds}
          qaQuota={call.qaQuota}
          onBack={onBack}
        />

        <button
          type="button"
          onClick={onOpenScoring}
          className="type-button-md flex h-11 items-center justify-center rounded-full border-[1.5px] border-primary text-primary transition-colors hover:bg-primary-pale"
        >
          Score This Call
        </button>

        <div className="flex flex-col gap-sm">
          <Waveform
            durationSeconds={call.durationSeconds}
            currentTimeSeconds={currentTime}
            comments={comments}
            silenceRanges={call.silenceRanges}
            activeCommentId={activeCommentId}
            hoveredCommentId={hoveredCommentId}
            isLive={false}
            onSeek={seekTo}
            onSelectComment={(id) => {
              const comment = comments.find((c) => c.id === id)
              if (comment) selectComment(comment)
            }}
            onHoverComment={setHoveredCommentId}
          />
          <SentimentStoryTrack
            checkpoints={call.sentimentCheckpoints}
            durationSeconds={call.durationSeconds}
            onSeek={seekTo}
          />
          <AgentStateTrack segments={call.agentStateTrack} durationSeconds={call.durationSeconds} />
        </div>

        <PlaybackControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((playing) => !playing)}
          onSkip={(delta) => seekTo(currentTime + delta)}
          speed={speed}
          onCycleSpeed={() => setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length])}
          skipSilence={skipSilence}
          onToggleSkipSilence={() => setSkipSilence((v) => !v)}
        />

        <div className="flex flex-col gap-sm">
          <span className="type-caption-md text-mute">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </span>
          <CommentFeed
            comments={comments}
            activeCommentId={activeCommentId}
            hoveredCommentId={hoveredCommentId}
            onSelect={selectComment}
            onHoverComment={setHoveredCommentId}
          />
        </div>
      </main>

      <div className="shrink-0 px-lg pb-sm">
        <AddCommentBar onSubmit={addComment} onVoiceMemo={() => console.log('start voice memo')} />
      </div>

      <BottomTabBar active="feed" onNavigate={onNavigateTab} />
    </div>
  )
}
