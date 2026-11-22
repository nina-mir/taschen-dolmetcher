import { QuestionType, LanguageType } from '@/types';
import Header from './components/Header'
import QuestionsContainer from './components/QuestionsContainer';
import LanguageSelector from './components/LanguageSelector'
import { NavigationMenuDemo } from './components/Navbar'
import ToggleQuestionType from './components/QuestionsFormat'
import ScoreTracker from './components/ScoreTracker'
import Footer from './components/Footer';
import Archive from './components/archive/Archive';
import Sources from './components/sources/Sources';
import { DarkModeProvider } from './contexts/DarkModeContext'

import { StarFilledIcon, CornersIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from 'react'
import data from '@/assets/data/improved_data_deepseek_en_array.json'
import { useHighScore } from './hooks/useHighScore'
import { useDarkMode } from './hooks/useDarkMode'
import { useShareScore } from './hooks/useShareScore'
import { useHashRoute } from './hooks/useHashRoute'
import { loadScore, saveScore, clearSavedGame, loadSettings, saveSettings } from './utils/savedGame'
import StartOverDialog from './components/StartOverDialog'

const TOTAL_QUESTIONS = data.length

// Language names as they read after "into" in each instruction language
const INTO: Record<LanguageType, Record<LanguageType, string>> = {
  de: { de: 'ins Deutsche', en: 'ins Englische', ru: 'ins Russische' },
  en: { de: 'into German', en: 'into English', ru: 'into Russian' },
  ru: { de: 'на немецкий', en: 'на английский', ru: 'на русский' },
}

/** The instruction above the questions, in the language being asked. */
function makeInstruction(from: LanguageType, to: LanguageType, format: QuestionType): string {
  const into = INTO[from][to]
  const choosing = format === 'choosing'
  switch (from) {
    case 'de':
      return choosing
        ? `Wählen Sie die richtige Übersetzung ${into}!`
        : `Schreiben Sie die richtige Übersetzung ${into}!`
    case 'en':
      return choosing
        ? `Choose the correct translation ${into}.`
        : `Write the correct translation ${into}.`
    case 'ru':
      return choosing
        ? `Выберите правильный перевод ${into}!`
        : `Напишите правильный перевод ${into}!`
    default:
      return `Etwas ist kaput!! Refresh, пожалуйста!`
  }
}

function App() {
  // Language pair and answer format are remembered between visits
  const [savedSettings] = useState(loadSettings)
  const [fromLanguage, setFromLanguage] = useState<LanguageType>(savedSettings.from)
  const [toLanguage, setToLanguage] = useState<LanguageType>(savedSettings.to)
  const [okayChoices, setOkayChoices] = useState<boolean>(true)
  const [qFormat, setQFormat] = useState<QuestionType>(savedSettings.format)
  const [confirmingStartOver, setConfirmingStartOver] = useState<boolean>(false)
  // The score of the game in progress is restored after a reload
  const [correct, setCorrect] = useState<number>(() => loadScore().correct)
  const [incorrect, setIncorrect] = useState<number>(() => loadScore().incorrect)
  const [gameKey, setGameKey] = useState<number>(0)

  const { highScore } = useHighScore(correct)
  const { isDark, toggleDark } = useDarkMode()
  const route = useHashRoute()
  const showArchive = route === 'archive'
  const showSources = route === 'sources'
  const onGamePage = route === 'game'

  // On phones the score bar slides away while the footer is on screen, so it
  // never covers the footer and the copyright can be the last line.
  const [footerInView, setFooterInView] = useState<boolean>(false)
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])
  const { handleShare, copied } = useShareScore(correct, incorrect, TOTAL_QUESTIONS)

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

  useEffect(() => {
    saveScore({ correct, incorrect })
  }, [correct, incorrect])

  useEffect(() => {
    saveSettings({ from: fromLanguage, to: toLanguage, format: qFormat })
  }, [fromLanguage, toLanguage, qFormat])

  const handleNewGame = () => {
    // Forget the saved game first, so the fresh one starts from a new shuffle
    clearSavedGame()
    setCorrect(0)
    setIncorrect(0)
    setGameKey(prev => prev + 1)
  }

  // The reset buttons ask first, unless nothing has been answered yet
  const requestNewGame = () => {
    if (correct + incorrect === 0) {
      handleNewGame()
    } else {
      setConfirmingStartOver(true)
    }
  }

  return (
    <DarkModeProvider value={isDark}>
      <div className="w-full">
        <div className="fixed top-0 left-0 right-0 z-50">
          <NavigationMenuDemo
            correct={correct}
            incorrect={incorrect}
            onNewGame={requestNewGame}
            isDark={isDark}
            onDarkToggle={toggleDark}
            onShare={handleShare}
            copied={copied}
            route={route}
          />
        </div>

        {showArchive && <Archive />}
        {showSources && <Sources />}

        {/* The game stays mounted while another page is open, so answers and
            score are still there when the player comes back. */}
        <div className={onGamePage ? 'relative overflow-x-clip' : 'hidden'}>
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
            {okayChoices && <p>{makeInstruction(fromLanguage, toLanguage, qFormat)}</p>}
          </div>

          {okayChoices && (
            <QuestionsContainer
              key={gameKey}
              toLanguage={toLanguage}
              fromLanguage={fromLanguage}
              qFormat={qFormat}
              onAnswer={handleAnswer}
              onNewGame={handleNewGame}
              onStartOver={requestNewGame}
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
        </div>

        {/* relative + z-10 keeps the dedication and footer above the page doodles */}
        <div className="relative z-10 w-full flex flex-col mt-10">
          <p className="bg-pink-400 w-full px-6 py-4 md:p-4 font-gyst font-medium md:font-semibold inline-block align-bottom text-stone-900 text-lg leading-snug md:text-2xl text-center">
            In memory &amp; admiration of Vasily Grossman, Ilya Ehrenburg, and countless other poets fighting fascism.
          </p>
          <Footer />
        </div>

        {onGamePage && <ScoreTracker
          correct={correct}
          incorrect={incorrect}
          variant="mobile-banner"
          tucked={footerInView}
          onNewGame={requestNewGame}
          highScore={highScore}
          onShare={handleShare}
          copied={copied}
        />}
        <StartOverDialog
          open={confirmingStartOver}
          onOpenChange={setConfirmingStartOver}
          onConfirm={handleNewGame}
        />
      </div>
    </DarkModeProvider>
  )
}

export default App
