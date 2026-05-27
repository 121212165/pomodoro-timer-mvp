export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getPhaseLabel(phase: string): string {
  switch (phase) {
    case 'focus': return '专注'
    case 'shortBreak': return '短休息'
    case 'longBreak': return '长休息'
    default: return ''
  }
}

export function getPhaseColor(phase: string): string {
  return phase === 'focus' ? 'var(--color-focus)' : 'var(--color-break)'
}
