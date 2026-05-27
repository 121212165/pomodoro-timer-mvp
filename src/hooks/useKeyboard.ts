import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface KeyboardActions {
  onStartPause?: () => void
  onReset?: () => void
  onSkip?: () => void
  onToggleTheme?: () => void
}

export function useKeyboard(actions: KeyboardActions) {
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          actions.onStartPause?.()
          break
        case 'KeyR':
          actions.onReset?.()
          break
        case 'KeyS':
          actions.onSkip?.()
          break
        case 'KeyT':
          actions.onToggleTheme?.()
          break
        case 'Digit1':
          navigate('/')
          break
        case 'Digit2':
          navigate('/stats')
          break
        case 'Digit3':
          navigate('/settings')
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [actions, navigate])
}
