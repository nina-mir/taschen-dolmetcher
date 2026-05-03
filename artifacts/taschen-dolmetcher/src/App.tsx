import { QuestionType, LanguageType } from '@/types';
import Header from './components/Header'
import QuestionsContainer from './components/QuestionsContainer';
import LanguageSelector from './components/LanguageSelector'
import { NavigationMenuDemo } from './components/Navbar'
import ToggleQuestionType from './components/QuestionsFormat'
import Footer from './components/Footer';

import { StarFilledIcon, CornersIcon } from "@radix-ui/react-icons"

import { useState } from 'react'


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

  const handleLanguageChange = (from: LanguageType, to: LanguageType) => {
    if (from !== to) {
      setFromLanguage(from)
      setToLanguage(to)
      setOkayChoices(true)
    } else {
      setOkayChoices(false)
    }
  }

  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationMenuDemo />
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
            toLanguage={toLanguage}
            fromLanguage={fromLanguage}
            qFormat={qFormat}
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
    </div>
  )
}

export default App
