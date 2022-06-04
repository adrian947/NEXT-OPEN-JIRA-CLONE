import { createContext } from 'react';
import { Entry } from '../../interfaces/interfaces';


interface ContextProps {
   entries: Entry[];
   addEntry: (description: string) => void;
   updateEntry: (entry: Entry) => void
   deleteEntry: (id: string) => void
}

export const EntriesContext = createContext({} as ContextProps);