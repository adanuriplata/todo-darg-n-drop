
import { createTheme } from "@mui/material"
import { red, grey } from "@mui/material/colors"

export const lightTheme = createTheme(
    {
      palette: {
        mode: 'light',
        background: {
            default: grey[300]
        },
        primary: {
            main: '#4a148c'
        },
        secondary: {
            main: '#19857h'
        },
        error: {
            main: red.A400
        },
      },
      components: {
        MuiAppBar: {
            defaultProps: {
              elevation: 0
            },
            styleOverrides: {}
        }
    }
    }
  );