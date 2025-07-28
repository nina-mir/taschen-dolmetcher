import Header from './components/Header'
import QuestionsContainer from './components/QuestionsContainer';
import LanguageSelector from './components/LanguageSelector'
import { NavigationMenuDemo } from './components/Navbar'
import ToggleQuestionType from './components/QuestionsType'

import { StarFilledIcon, CornersIcon } from "@radix-ui/react-icons"

import { useState } from 'react'

function makeInstruction(from: string, to: string): string {

  switch (from) {
    case 'de':
      return `Schreiben Sie die richtige Übersetzung in ${to}!`
    case 'en':
      return `Write the correct translation in ${to}`
    case 'ru':
      return `Напишите правильный перевод в ${to}`
    default:
      return `Etwas ist kaput!!👎🏽😵 refresh, пожалуйста!😺`
  }

}


function App() {
  const [fromLanguage, setFromLanguage] = useState<string>('de')
  const [toLangueg, setToLanguage] = useState<string>('en')
  const [okayChoices, setOkayChoices] = useState<Boolean>()

  const handleLanguageChange = (from: string, to: string) => {
    if (from !== to) {
      setFromLanguage(from)
      setToLanguage(to)
      setOkayChoices(true)
      console.log(`user choices are ${from} and ${to}`)
    } else {
      setOkayChoices(false)
      console.log(`user choices are the same so invalid!`)
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
            initialTo={toLangueg}
            onLanguageChange={handleLanguageChange}
          />
          <ToggleQuestionType />
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
          {okayChoices && <p>{makeInstruction(fromLanguage, toLangueg)}</p>}
        </div>

        {
          okayChoices && <QuestionsContainer
            toLanguage={toLangueg}
            fromLanguage={fromLanguage}
          />
        }

        {
          !okayChoices &&
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
        }



        <img src='Screenshot 2025-03-25 171559.png' />

      </div>
    </div>
  )
}

export default App
