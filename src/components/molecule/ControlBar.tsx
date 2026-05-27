import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import Button from '../atom/Button'

interface ControlBarProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}

export default function ControlBar({ isRunning, onStart, onPause, onReset, onSkip }: ControlBarProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="ghost" size="icon" onClick={onReset} aria-label="重置" title="重置 (R)">
        <RotateCcw size={20} style={{ color: 'var(--color-text-muted)' }} />
      </Button>

      {isRunning ? (
        <Button variant="primary" size="lg" onClick={onPause} aria-label="暂停" className="w-16 h-16 !rounded-full">
          <Pause size={28} />
        </Button>
      ) : (
        <Button variant="primary" size="lg" onClick={onStart} aria-label="开始" className="w-16 h-16 !rounded-full">
          <Play size={28} className="ml-1" />
        </Button>
      )}

      <Button variant="ghost" size="icon" onClick={onSkip} aria-label="跳过" title="跳过 (S)">
        <SkipForward size={20} style={{ color: 'var(--color-text-muted)' }} />
      </Button>
    </div>
  )
}
