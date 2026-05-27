import { Timer, BarChart3, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/', icon: Timer, label: '计时' },
  { path: '/stats', icon: BarChart3, label: '统计' },
  { path: '/settings', icon: Settings, label: '设置' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      className="flex items-center justify-around py-2 border-t md:hidden"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      {tabs.map(({ path, icon: Icon, label }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors cursor-pointer ${active ? '' : 'opacity-50 hover:opacity-75'}`}
            style={{ color: active ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
