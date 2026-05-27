interface SessionDotProps {
  status: 'pending' | 'active' | 'done'
}

export default function SessionDot({ status }: SessionDotProps) {
  const colors = {
    pending: 'var(--color-ring-track)',
    active: 'var(--color-focus)',
    done: 'var(--color-focus)',
  }
  return (
    <span
      className={`inline-block w-3 h-3 rounded-full transition-colors ${
        status === 'active' ? 'animate-pulse-ring' : ''
      }`}
      style={{ backgroundColor: colors[status], opacity: status === 'pending' ? 0.4 : 1 }}
    />
  )
}
