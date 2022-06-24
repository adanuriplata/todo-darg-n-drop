import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const NewEntry = () => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2}}>

        <Button startIcon={ <AddCircleOutlineIcon /> }
                    fullWidth
                    variant='outlined'
        >

        </Button>

        <TextField  fullWidth sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            label='Nueva Entrada'
            helperText='Ingrese un valor'
        />
        <Box display='flex' justifyContent={'space-between'}  >
            <Button 
                variant='outlined'
                >
                Cancelar
            </Button>

            <Button 
                variant='outlined'
                color='secondary'
                endIcon={ <SaveOutlinedIcon /> }
                >
                Guardar
            </Button>
        </Box>
    </Box>
  )
}