import { useRef, useEffect, useCallback } from 'react'
import ProgressRing from '../atom/ProgressRing'
import TimeDisplay from '../atom/TimeDisplay'
import SessionDot from '../atom/SessionDot'
import ControlBar from '../molecule/ControlBar'
import SessionLabel from '../molecule/SessionLabel'
import { useTimerStore } from '../../store/timerStore'
import { usePreferenceStore } from '../../store/preferenceStore'
import { getPhaseColor } from '../../utils/format'
import type { TimerPhase } from '../../types'

function getDuration(phase: TimerPhase, prefs: ReturnType<typeof usePreferenceStore.getState>): number {
  switch (phase) {
    case 'focus': return prefs.focusMinutes * 60
    case 'shortBreak': return prefs.shortBreakMinutes * 60
    case 'longBreak': return prefs.longBreakMinutes * 60
  }
}

export default function TimerCard() {
  const { status, phase, secondsLeft, completedPomodoros, currentRound, currentTask, setTask, start, pause, resume, complete, reset, tick, skip } = useTimerStore()
  const prefs = usePreferenceStore()
  const workerRef = useRef<Worker | null>(null)
  const duration = getDuration(phase, prefs)
  const progress = duration > 0 ? secondsLeft / duration : 0

  const initWorker = useCallback(() => {
    if (workerRef.current) workerRef.current.terminate()
    const worker = new Worker(new URL('../../workers/timer.worker.ts', import.meta.url), { type: 'module' })
    worker.onmessage = (e) => {
      const { type, remaining } = e.data
      if (type === 'tick') tick(remaining)
      if (type === 'complete') {
        complete()
        if (prefs.soundEnabled) {
          try { new Audio('/sounds/ding.mp3').play().catch(() => {}) } catch {}
        }
      }
    }
    workerRef.current = worker
    return worker
  }, [tick, complete, prefs.soundEnabled])

  useEffect(() => {
    const worker = initWorker()
    return () => worker.terminate()
  }, [initWorker])

  const handleStart = () => {
    const worker = workerRef.current ?? initWorker()
    start(duration)
    worker.postMessage({ type: 'start', duration })
  }

  const handlePause = () => {
    workerRef.current?.postMessage({ type: 'stop' })
    pause()
  }

  const handleResume = () => {
    const worker = workerRef.current ?? initWorker()
    resume()
    worker.postMessage({ type: 'start', duration: secondsLeft })
  }

  const handleReset = () => {
    workerRef.current?.postMessage({ type: 'stop' })
    reset(duration)
  }

  const handleSkip = () => {
    workerRef.current?.postMessage({ type: 'stop' })
    skip()
  }

  return (
    <div
      className="flex flex-col items-center gap-6 p-8 rounded-3xl shadow-lg w-full max-w-sm"
      style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
    >
      <SessionLabel phase={phase} currentRound={currentRound} totalRounds={prefs.longBreakInterval} />

      <input
        type="text"
        placeholder="正在做什么..."
        value={currentTask}
        onChange={(e) => setTask(e.target.value)}
        disabled={status === 'running'}
        className="w-full text-center text-sm px-3 py-2 rounded-lg outline-none transition-opacity disabled:opacity-50"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
        }}
      />

      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} color={getPhaseColor(phase)} size={260} strokeWidth={10} />
        <div className="absolute inset-0 flex items-center justify-center">
          <TimeDisplay seconds={secondsLeft} />
        </div>
      </div>

      <ControlBar
        isRunning={status === 'running'}
        onStart={status === 'paused' ? handleResume : handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
      />

      <div className="flex gap-2">
        {Array.from({ length: prefs.longBreakInterval }).map((_, i) => (
          <SessionDot key={i} status={i < completedPomodoros % prefs.longBreakInterval ? 'done' : i === completedPomodoros % prefs.longBreakInterval && phase === 'focus' ? 'active' : 'pending'} />
        ))}
      </div>
    </div>
  )
}
