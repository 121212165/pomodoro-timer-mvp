import { describe, it, expect } from 'vitest'
import { formatTime, getPhaseLabel, getPhaseColor } from '../format'

describe('formatTime', () => {
  it('formats 0 seconds', () => {
    expect(formatTime(0)).toBe('00:00')
  })
  it('formats 60 seconds as 01:00', () => {
    expect(formatTime(60)).toBe('01:00')
  })
  it('formats 1500 seconds as 25:00', () => {
    expect(formatTime(1500)).toBe('25:00')
  })
  it('formats 90 seconds as 01:30', () => {
    expect(formatTime(90)).toBe('01:30')
  })
  it('formats 3599 seconds as 59:59', () => {
    expect(formatTime(3599)).toBe('59:59')
  })
})

describe('getPhaseLabel', () => {
  it('returns 专注 for focus', () => {
    expect(getPhaseLabel('focus')).toBe('专注')
  })
  it('returns 短休息 for shortBreak', () => {
    expect(getPhaseLabel('shortBreak')).toBe('短休息')
  })
  it('returns 长休息 for longBreak', () => {
    expect(getPhaseLabel('longBreak')).toBe('长休息')
  })
  it('returns empty string for unknown', () => {
    expect(getPhaseLabel('unknown')).toBe('')
  })
})

describe('getPhaseColor', () => {
  it('returns focus color for focus', () => {
    expect(getPhaseColor('focus')).toBe('var(--color-focus)')
  })
  it('returns break color for shortBreak', () => {
    expect(getPhaseColor('shortBreak')).toBe('var(--color-break)')
  })
})
