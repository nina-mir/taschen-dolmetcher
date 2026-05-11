import { useState, useEffect } from 'react'

const HS_KEY = 'taschen-dolmetcher-highscore'

export function useHighScore(current: number) {
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem(HS_KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  useEffect(() => {
    if (current > highScore) {
      setHighScore(current)
      localStorage.setItem(HS_KEY, String(current))
    }
  }, [current, highScore])

  return { highScore }
}
