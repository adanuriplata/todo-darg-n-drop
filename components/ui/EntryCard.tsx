import React, { FC } from 'react'
import { Card, CardActionArea, Typography, CardContent, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: FC<EntryCardProps> = ({entry}) => {
    console.log('desde el entrycard', entry)
  return (
    <Card
        sx={{ marginBottom: 1 }}
    >

        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>hace {entry.createdAt}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}