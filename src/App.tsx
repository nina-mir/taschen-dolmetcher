import { Button } from '@/components/ui/button'
import Header from './components/Header'
import LanguageSelctor from './components/LanguageSelector'
import { NavigationMenuDemo } from './components/Navbar'

// import { NavigationMenuDemo } from './components/Navbar'

import { useState } from 'react'


function App() {
  const [fromLanguage, setFromLanguage] = useState('de')
  const [toLangueg, setToLanguage] = useState('en')

  const handleLanguageChange: void = (from: string, to: string) => {
    setFromLanguage(from)
    setToLanguage(to)
    console.log(`user choices are ${from} and ${to}`)
  }

  return (
    <div className="w-full">

      {/* <NavigationMenuDemo/> */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationMenuDemo />
      </div>
      <Header />
      <div className="flex flex-col items-center  gap-[3rem]">
        <LanguageSelctor
          fromLanguage={fromLanguage}
          toLanguage={toLangueg}
          onLanaguageChange={handleLanguageChange}

        />
        <Button>Click me</Button>
        <Button>Click me</Button>
        <img src='Screenshot 2025-03-25 171559.png' />

      </div>
    </div>
  )
}

export default App
