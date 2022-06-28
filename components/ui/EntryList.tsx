import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo, DragEvent } from 'react'
import { EntryCard } from './';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { EntryStatus } from '../../interfaces/';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css'

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext )
  const { isDragging, endDragging } = useContext( UIContext )

  const entriesByStatus = useMemo(() => (
    entries.filter(entry => entry.status === status )
  ), [entries])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement> ) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find( e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();


  }
    
  return (
    // Todo: here ,we will make drop
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scorll', backgroundColor: 'transparent', padding: '1px 5px'}}>

            {/* Todo: it will change if making drag and drop */}
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
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