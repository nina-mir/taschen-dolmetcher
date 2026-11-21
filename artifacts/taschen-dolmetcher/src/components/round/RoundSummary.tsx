import { useState } from 'react'
import { shareText } from '@/hooks/useShareScore'

export interface ReviewEntry {
  /** The phrase as it was asked. */
  phrase: string;
  /** Its translation in the answer language. */
  answer: string;
  outcome: 'missed' | 'skipped';
}

interface RoundSummaryProps {
  /** e.g. "Round 3 of 8 complete" or "Review complete" */
  title: string;
  /** Questions answered right on the first try. */
  firstTry: number;
  total: number;
  toReview: ReviewEntry[];
  /** True once every phrase in the deck has been through a round. */
  deckFinished: boolean;
  deckSize: number;
  /** Phrases that have come up in a round so far this game. */
  phrasesSeen: number;
  onNextRound: () => void;
  onRetry: () => void;
  onPlayAgain: () => void;
  /** Asks, then starts a fresh game. */
  onStartOver: () => void;
  /** Text shared by "Share my score". */
  shareMessage: string;
}

const primaryButton =
  'min-h-13 w-full rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-gyst font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold'
const secondaryButton =
  'min-h-13 w-full rounded-md border-2 border-stone-900 dark:border-stone-100 font-gyst font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold'

/** The screen shown at the end of each round. */
const RoundSummary: React.FC<RoundSummaryProps> = ({
  title,
  firstTry,
  total,
  toReview,
  deckFinished,
  deckSize,
  phrasesSeen,
  onNextRound,
  onRetry,
  onPlayAgain,
  onStartOver,
  shareMessage,
}) => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const didCopy = await shareText(shareMessage)
    if (didCopy) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section
      aria-labelledby="round-summary-title"
      className="w-[90%] max-w-2xl flex flex-col gap-8 py-2"
    >
      <div className="flex flex-col gap-1">
        <h2
          id="round-summary-title"
          className="font-gyst text-sm font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400"
        >
          {title}
        </h2>
        <p className="flex items-baseline gap-3 font-garamond-pp">
          <span className="text-7xl leading-none">{firstTry}</span>
          <span className="text-2xl text-stone-700 dark:text-stone-300">
            of {total} right first time
          </span>
        </p>
      </div>

      {toReview.length > 0 ? (
        <div>
          <h3 className="mb-2 font-gyst text-sm font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
            To review
          </h3>
          <ul className="list-none p-0">
            {toReview.map((entry) => (
              <li
                key={entry.phrase}
                className="flex flex-col gap-0.5 border-t border-stone-400 py-3 dark:border-stone-600"
              >
                <span className="font-gyst font-semibold">{entry.phrase}</span>
                <span className="font-garamond-pp text-xl">{entry.answer}</span>
                <span className="font-gyst text-xs font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  {entry.outcome === 'skipped' ? 'Skipped' : 'Missed'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="font-garamond-pp text-xl">Nothing to review. Every phrase right first time.</p>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-garamond-pp text-xl">
          <span>Phrases seen</span>
          <span>{phrasesSeen} of {deckSize}</span>
        </div>
        <div
          className="h-2 rounded-full bg-stone-400 dark:bg-stone-600"
          role="progressbar"
          aria-label="Phrases seen"
          aria-valuemin={0}
          aria-valuemax={deckSize}
          aria-valuenow={phrasesSeen}
        >
          <div
            className="h-2 rounded-full bg-red-600"
            style={{ width: `${(phrasesSeen / deckSize) * 100}%` }}
          />
        </div>
        {deckFinished && (
          <p className="mt-2 font-garamond-pp text-xl">
            That was the last of the {deckSize} phrases.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {deckFinished ? (
          <button type="button" onClick={onPlayAgain} className={primaryButton}>
            Play again
          </button>
        ) : (
          <button type="button" onClick={onNextRound} className={primaryButton}>
            Next round
          </button>
        )}
        {toReview.length > 0 && (
          <button type="button" onClick={onRetry} className={secondaryButton}>
            Retry the {toReview.length === 1 ? 'one' : toReview.length} to review
          </button>
        )}
        <button
          type="button"
          onClick={handleShare}
          className="min-h-11 font-gyst text-sm font-medium underline underline-offset-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
        >
          {copied ? 'Copied to clipboard' : 'Share my score'}
        </button>
        {!deckFinished && (
          <button
            type="button"
            onClick={onStartOver}
            className="min-h-11 font-gyst text-sm font-medium underline underline-offset-4 text-stone-700 dark:text-stone-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
          >
            Start a new game
          </button>
        )}
        {deckFinished && (
          <a href="#/archive" className="self-center min-h-11 flex items-center font-garamond-pp text-xl underline underline-offset-4">
            Visit the Archive
          </a>
        )}
      </div>
    </section>
  )
}

export default RoundSummary
