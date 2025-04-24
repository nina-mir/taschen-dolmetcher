import data from '@/data/data.json'
import { Button } from '@/components/ui/button'
import Header from './components/Header'
import Question from '@/components/Question'
import LanguageSelector from './components/LanguageSelector'
import { NavigationMenuDemo } from './components/Navbar'

import { useState } from 'react'

function makeInstruction(from: string, to:string):string {

  switch (from){
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

  const handleLanguageChange = (from: string, to: string) => {
    setFromLanguage(from)
    setToLanguage(to)
    console.log(`user choices are ${from} and ${to}`)
  }

  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationMenuDemo />
      </div>
      <Header />
      <div className="flex flex-col items-center gap-[1rem]">
        <LanguageSelector
          initialFrom={fromLanguage}
          initialTo={toLangueg}
          onLanguageChange={handleLanguageChange}
        />
        <p className='font-garamond-pp text-xl text-center text-wrap'>{makeInstruction(fromLanguage, toLangueg)}</p>
        <Question
        id = {'1'}
        de={data[0].de}
        en={data[0].en}
        ru={data[0].ru}
        phonetic={data[0].phonetic}
        fromLanguage={fromLanguage}
        toLanguage={toLangueg}
        />
        <Button>Click me</Button>
        <Button>Click me</Button>
        <img src='Screenshot 2025-03-25 171559.png' />

      </div>
    </div>
  )
}

export default App
