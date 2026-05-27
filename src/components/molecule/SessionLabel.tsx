import { getPhaseLabel } from '../../utils/format'
import type { TimerPhase } from '../../types'

interface SessionLabelProps {
  phase: TimerPhase
  currentRound: number
  totalRounds: number
}

export default function SessionLabel({ phase, currentRound, totalRounds }: SessionLabelProps) {
  const isFocus = phase === 'focus'
  return (
    <div className="text-center space-y-1">
      <span
        className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor: isFocus ? 'var(--color-focus)' : 'var(--color-break)' }}
      >
        {getPhaseLabel(phase)}
      </span>
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        第 {currentRound} 轮 / 共 {totalRounds} 轮
      </p>
    </div>
  )
}
