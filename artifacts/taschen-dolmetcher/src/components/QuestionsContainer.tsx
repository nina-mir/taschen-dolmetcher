import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { QuestionType, LanguageType } from '@/types';
import data from '@/assets/data/improved_data_deepseek_en_array.json';
import multipleChoiceData from '@/assets/data/multiple_choice_data_claude.json'
import mediaData from '@/assets/data/imagesData_local.json';
import textData from '@/assets/data/infoData.json';

import Question from '@/components/Question';
import MultiChoiceQuestion from '@/components/question/MultiChoiceQuestion';
import RoundProgress from '@/components/round/RoundProgress';
import RoundSummary, { ReviewEntry } from '@/components/round/RoundSummary';
import SolvedCard from '@/components/round/SolvedCard';

import knuthRandomizer from '@/utils/helpers'
import { loadGame, saveGame, Outcome } from '@/utils/savedGame'

interface QuestionsContainerProps {
  fromLanguage: LanguageType;
  toLanguage: LanguageType;
  qFormat: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  /** Resets the score and starts a fresh, reshuffled game. */
  onNewGame: () => void;
  /** Asks first, then starts a fresh game. */
  onStartOver: () => void;
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
 * - "Previous" looks back at earlier questions in the round. Answered ones
 *   are shown read-only; a skipped one can still be answered.
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
const QuestionsContainer = ({ fromLanguage, toLanguage, qFormat, onAnswer, onNewGame, onStartOver }: QuestionsContainerProps) => {
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
  // Step being looked back at with Previous; null on the current question
  const [viewStep, setViewStep] = useState<number | null>(null)
  const [revisitHadWrong, setRevisitHadWrong] = useState<boolean>(false)

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
    setViewStep(null)
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
    setViewStep(null)
    setShowSummary(false)
    scrollToTop()
  }

  // ---- Looking back ----
  const goPrevious = () => {
    setViewStep((viewStep ?? step) - 1)
    setSolved(false)
    setRevisitHadWrong(false)
    scrollToTop()
  }

  const goBackToCurrent = () => {
    setViewStep(null)
    setRevisitHadWrong(false)
    scrollToTop()
  }

  // Answering a skipped question found with Previous. It counts like any
  // answer: right first time if there was no wrong try.
  const handleRevisitAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect)
    if (viewStep === null) return
    const revisited = roundItems[viewStep]
    if (!isCorrect) {
      setRevisitHadWrong(true)
    } else {
      setOutcomes(prev => ({ ...prev, [revisited]: revisitHadWrong ? 'missed' : 'first' }))
    }
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
          onStartOver={onStartOver}
          shareMessage={`I got ${firstTry} of ${roundItems.length} right first time in ${isReview ? 'a review round' : `round ${roundNumber}`} of Taschen-Dolmetscher, a game built on a WW2 German-Russian phrasebook.`}
        />
      </div>
    )
  }

  // ---- One question ----
  const looking = viewStep !== null
  const shownStep = viewStep ?? step
  const shownPosition = roundItems[shownStep]
  const dataIdx = questionIndices[shownPosition]
  const shownOutcome = outcomes[shownPosition]
  const isAnswered = shownOutcome === 'first' || shownOutcome === 'missed'
  const isLastInRound = step === roundItems.length - 1
  // The current question counts as done once it has a right answer recorded
  const currentDone = outcomes[position] === 'first' || outcomes[position] === 'missed'

  // Answered questions are shown read-only, except the current one just
  // solved here, which stays as it is until Next.
  const showReadOnly = isAnswered && (looking || !solved)

  const shared = {
    id: shownStep + 1,
    de: data[dataIdx].de,
    en: data[dataIdx].en,
    ru: data[dataIdx].ru,
    phonetic: data[dataIdx].phonetic,
    fromLanguage,
    toLanguage,
    media: shuffledMediaData[shownPosition],
    info: shuffledTextData[shownPosition],
    onAnswer: looking ? handleRevisitAnswer : handleAnswer,
  }
  // A new key per round (and for a second try at a skipped one), so the card
  // starts fresh
  const cardKey = `${roundSerial}-${shownPosition}${looking ? '-again' : ''}`

  const secondaryLink =
    'min-h-11 px-2 font-gyst text-sm font-medium underline underline-offset-4 text-stone-700 dark:text-stone-300 cursor-pointer flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold'
  const primaryButton =
    'w-full min-h-13 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-gyst font-semibold flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold'

  return (
    <div ref={topRef} className="w-full flex flex-col items-center gap-4 scroll-mt-16">
      <RoundProgress
        label={isReview ? 'Review' : `Round ${roundNumber} of ${ROUND_COUNT}`}
        step={step}
        total={roundItems.length}
        viewing={viewStep}
      />

      {showReadOnly ? (
        <SolvedCard
          key={`${cardKey}-solved`}
          id={shownStep + 1}
          question={phraseIn(dataIdx, fromLanguage)}
          answer={phraseIn(dataIdx, toLanguage)}
          phonetic={toLanguage === 'ru' ? data[dataIdx].phonetic : null}
          media={shuffledMediaData[shownPosition]}
          info={shuffledTextData[shownPosition]}
        />
      ) : qFormat === 'choosing' ? (
        <MultiChoiceQuestion
          key={cardKey}
          {...shared}
          choices={multipleChoiceData[dataIdx][toLanguage]}
        />
      ) : (
        <Question key={cardKey} {...shared} />
      )}

      {looking && shownOutcome === 'skipped' && (
        <p className="w-[90%] font-garamond-pp text-xl">
          You skipped this one. Answer it now to see its photograph.
        </p>
      )}

      {/* relative + z-20 keeps the buttons clickable above the card (z-10) */}
      <div className="relative z-20 w-[90%] flex flex-col gap-2">
        {looking ? (
          <button type="button" onClick={goBackToCurrent} className={primaryButton}>
            Back to question {step + 1}
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : currentDone ? (
          <button type="button" onClick={advance} className={primaryButton}>
            {isLastInRound ? 'See how the round went' : 'Next question'}
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : null}

        <div className="flex justify-between">
          {shownStep > 0 ? (
            <button type="button" onClick={goPrevious} className={secondaryLink}>
              <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
              Previous
            </button>
          ) : <span />}
          {!looking && !currentDone && (
            <button type="button" onClick={handleSkip} className={secondaryLink}>
              Skip this one
            </button>
          )}
        </div>
      </div>
    </div>
  )
};

export default QuestionsContainer;
