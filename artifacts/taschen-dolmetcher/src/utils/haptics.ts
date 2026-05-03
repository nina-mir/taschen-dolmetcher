const HAPTIC_KEY = 'taschen-dolmetcher-haptic'

export const isHapticEnabled = (): boolean =>
  localStorage.getItem(HAPTIC_KEY) !== 'false'

export const toggleHaptic = (): boolean => {
  const next = !isHapticEnabled()
  localStorage.setItem(HAPTIC_KEY, String(next))
  return next
}

const vibrate = (pattern: number | number[]) => {
  if (isHapticEnabled() && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export const hapticCorrect = () => vibrate(50)
export const hapticWrong   = () => vibrate([80, 40, 80])
