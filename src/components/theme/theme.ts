import { Theme, createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a6d4a8',
      light: '#2a8530',
      contrastText: '#000000',
      dark: '#0b460c',
    },
    secondary: {
      main: '#a41cc7',
      light: '#571475',
      dark: '#3d2a52',
      contrastText: '#ece2e2',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#ff0000',
    },
    background: {
      default: '#79876A',
      paper: '#EAE0AB',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#aaaaaa',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: '#bed2be',
        },
        text: {
          color: '#000000',
          '&:hover': {
            color: '#0b460c',
          },
        },
        outlined: {
          borderColor: '#000000',
          color: '#000000',
          '&:hover': {
            borderColor: '#0b460c',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d20029',
      light: '#f79146',
      contrastText: '#000000',
    },
    secondary: {
      main: '#202020',
      light: '#960202',
      dark: '#ff0e0e',
    },
    text: {
      primary: '#e80a0d',
      secondary: '#ffffff',
      disabled: '#000000',
    },
    background: {
      default: '#4c7183',
      paper: '#201F1F',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#4c7183',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          fontWeight: 'bold',
          backgroundColor: '#4A4848',
          color: '#000000',
        },
        text: {
          '&:hover': {
            color: '#F7F7F7',
          },
        },
        outlined: {
          borderColor: '#000000',
          color: '#000000',
          '&:hover': {
            borderColor: '#FFFFFF',
          },
        },
      },
    },
  },
});

export const contrastTheme = createTheme({
  palette: {
    primary: {
      main: '#ff307c',
      light: '#022703',
      contrastText: '#0f1f4e',
    },
    secondary: {
      main: '#202020',
      light: '#960202',
      dark: '#ff0e0e',
    },
    text: {
      primary: '#0793ff',
      secondary: '#007106',
      disabled: '#008a68',
    },
    background: {
      default: '#d0caca',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#d0caca',
        },
      },
    },
  },
});

export type ThemeNaming = 'DARK' | 'LIGHT' | 'CONTRAST';

type ThemeComponents = {
  [key in ThemeNaming]: Theme;
};

export const themeList: ThemeComponents = {
  LIGHT: lightTheme,
  DARK: darkTheme,
  CONTRAST: contrastTheme,
};
