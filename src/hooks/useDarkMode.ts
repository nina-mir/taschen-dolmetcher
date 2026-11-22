import { useState, useEffect } from 'react'

const DM_KEY = 'taschen-dolmetcher-darkmode'

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem(DM_KEY) === 'true'
  })

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem(DM_KEY, String(isDark))
  }, [isDark])

  const toggleDark = () => setIsDark(prev => !prev)

  return { isDark, toggleDark }
}
