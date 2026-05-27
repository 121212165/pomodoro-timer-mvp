import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TimerPage from './pages/TimerPage'
import StatsPage from './pages/StatsPage'
import SettingsPage from './pages/SettingsPage'
import Header from './components/layout/Header'
import BottomNav from './components/layout/BottomNav'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<TimerPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
