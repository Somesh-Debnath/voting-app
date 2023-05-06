import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import {createContext, useState} from "react"

export interface Person {
  Image: any;
  id: number;
  Name: string;
  Email: string;
  Role: string;
}

export type AppContextType = {
  formContext: String | null,
  setFormContext: React.Dispatch<React.SetStateAction<String | null>>,
   cardDetails: Person[]  ,
  setCardDetails: React.Dispatch<React.SetStateAction<Person[] >>
}
export const AppContext = createContext<AppContextType | null>(null)

export default function MyApp({ Component, pageProps }: AppProps) {

  const [formContext, setFormContext] = useState<String | null>("hello")
  const [cardDetails, setCardDetails] = useState<Person[]>([]);
  return (
    <AuthProvider>
      <AppContext.Provider value = {{ formContext, setFormContext, cardDetails, setCardDetails }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </AuthProvider> 
 )
}
