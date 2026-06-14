import { formatDate, getPhaseLabel } from '../../utils/format'
import type { SessionRecord } from '../../types'

interface SessionCardProps {
  session: SessionRecord
}

export default function SessionCard({ session }: SessionCardProps) {
  const isFocus = session.type === 'focus'
  const mins = Math.floor(session.actualDuration / 60)
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
    >
      <span
        className="w-2 h-8 rounded-full flex-shrink-0"
        style={{ backgroundColor: isFocus ? 'var(--color-focus)' : 'var(--color-break)' }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{getPhaseLabel(session.type)}</span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {mins} 分钟
          </span>
        </div>
        {session.task && (
          <p className="text-xs truncate" style={{ color: 'var(--color-text)' }}>
            {session.task}
          </p>
        )}
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {formatDate(session.startedAt)}
        </p>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full ${session.completed ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30' : 'text-orange-500 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/30'}`}>
        {session.completed ? '完成' : '中断'}
      </span>
    </div>
  )
}
