import { useTimerStore } from '../store/timerStore'
import SessionCard from '../components/organism/SessionCard'

export default function StatsPage() {
  const sessions = useTimerStore((s) => s.sessions)
  const completedPomodoros = useTimerStore((s) => s.completedPomodoros)
  const todaySessions = sessions.filter((s) => {
    const d = new Date(s.startedAt)
    const today = new Date()
    return d.toDateString() === today.toDateString()
  })
  const todayMinutes = todaySessions
    .filter((s) => s.type === 'focus' && s.completed)
    .reduce((acc, s) => acc + Math.floor(s.actualDuration / 60), 0)

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="text-5xl">🍅</span>
        <p className="text-lg font-medium">还没有记录</p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          开始第一个番茄钟吧
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm space-y-6 py-4">
      <div className="grid grid-cols-2 gap-3">
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-2xl font-bold" style={{ color: 'var(--color-focus)' }}>{todayMinutes}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>今日专注(分钟)</p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-2xl font-bold" style={{ color: 'var(--color-focus)' }}>{completedPomodoros}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>总完成番茄数</p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-muted)' }}>历史记录</h2>
        <div className="space-y-2">
          {sessions.slice(0, 20).map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
