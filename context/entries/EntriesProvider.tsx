
import { FC, ReactNode, useReducer, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from "./"
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )

    const addNewEntry = ( description: string) => {
        const NewEntry: Entry =         {
            _id: uuidv4(),
            description,
            status: 'pending',
            createdAt: Date.now(),
        }
     
        dispatch({type: '[Entry] - Add-Entry', payload: NewEntry
    })

}

const updateEntry = ( entry: Entry) => {
    dispatch({ type: '[Entry] - Entry-Updated', payload: entry})
}

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>

    )
}