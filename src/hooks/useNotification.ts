export function useNotification() {
  const requestPermission = async () => {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true
    const result = await Notification.requestPermission()
    return result === 'granted'
  }

  const notify = async (title: string, body?: string) => {
    const granted = await requestPermission()
    if (granted) {
      new Notification(title, { body, icon: '/favicon.svg' })
    }
  }

  return { notify, requestPermission }
}
