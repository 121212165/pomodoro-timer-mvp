import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from '../storage'

beforeEach(() => {
  localStorage.clear()
})

describe('storage', () => {
  it('returns fallback for missing key', () => {
    expect(storage.get('missing', 42)).toBe(42)
  })
  it('stores and retrieves a value', () => {
    storage.set('test', { a: 1 })
    expect(storage.get('test', null)).toEqual({ a: 1 })
  })
  it('removes a value', () => {
    storage.set('key', 'value')
    storage.remove('key')
    expect(storage.get('key', 'default')).toBe('default')
  })
  it('handles invalid JSON gracefully', () => {
    localStorage.setItem('bad', '{invalid json')
    expect(storage.get('bad', 'fallback')).toBe('fallback')
  })
})
