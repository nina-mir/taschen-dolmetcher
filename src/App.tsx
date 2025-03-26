import { Button } from '@/components/ui/button'
import Header from './components/Header'
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
      <div className="flex flex-col items-center justify-center min-h-200 gap-[3rem]">
        <Button>Click me</Button>
        <Button>Click me</Button>

      </div>
    </>
  )
}

export default App
