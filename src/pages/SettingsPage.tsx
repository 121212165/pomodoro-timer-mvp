import { usePreferenceStore } from '../store/preferenceStore'
import { useTimerStore } from '../store/timerStore'
import type { UserPreferences } from '../types'

function NumberInput({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <label className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
        className="w-20 text-right px-3 py-1.5 rounded-lg text-sm border outline-none focus:ring-2"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        }}
      />
    </label>
  )
}

export default function SettingsPage() {
  const prefs = usePreferenceStore()
  const clearHistory = useTimerStore((s) => s.clearHistory)

  const updatePref = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    prefs.update({ [key]: value })
  }

  return (
    <div className="w-full max-w-sm space-y-6 py-4">
      <h2 className="text-lg font-semibold">设置</h2>

      <section
        className="rounded-xl p-4 divide-y"
        style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', borderColor: 'var(--color-border)' }}
      >
        <NumberInput label="专注时长 (分钟)" value={prefs.focusMinutes} onChange={(v) => updatePref('focusMinutes', v)} min={1} max={90} />
        <NumberInput label="短休息 (分钟)" value={prefs.shortBreakMinutes} onChange={(v) => updatePref('shortBreakMinutes', v)} min={1} max={30} />
        <NumberInput label="长休息 (分钟)" value={prefs.longBreakMinutes} onChange={(v) => updatePref('longBreakMinutes', v)} min={1} max={60} />
        <NumberInput label="长休息间隔 (番茄数)" value={prefs.longBreakInterval} onChange={(v) => updatePref('longBreakInterval', v)} min={2} max={10} />
      </section>

      <section
        className="rounded-xl p-4 space-y-3"
        style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
      >
        <label className="flex items-center justify-between">
          <span className="text-sm">声音提醒</span>
          <input
            type="checkbox"
            checked={prefs.soundEnabled}
            onChange={(e) => updatePref('soundEnabled', e.target.checked)}
            className="w-5 h-5 accent-[var(--color-primary)] cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-sm">自动开始休息</span>
          <input
            type="checkbox"
            checked={prefs.autoStartBreak}
            onChange={(e) => updatePref('autoStartBreak', e.target.checked)}
            className="w-5 h-5 accent-[var(--color-primary)] cursor-pointer"
          />
        </label>
      </section>

      <section className="space-y-2">
        <button
          onClick={() => prefs.resetDefaults()}
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80 cursor-pointer"
          style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
        >
          恢复默认设置
        </button>
        <button
          onClick={() => { if (confirm('确定清除所有历史记录？')) clearHistory() }}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          style={{ border: '1px solid var(--color-border)' }}
        >
          清除历史记录
        </button>
      </section>
    </div>
  )
}
