import { useState } from 'react'

export const GAME_URL = 'https://nina-mir.github.io/taschen-dolmetcher/'

/**
 * Shares text with the game's link: the phone's share sheet where there is
 * one, otherwise the clipboard. Returns true when it copied to the clipboard,
 * so the caller can say "Copied".
 */
export async function shareText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title: 'Taschen-Dolmetscher', text, url: GAME_URL })
      return false
    }
    await navigator.clipboard.writeText(`${text}\n${GAME_URL}`)
    return true
  } catch {
    // user cancelled share or clipboard was unavailable
    return false
  }
}

export function useShareScore(correct: number, incorrect: number, total: number) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const played = correct + incorrect
    const accuracy = played > 0 ? Math.round((correct / played) * 100) : 0
    const text = `I scored ${correct}/${total} (${accuracy}% accuracy) on Taschen-Dolmetscher — a WW2 German-Russian language learning game! 🎖️`

    if (await shareText(text)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return { handleShare, copied }
}
