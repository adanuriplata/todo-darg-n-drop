import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { Layout } from '../../components/layouts/Layout';
import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Entry, EntryStatus } from '../../interfaces';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage:FC<Props> = ( { entry } ) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const { updateEntry, deleteEntry } = useContext( EntriesContext );

    const [inputValue, setInputValue]= useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status);
    const [touched, setTouched] = useState(false);
    const [modal, setmodal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const router =  useRouter()

    const isNotValid = useMemo( () => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        console.log(event.target.value)
        setStatus( event.target.value as EntryStatus )
    }

    const onSave = () => {
        if ( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true);

    }

    const  onDelete = () => {
        deleteEntry(entry)
        router.push(`/`)
    }

    const handleOpen = () => setmodal(true)
    const handleClose = () => setmodal(false)

  return (
    <Layout title={ inputValue.substring(0,20) + '...' }
    >
        <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 }  md={ 6 }>
                <Card>
                    <CardHeader 
                        title={ `Entrada:`}
                        subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt )} `}
                    />
                    <CardContent>
                        <TextField sx={{ marginTop: 2, marginBottom: 1 }}
                        fullWidth
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label="Nueva entrada"
                        value={ inputValue }
                        onChange={ onInputValueChanged }
                        helperText={ isNotValid && 'Ingrese un valor '}
                        onBlur={ () => setTouched(true) }
                        error={ isNotValid }
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                            row
                            value={ status }
                            onChange={ onStatusChanged }
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel
                                            key={ option }
                                            value={ option }
                                            control={ <Radio />}
                                            label={ capitalize(option) }
                                            />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button 
                         startIcon={ <SaveOutlinedIcon />}
                         variant="contained"
                         fullWidth
                         onClick={ onSave }
                         disabled={ inputValue.length <= 0}
                         >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ¿Seguro que quiere eliminar esta entrada?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="success" onClick={onDelete} >Confirmar</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancelar</Button>
                </Typography>
                </Box>
        </Modal>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'red'
        }} onClick={ handleOpen }>
            <DeleteOutlinedIcon  />
        </IconButton>
    </Layout>
  );
};



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return{
        props: {
            entry
        }
    }
}

export default EntryPage