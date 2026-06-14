import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TimerStatus, TimerPhase, SessionRecord } from '../types'

interface TimerState {
  status: TimerStatus
  phase: TimerPhase
  secondsLeft: number
  completedPomodoros: number
  currentRound: number
  sessions: SessionRecord[]
  lastActiveStart: number | null
  currentTask: string

  // actions
  setTask: (task: string) => void
  start: (duration: number) => void
  pause: () => void
  resume: () => void
  complete: () => void
  reset: (duration: number) => void
  tick: (remaining: number) => void
  skip: () => void
  setPhase: (phase: TimerPhase) => void
  clearHistory: () => void
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      status: 'idle',
      phase: 'focus',
      secondsLeft: 25 * 60,
      completedPomodoros: 0,
      currentRound: 1,
      sessions: [],
      lastActiveStart: null,
      currentTask: '',

      setTask: (task) => set({ currentTask: task }),

      start: (duration) =>
        set({
          status: 'running',
          secondsLeft: duration,
          lastActiveStart: Date.now(),
        }),

      pause: () => set({ status: 'paused' }),

      resume: () => set({ status: 'running' }),

      complete: () => {
        const state = get()
        const session: SessionRecord = {
          id: crypto.randomUUID(),
          type: state.phase,
          startedAt: state.lastActiveStart ?? Date.now(),
          endedAt: Date.now(),
          plannedDuration: state.phase === 'focus' ? 25 * 60 : 5 * 60,
          actualDuration: state.phase === 'focus' ? 25 * 60 : 5 * 60,
          completed: true,
          interrupted: false,
          task: state.currentTask || undefined,
        }
        const isFocus = state.phase === 'focus'
        const newCompleted = isFocus ? state.completedPomodoros + 1 : state.completedPomodoros
        const newRound = isFocus ? state.currentRound + 1 : state.currentRound
        const nextPhase: TimerPhase = isFocus
          ? (newCompleted % 4 === 0 ? 'longBreak' : 'shortBreak')
          : 'focus'

        set({
          status: 'idle',
          phase: nextPhase,
          completedPomodoros: newCompleted,
          currentRound: newRound,
          sessions: [session, ...state.sessions],
          lastActiveStart: null,
        })
      },

      reset: (duration) =>
        set({
          status: 'idle',
          secondsLeft: duration,
          lastActiveStart: null,
        }),

      tick: (remaining) => set({ secondsLeft: remaining }),

      skip: () => {
        const state = get()
        if (state.lastActiveStart) {
          const session: SessionRecord = {
            id: crypto.randomUUID(),
            type: state.phase,
            startedAt: state.lastActiveStart,
            endedAt: Date.now(),
            plannedDuration: state.secondsLeft,
            actualDuration: 0,
            completed: false,
            interrupted: true,
            task: state.currentTask || undefined,
          }
          set({ sessions: [session, ...state.sessions] })
        }
        const isFocus = state.phase === 'focus'
        const nextPhase: TimerPhase = isFocus
          ? (state.completedPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak')
          : 'focus'
        set({
          status: 'idle',
          phase: nextPhase,
          secondsLeft: 25 * 60,
          lastActiveStart: null,
        })
      },

      setPhase: (phase) => set({ phase, status: 'idle', secondsLeft: 25 * 60 }),

      clearHistory: () => set({ sessions: [] }),
    }),
    {
      name: 'pomodoro-timer',
      partialize: (state) => ({
        completedPomodoros: state.completedPomodoros,
        currentRound: state.currentRound,
        sessions: state.sessions.slice(0, 100),
        phase: state.phase,
        currentTask: state.currentTask,
      }),
    }
  )
)
