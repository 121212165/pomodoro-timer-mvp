let interval: ReturnType<typeof setInterval> | null = null
let remaining = 0

self.onmessage = (e: MessageEvent<{ type: string; duration?: number }>) => {
  const { type, duration } = e.data

  if (type === 'start' && duration != null) {
    if (interval) clearInterval(interval)
    remaining = duration
    self.postMessage({ type: 'tick', remaining })
    interval = setInterval(() => {
      remaining -= 1
      if (remaining <= 0) {
        remaining = 0
        if (interval) clearInterval(interval)
        interval = null
        self.postMessage({ type: 'tick', remaining: 0 })
        self.postMessage({ type: 'complete' })
      } else {
        self.postMessage({ type: 'tick', remaining })
      }
    }, 1000)
  }

  if (type === 'stop') {
    if (interval) clearInterval(interval)
    interval = null
    remaining = 0
  }
}
