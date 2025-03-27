import { Button } from '@/components/ui/button'
import Header from './components/Header'
import LanguageSelctor from './components/LanguageSelector'
// import { NavigationMenuDemo } from './components/Navbar'

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <NavigationMenuDemo/> */}
      <Header />
      <div className="flex flex-col items-center justify-start min-h-200 gap-[3rem]">
        <LanguageSelctor />
        <Button>Click me</Button>
        <Button>Click me</Button>

      </div>
    </>
  )
}

export default App
