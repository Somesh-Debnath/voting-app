import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import {createContext, useState} from "react"

type AppContextType = {
  formContext: String | null,
  setFormContext: React.Dispatch<React.SetStateAction<String | null>>
}
export const AppContext = createContext<AppContextType | null>(null)

export default function MyApp({ Component, pageProps }: AppProps) {

  const [formContext, setFormContext] = useState<String | null>("hello")
  return (
    <AuthProvider>
      <AppContext.Provider value = {{ formContext, setFormContext }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </AuthProvider> 
 )
}
