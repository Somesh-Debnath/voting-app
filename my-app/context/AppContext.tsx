import React from 'react'

export interface Person {
    id: number;
    Name: string;
    Email: string;
    Role: string;
  }
  
 export type AppContextType = {
    formContext: String | null,
    setFormContext: React.Dispatch<React.SetStateAction<String | null>>,
     cardDetails: Person[]  ,
    setCardDetails: (cardDetails: Person[]) => void
  }

export const AppContext = React.createContext<AppContextType | null> (null)

export const AppProvider = ({children}:any) => {
    const [formContext, setFormContext] = React.useState<String | null>("hello")
    const [cardDetails, setCardDetails] = React.useState<Person[]>([]);
    return (
        <AppContext.Provider value = {{ formContext, setFormContext, cardDetails, setCardDetails }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider