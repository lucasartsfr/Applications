import React, { createContext, useState} from 'react';

export interface MyContextType {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    item: number;
    setItem: React.Dispatch<React.SetStateAction<number>>;
    sound : boolean;
    setSound : React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
    children: React.ReactNode;
  }
  
  export const MyContextProvider = ({ children }: MyContextProviderProps) => {
    const [filter, setFilter] = useState('Star');
    const [item, setItem] = useState(0)
    const [sound, setSound] = useState(true);
    const contextData: MyContextType = {
        filter,
        setFilter,
        item, 
        setItem,
        sound,
        setSound
      };
        
  
    return (
      <MyContext.Provider value={contextData}>
        {children}
      </MyContext.Provider>
    );
  };