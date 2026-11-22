import { createContext, useContext } from 'react'

const DarkModeContext = createContext<boolean>(false)

export const DarkModeProvider = DarkModeContext.Provider
export const useDarkModeContext = () => useContext(DarkModeContext)
