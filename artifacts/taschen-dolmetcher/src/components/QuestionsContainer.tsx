import { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { QuestionType, LanguageType } from '@/types';
import data from '@/assets/data/improved_data_deepseek_en_array.json';
import multipleChoiceData from '@/assets/data/multiple_choice_data_claude.json'
import mediaData from '@/assets/data/imagesData_local.json';
import textData from '@/assets/data/infoData.json';

import Question from '@/components/Question';
import MultiChoiceQuestion from '@/components/question/MultiChoiceQuestion';

import knuthRandomizer from '@/utils/helpers'

interface QuestionsContainerProps {
  fromLanguage: LanguageType;
  toLanguage: LanguageType;
  qFormat: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  /** Resets the score and starts a fresh, reshuffled run. */
  onNewGame: () => void;
}

const TOTAL = data.length

/**
 * Shows the deck one question at a time.
 *
 * - "Skip this one" moves on without answering.
 * - Once the answer is correct, "Next question" appears under the card.
 * - After the last question, a short end screen offers to play again.
 */
const QuestionsContainer = ({ fromLanguage, toLanguage, qFormat, onAnswer, onNewGame }: QuestionsContainerProps) => {
  // Shuffled once per run. Question indices keep data + multipleChoiceData in
  // sync; media and info are independent, so they are shuffled separately.
  const [questionIndices] = useState<number[]>(() => knuthRandomizer(data.map((_, i) => i)))
  const [shuffledMediaData] = useState(() => knuthRandomizer([...mediaData]))
  const [shuffledTextData] = useState(() => knuthRandomizer([...textData]))

  const [position, setPosition] = useState<number>(0)   // which question is on screen
  const [solved, setSolved] = useState<boolean>(false)  // is the current one answered correctly?
  const [solvedCount, setSolvedCount] = useState<number>(0)
  // Last position counted as solved, so re-solving the same card after a
  // language or format switch is not counted twice in the end summary.
  const [lastCounted, setLastCounted] = useState<number>(-1)
  const [skippedCount, setSkippedCount] = useState<number>(0)

  const topRef = useRef<HTMLDivElement>(null)

  // Changing language or answer format resets the card on screen, so it is
  // no longer solved.
  useEffect(() => {
    setSolved(false)
  }, [fromLanguage, toLanguage, qFormat])

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect)
    if (isCorrect && !solved) {
      setSolved(true)
      if (lastCounted !== position) {
        setLastCounted(position)
        setSolvedCount(prev => prev + 1)
      }
    }
  }

  const goToNext = () => {
    setPosition(prev => prev + 1)
    setSolved(false)
    // Bring the top of the new card into view, below the fixed nav bar
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }

  const handleSkip = () => {
    setSkippedCount(prev => prev + 1)
    goToNext()
  }

  // ---- End of the deck ----
  if (position >= TOTAL) {
    return (
      <div ref={topRef} className="w-full flex flex-col items-center scroll-mt-16">
        <div className="w-[90%] rounded-xl border px-6 py-10 text-center flex flex-col items-center gap-4">
          <h2 className="font-gyst text-2xl font-semibold">That was the last phrase.</h2>
          <p className="font-garamond-pp text-2xl">
            You answered {solvedCount} of {TOTAL} correctly
            {skippedCount > 0 && <> and skipped {skippedCount}</>}.
          </p>
          <button
            type="button"
            onClick={onNewGame}
            className="mt-2 min-h-12 px-6 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-gyst font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
          >
            Play again
          </button>
          <a href="#/archive" className="font-garamond-pp text-xl underline underline-offset-4">
            Visit the Archive
          </a>
        </div>
      </div>
    )
  }

  // ---- One question ----
  const dataIdx = questionIndices[position]
  const isLast = position === TOTAL - 1

  const shared = {
    id: position + 1,
    de: data[dataIdx].de,
    en: data[dataIdx].en,
    ru: data[dataIdx].ru,
    phonetic: data[dataIdx].phonetic,
    fromLanguage,
    toLanguage,
    media: shuffledMediaData[position],
    info: shuffledTextData[position],
    onAnswer: handleAnswer,
  }

  return (
    <div ref={topRef} className="w-full flex flex-col items-center gap-3 scroll-mt-16">
      <p
        className="w-[90%] font-gyst text-sm font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400"
        aria-live="polite"
      >
        Question {position + 1} of {TOTAL}
      </p>

      {qFormat === 'choosing' ? (
        <MultiChoiceQuestion
          key={dataIdx}
          {...shared}
          choices={multipleChoiceData[dataIdx][toLanguage]}
        />
      ) : (
        <Question key={dataIdx} {...shared} />
      )}

      {/* relative + z-20 keeps the buttons clickable above the card (z-10) */}
      <div className="relative z-20 w-[90%] flex justify-end">
        {solved ? (
          <button
            type="button"
            onClick={goToNext}
            className="w-full min-h-13 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-gyst font-semibold flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
          >
            {isLast ? 'Finish' : 'Next question'}
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSkip}
            className="min-h-11 px-2 font-gyst text-sm font-medium underline underline-offset-4 text-stone-700 dark:text-stone-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
          >
            Skip this one
          </button>
        )}
      </div>
    </div>
  )
};

export default QuestionsContainer;
