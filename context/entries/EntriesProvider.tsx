
import { FC, ReactNode, useReducer, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from "./"
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Esto es un ejemplo de una tarea',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Esto es otro ejmplo de tarea que estamos poniendo aqui',
            status: 'in-progres',
            createdAt: Date.now() - 100000,
        },
        {
            _id: uuidv4(),
            description: 'Tarea por concluir ya llenado mas contenido',
            status: 'finished',
            createdAt: Date.now() - 200000,
        },
        {
            _id: uuidv4(),
            description: 'Tarea de sofia pendiente',
            status: 'finished',
            createdAt: Date.now() - 200000,
        },
        
],
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
    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
        }}>
            {children}
        </EntriesContext.Provider>

    )
}