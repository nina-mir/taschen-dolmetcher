import { QuestionType, LanguageType } from '@/types';
import Header from './components/Header'
import QuestionsContainer from './components/QuestionsContainer';
import LanguageSelector from './components/LanguageSelector'
import { NavigationMenuDemo } from './components/Navbar'
import ToggleQuestionType from './components/QuestionsFormat'
import ScoreTracker from './components/ScoreTracker'
import Footer from './components/Footer';

import { StarFilledIcon, CornersIcon } from "@radix-ui/react-icons"
import { useState } from 'react'
import data from '@/assets/data/improved_data_deepseek_en_array.json'

const TOTAL_QUESTIONS = data.length

function makeInstruction(from: LanguageType, to: LanguageType): string {
  switch (from) {
    case 'de':
      return `Schreiben Sie die richtige Übersetzung in ${to}!`
    case 'en':
      return `Write the correct translation in ${to}`
    case 'ru':
      return `Напишите правильный перевод в ${to}`
    default:
      return `Etwas ist kaput!! Refresh, пожалуйста!`
  }
}


function App() {
  const [fromLanguage, setFromLanguage] = useState<LanguageType>('de')
  const [toLanguage, setToLanguage] = useState<LanguageType>('en')
  const [okayChoices, setOkayChoices] = useState<boolean>(true)
  const [qFormat, setQFormat] = useState<QuestionType>('choosing')
  const [correct, setCorrect] = useState<number>(0)
  const [incorrect, setIncorrect] = useState<number>(0)
  const [gameKey, setGameKey] = useState<number>(0)

  const handleLanguageChange = (from: LanguageType, to: LanguageType) => {
    if (from !== to) {
      setFromLanguage(from)
      setToLanguage(to)
      setOkayChoices(true)
    } else {
      setOkayChoices(false)
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrect(prev => prev + 1)
    } else {
      setIncorrect(prev => prev + 1)
    }
  }

  const handleNewGame = () => {
    setCorrect(0)
    setIncorrect(0)
    setGameKey(prev => prev + 1)
  }

  const progressPct = (Math.min(correct, TOTAL_QUESTIONS) / TOTAL_QUESTIONS) * 100

  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationMenuDemo
          correct={correct}
          incorrect={incorrect}
          onNewGame={handleNewGame}
        />
        {/* Progress bar */}
        <div className="w-full h-1 bg-stone-300/60">
          <div
            className="h-full bg-red-600 transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
            role="progressbar"
            aria-valuenow={correct}
            aria-valuemin={0}
            aria-valuemax={TOTAL_QUESTIONS}
            aria-label={`${correct} of ${TOTAL_QUESTIONS} questions answered correctly`}
          />
        </div>
      </div>

      <Header />

      <div className="flex flex-col items-center gap-[1rem]">
        <div className='w-full flex flex-col items-center -gap-5'>
          <LanguageSelector
            initialFrom={fromLanguage}
            initialTo={toLanguage}
            onLanguageChange={handleLanguageChange}
          />
          <ToggleQuestionType initialType={qFormat} onTypeChange={setQFormat} />
        </div>

        <div className='
          flex
          items-center
          gap-[3px]
          font-garamond-pp
          text-xl
          text-center
          text-wrap
        '>
          <StarFilledIcon className='w-6 h-6 inline-block text-red-600' />
          {okayChoices && <p>{makeInstruction(fromLanguage, toLanguage)}</p>}
        </div>

        {okayChoices && (
          <QuestionsContainer
            key={gameKey}
            toLanguage={toLanguage}
            fromLanguage={fromLanguage}
            qFormat={qFormat}
            onAnswer={handleAnswer}
          />
        )}

        {!okayChoices && (
          <div className='flex flex-col items-center text-center text-xl gap-3 mt-10 w-[80%] font-mono'>
            <div className='flex items-start'>
              <CornersIcon className='w-6 h-6 inline-block text-red-600' />
              <span>Выбранные языки должны быть разными!</span>
            </div>
            <div className='flex items-start'>
              <CornersIcon className='w-4 h-4 inline-block text-red-600' />
              <span>Your selected languages need to be different!</span>
            </div>
            <div className='flex items-start'>
              <CornersIcon className='w-2 h-2 inline-block text-red-600' />
              <span>Ihre ausgewählten Sprachen müssen unterschiedlich sein!</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col mt-10">
        <p className="font-semibold bg-pink-400 w-full p-4 font-gyst inline-block align-bottom text-stone-900 text-2xl text-center">
          In memory &amp; admiration of Vasily Grossman, Ilya Ehrenburg, and countless other poets fighting fascism.
        </p>
        <Footer />
      </div>

      <ScoreTracker
        correct={correct}
        incorrect={incorrect}
        variant="mobile-banner"
        onNewGame={handleNewGame}
      />
    </div>
  )
}

export default App
