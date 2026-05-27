import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences } from '../types'
import { DEFAULT_PREFERENCES } from '../types'

interface PreferenceState extends UserPreferences {
  update: (prefs: Partial<UserPreferences>) => void
  resetDefaults: () => void
  applyTheme: () => void
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PREFERENCES,

      update: (prefs) => {
        set(prefs)
        get().applyTheme()
      },

      resetDefaults: () => {
        set(DEFAULT_PREFERENCES)
        get().applyTheme()
      },

      applyTheme: () => {
        const { theme } = get()
        const root = document.documentElement
        if (theme === 'system') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
        } else {
          root.setAttribute('data-theme', theme)
        }
      },
    }),
    {
      name: 'pomodoro-preferences',
      onRehydrateStorage: () => (state) => {
        state?.applyTheme()
      },
    }
  )
)
