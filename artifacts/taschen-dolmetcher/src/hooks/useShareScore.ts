import { useState } from 'react'

const GAME_URL = 'https://nina-mir.github.io/taschen-dolmetcher/'

export function useShareScore(correct: number, incorrect: number, total: number) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const played = correct + incorrect
    const accuracy = played > 0 ? Math.round((correct / played) * 100) : 0
    const text = `I scored ${correct}/${total} (${accuracy}% accuracy) on Taschen-Dolmetscher — a WW2 German-Russian language learning game! 🎖️`

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'Taschen-Dolmetscher', text, url: GAME_URL })
      } else {
        await navigator.clipboard.writeText(`${text}\n${GAME_URL}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // user cancelled share or clipboard was unavailable
    }
  }

  return { handleShare, copied }
}
