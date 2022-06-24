import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntryCard } from './';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { EntryStatus } from '../../interfaces/';

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {

  const { entries } = useContext( EntriesContext )

  const entriesByStatus = useMemo(() => (
    entries.filter(entry => entry.status === status )
  ), [entries])
    
  return (
    // Todo: here ,we will make drop
    <div>
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scorll', backgroundColor: 'transparent', padding: '1px 5px'}}>

            {/* Todo: it will change if making drag and drop */}
            <List sx={{ opacity: 1 }}>
              {
                entriesByStatus.map( (item) => (
                  <EntryCard key={item._id} entry={item} />
                ))
              }
            </List>

        </Paper>
    </div>
  )
}

export default EntryList