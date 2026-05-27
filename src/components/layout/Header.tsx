import { Sun, Moon } from 'lucide-react'
import { usePreferenceStore } from '../../store/preferenceStore'

export default function Header() {
  const { theme, update } = usePreferenceStore()

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    update({ theme: next })
  }

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
        🍅 番茄钟
      </h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="切换主题"
        title="切换主题 (T)"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  )
}
