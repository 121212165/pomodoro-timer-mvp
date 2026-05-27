import { formatTime } from '../../utils/format'

interface TimeDisplayProps {
  seconds: number
  className?: string
}

export default function TimeDisplay({ seconds, className = '' }: TimeDisplayProps) {
  return (
    <span
      className={`font-mono text-6xl font-light tracking-wider tabular-nums ${className}`}
      style={{ color: 'var(--color-text)' }}
      role="timer"
      aria-live="polite"
      aria-label={`剩余 ${formatTime(seconds)}`}
    >
      {formatTime(seconds)}
    </span>
  )
}
