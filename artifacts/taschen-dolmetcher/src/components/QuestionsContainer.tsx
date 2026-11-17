import { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { QuestionType, LanguageType } from '@/types';
import data from '@/assets/data/improved_data_deepseek_en_array.json';
import multipleChoiceData from '@/assets/data/multiple_choice_data_claude.json'
import mediaData from '@/assets/data/imagesData_local.json';
import textData from '@/assets/data/infoData.json';

import Question from '@/components/Question';
import MultiChoiceQuestion from '@/components/question/MultiChoiceQuestion';
import RoundProgress from '@/components/round/RoundProgress';
import RoundSummary, { ReviewEntry } from '@/components/round/RoundSummary';

import knuthRandomizer from '@/utils/helpers'
import { loadGame, saveGame, Outcome } from '@/utils/savedGame'

interface QuestionsContainerProps {
  fromLanguage: LanguageType;
  toLanguage: LanguageType;
  qFormat: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  /** Resets the score and starts a fresh, reshuffled game. */
  onNewGame: () => void;
}

const TOTAL = data.length
const ROUND_SIZE = 10
const ROUND_COUNT = Math.ceil(TOTAL / ROUND_SIZE)

const SIZES = { questions: TOTAL, media: mediaData.length, texts: textData.length }

const indices = (n: number) => Array.from({ length: n }, (_, i) => i)
const firstRound = (start: number) =>
  Array.from({ length: Math.min(ROUND_SIZE, TOTAL - start) }, (_, i) => start + i)

/**
 * The game to start from: the saved one if there is one, else a fresh shuffle.
 * A card already answered before a reload is not asked again; play resumes
 * at the next one.
 */
function initialGame() {
  const saved = loadGame(SIZES)
  if (saved) {
    const answered = !saved.showSummary && saved.roundItems[saved.step] in saved.outcomes
    if (answered) {
      const last = saved.step + 1 >= saved.roundItems.length
      return { ...saved, step: last ? saved.step : saved.step + 1, showSummary: last }
    }
    return saved
  }
  return {
    questionOrder: knuthRandomizer(indices(SIZES.questions)) as number[],
    mediaOrder: knuthRandomizer(indices(SIZES.media)) as number[],
    textOrder: knuthRandomizer(indices(SIZES.texts)) as number[],
    roundNumber: 1,
    isReview: false,
    roundItems: firstRound(0),
    nextDeckStart: Math.min(ROUND_SIZE, TOTAL),
    step: 0,
    outcomes: {} as Record<number, Outcome>,
    showSummary: false,
  }
}

function phraseIn(dataIdx: number, language: LanguageType): string {
  const entry = data[dataIdx]
  if (language === 'en') return entry.en[0]
  return language === 'ru' ? entry.ru : entry.de
}

/**
 * Plays the deck in rounds of 10, one question at a time.
 *
 * - "Skip this one" moves on without answering.
 * - Once the answer is correct, "Next question" appears under the card.
 * - After each round, a summary lists the phrases to review: those skipped
 *   or got right only after a wrong try. They can be retried as a review
 *   round before the next round.
 *
 * Positions below are positions in the shuffled deck (0 to 73). Each phrase's
 * photo and reading are tied to its position, so a retried phrase comes back
 * with the same photo and reading.
 *
 * Progress is saved in the browser after every step (see utils/savedGame.ts).
 */
const QuestionsContainer = ({ fromLanguage, toLanguage, qFormat, onAnswer, onNewGame }: QuestionsContainerProps) => {
  const [start] = useState(initialGame)

  // Shuffled once per game. The question order keeps data + multipleChoiceData
  // in sync; media and info are independent, so they are shuffled separately.
  const questionIndices = start.questionOrder
  const [shuffledMediaData] = useState(() => start.mediaOrder.map(i => mediaData[i]))
  const [shuffledTextData] = useState(() => start.textOrder.map(i => textData[i]))

  const [roundNumber, setRoundNumber] = useState<number>(start.roundNumber)    // fresh rounds played
  const [roundSerial, setRoundSerial] = useState<number>(0)                    // every round, review included
  const [isReview, setIsReview] = useState<boolean>(start.isReview)
  const [roundItems, setRoundItems] = useState<number[]>(start.roundItems)
  const [nextDeckStart, setNextDeckStart] = useState<number>(start.nextDeckStart)
  const [step, setStep] = useState<number>(start.step)
  const [outcomes, setOutcomes] = useState<Record<number, Outcome>>(start.outcomes)
  const [hadWrong, setHadWrong] = useState<boolean>(false)                     // wrong try on the card on screen
  const [solved, setSolved] = useState<boolean>(false)
  const [showSummary, setShowSummary] = useState<boolean>(start.showSummary)

  // Save after every change, so a reload resumes here
  useEffect(() => {
    saveGame({
      version: 1,
      sizes: SIZES,
      questionOrder: start.questionOrder,
      mediaOrder: start.mediaOrder,
      textOrder: start.textOrder,
      roundNumber,
      isReview,
      roundItems,
      nextDeckStart,
      step,
      outcomes,
      showSummary,
    })
  }, [start, roundNumber, isReview, roundItems, nextDeckStart, step, outcomes, showSummary])

  const topRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }

  // Changing language or answer format resets the card on screen, so it is
  // no longer solved. Its recorded outcome stays.
  useEffect(() => {
    setSolved(false)
  }, [fromLanguage, toLanguage, qFormat])

  const position = roundItems[step]

  const record = (outcome: Outcome) => {
    setOutcomes(prev => (position in prev ? prev : { ...prev, [position]: outcome }))
  }

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect)
    if (!isCorrect) {
      setHadWrong(true)
    } else if (!solved) {
      setSolved(true)
      record(hadWrong ? 'missed' : 'first')
    }
  }

  const advance = () => {
    setSolved(false)
    setHadWrong(false)
    if (step + 1 < roundItems.length) {
      setStep(step + 1)
    } else {
      setShowSummary(true)
    }
    scrollToTop()
  }

  const handleSkip = () => {
    record('skipped')
    advance()
  }

  const startRound = (items: number[], review: boolean) => {
    setRoundItems(items)
    setIsReview(review)
    setRoundSerial(prev => prev + 1)
    setStep(0)
    setOutcomes({})
    setSolved(false)
    setHadWrong(false)
    setShowSummary(false)
    scrollToTop()
  }

  const handleNextRound = () => {
    startRound(firstRound(nextDeckStart), false)
    setNextDeckStart(Math.min(nextDeckStart + ROUND_SIZE, TOTAL))
    setRoundNumber(prev => prev + 1)
  }

  const toReviewPositions = roundItems.filter(p => outcomes[p] && outcomes[p] !== 'first')

  // ---- End of a round ----
  if (showSummary) {
    const firstTry = roundItems.filter(p => outcomes[p] === 'first').length
    const toReview: ReviewEntry[] = toReviewPositions.map(p => ({
      phrase: phraseIn(questionIndices[p], fromLanguage),
      answer: phraseIn(questionIndices[p], toLanguage),
      outcome: outcomes[p] === 'skipped' ? 'skipped' : 'missed',
    }))
    const title = isReview ? 'Review complete' : `Round ${roundNumber} of ${ROUND_COUNT} complete`

    return (
      <div ref={topRef} className="w-full flex flex-col items-center scroll-mt-16">
        <RoundSummary
          title={title}
          firstTry={firstTry}
          total={roundItems.length}
          toReview={toReview}
          deckFinished={nextDeckStart >= TOTAL}
          deckSize={TOTAL}
          phrasesSeen={nextDeckStart}
          onNextRound={handleNextRound}
          onRetry={() => startRound(toReviewPositions, true)}
          onPlayAgain={onNewGame}
          shareMessage={`I got ${firstTry} of ${roundItems.length} right first time in ${isReview ? 'a review round' : `round ${roundNumber}`} of Taschen-Dolmetscher, a game built on a WW2 German-Russian phrasebook.`}
        />
      </div>
    )
  }

  // ---- One question ----
  const dataIdx = questionIndices[position]
  const isLastInRound = step === roundItems.length - 1

  const shared = {
    id: step + 1,
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
  // A new key per round, so a retried phrase starts as a fresh card
  const cardKey = `${roundSerial}-${position}`

  return (
    <div ref={topRef} className="w-full flex flex-col items-center gap-4 scroll-mt-16">
      <RoundProgress
        label={isReview ? 'Review' : `Round ${roundNumber} of ${ROUND_COUNT}`}
        step={step}
        total={roundItems.length}
      />

      {qFormat === 'choosing' ? (
        <MultiChoiceQuestion
          key={cardKey}
          {...shared}
          choices={multipleChoiceData[dataIdx][toLanguage]}
        />
      ) : (
        <Question key={cardKey} {...shared} />
      )}

      {/* relative + z-20 keeps the buttons clickable above the card (z-10) */}
      <div className="relative z-20 w-[90%] flex justify-end">
        {solved ? (
          <button
            type="button"
            onClick={advance}
            className="w-full min-h-13 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-gyst font-semibold flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
          >
            {isLastInRound ? 'See how the round went' : 'Next question'}
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
