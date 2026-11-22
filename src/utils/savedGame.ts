/**
 * Saves the game in progress in the browser (localStorage), so a reload or
 * a return visit carries on where the player left off. Nothing leaves the
 * device.
 *
 * Positions are positions in the shuffled deck. The photo and reading orders
 * are saved as index lists into imagesData_local.json and infoData.json.
 */

const GAME_KEY = 'taschen-dolmetcher-game'
const SCORE_KEY = 'taschen-dolmetcher-score'
const SETTINGS_KEY = 'taschen-dolmetcher-settings'
const VERSION = 1

export type Outcome = 'first' | 'missed' | 'skipped'

export interface SavedGame {
  version: number;
  /** Sizes of the data files when saved; a change discards the save. */
  sizes: { questions: number; media: number; texts: number };
  questionOrder: number[];
  mediaOrder: number[];
  textOrder: number[];
  roundNumber: number;
  isReview: boolean;
  roundItems: number[];
  nextDeckStart: number;
  step: number;
  outcomes: Record<number, Outcome>;
  showSummary: boolean;
}

export interface SavedScore {
  correct: number;
  incorrect: number;
}

function isPermutation(list: unknown, length: number): list is number[] {
  return (
    Array.isArray(list) &&
    list.length === length &&
    new Set(list).size === length &&
    list.every((n) => Number.isInteger(n) && n >= 0 && n < length)
  )
}

/** The saved game, or null if there is none or it no longer fits the data. */
export function loadGame(sizes: SavedGame['sizes']): SavedGame | null {
  try {
    const raw = localStorage.getItem(GAME_KEY)
    if (!raw) return null
    const g = JSON.parse(raw) as SavedGame
    const ok =
      g.version === VERSION &&
      g.sizes?.questions === sizes.questions &&
      g.sizes?.media === sizes.media &&
      g.sizes?.texts === sizes.texts &&
      isPermutation(g.questionOrder, sizes.questions) &&
      isPermutation(g.mediaOrder, sizes.media) &&
      isPermutation(g.textOrder, sizes.texts) &&
      Array.isArray(g.roundItems) &&
      g.roundItems.length > 0 &&
      g.roundItems.every((p) => Number.isInteger(p) && p >= 0 && p < sizes.questions) &&
      Number.isInteger(g.step) && g.step >= 0 && g.step < g.roundItems.length &&
      Number.isInteger(g.nextDeckStart) && g.nextDeckStart >= 0 && g.nextDeckStart <= sizes.questions &&
      Number.isInteger(g.roundNumber) && g.roundNumber >= 1 &&
      typeof g.outcomes === 'object' && g.outcomes !== null
    return ok ? g : null
  } catch {
    return null
  }
}

export function saveGame(game: SavedGame): void {
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(game))
  } catch {
    // storage full or blocked: the game still works, it just won't resume
  }
}

export function loadScore(): SavedScore {
  try {
    const s = JSON.parse(localStorage.getItem(SCORE_KEY) ?? '') as SavedScore
    if (Number.isInteger(s.correct) && Number.isInteger(s.incorrect)) return s
  } catch {
    // no saved score
  }
  return { correct: 0, incorrect: 0 }
}

export function saveScore(score: SavedScore): void {
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(score))
  } catch {
    // ignore
  }
}

/** Forget the game in progress and its score (the high score is kept). */
export function clearSavedGame(): void {
  try {
    localStorage.removeItem(GAME_KEY)
    localStorage.removeItem(SCORE_KEY)
  } catch {
    // ignore
  }
}

export interface SavedSettings {
  from: 'de' | 'en' | 'ru';
  to: 'de' | 'en' | 'ru';
  format: 'choosing' | 'typing';
}

const LANGUAGES = ['de', 'en', 'ru']

/** The language pair and answer format last used (kept across new games). */
export function loadSettings(): SavedSettings {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '') as SavedSettings
    if (
      LANGUAGES.includes(s.from) &&
      LANGUAGES.includes(s.to) &&
      s.from !== s.to &&
      (s.format === 'choosing' || s.format === 'typing')
    ) {
      return s
    }
  } catch {
    // no saved settings
  }
  return { from: 'de', to: 'en', format: 'choosing' }
}

export function saveSettings(settings: SavedSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}
