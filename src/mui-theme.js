import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    "fontFamily": `"Inter", sans-serif`,
    "fontSize": 14,
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1351a1',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    muiwhite: {
      main: '#fff'
    }
  },
});

export default theme;