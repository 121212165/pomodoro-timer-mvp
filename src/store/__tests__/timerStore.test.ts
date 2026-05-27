import { describe, it, expect, beforeEach } from 'vitest'
import { useTimerStore } from '../timerStore'

beforeEach(() => {
  useTimerStore.setState({
    status: 'idle',
    phase: 'focus',
    secondsLeft: 1500,
    completedPomodoros: 0,
    currentRound: 1,
    sessions: [],
    lastActiveStart: null,
  })
})

describe('timerStore', () => {
  it('starts timer', () => {
    useTimerStore.getState().start(1500)
    const state = useTimerStore.getState()
    expect(state.status).toBe('running')
    expect(state.secondsLeft).toBe(1500)
    expect(state.lastActiveStart).toBeTruthy()
  })

  it('pauses timer', () => {
    useTimerStore.getState().start(1500)
    useTimerStore.getState().pause()
    expect(useTimerStore.getState().status).toBe('paused')
  })

  it('resumes timer', () => {
    useTimerStore.getState().start(1500)
    useTimerStore.getState().pause()
    useTimerStore.getState().resume()
    expect(useTimerStore.getState().status).toBe('running')
  })

  it('resets timer', () => {
    useTimerStore.getState().start(1500)
    useTimerStore.getState().tick(500)
    useTimerStore.getState().reset(1500)
    const state = useTimerStore.getState()
    expect(state.status).toBe('idle')
    expect(state.secondsLeft).toBe(1500)
  })

  it('completes a focus session and switches to break', () => {
    useTimerStore.getState().start(1500)
    useTimerStore.getState().complete()
    const state = useTimerStore.getState()
    expect(state.completedPomodoros).toBe(1)
    expect(state.phase).toBe('shortBreak')
    expect(state.sessions).toHaveLength(1)
    expect(state.sessions[0].completed).toBe(true)
  })

  it('tick updates secondsLeft', () => {
    useTimerStore.getState().start(1500)
    useTimerStore.getState().tick(100)
    expect(useTimerStore.getState().secondsLeft).toBe(100)
  })

  it('skip creates interrupted session', () => {
    useTimerStore.getState().start(1500)
    useTimerStore.getState().skip()
    const state = useTimerStore.getState()
    expect(state.sessions).toHaveLength(1)
    expect(state.sessions[0].interrupted).toBe(true)
  })
})
