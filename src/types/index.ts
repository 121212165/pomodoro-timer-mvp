export type TimerStatus = 'idle' | 'running' | 'paused'
export type TimerPhase = 'focus' | 'shortBreak' | 'longBreak'

export interface SessionRecord {
  id: string
  type: TimerPhase
  startedAt: number
  endedAt: number | null
  plannedDuration: number
  actualDuration: number
  completed: boolean
  interrupted: boolean
}

export interface UserPreferences {
  focusMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  longBreakInterval: number
  theme: 'light' | 'dark' | 'system'
  soundEnabled: boolean
  autoStartBreak: boolean
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  theme: 'system',
  soundEnabled: true,
  autoStartBreak: false,
}
