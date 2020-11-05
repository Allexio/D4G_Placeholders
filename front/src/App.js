import React from 'react';
import {
  Grid,
} from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SelectTownship from './components/SelectTownship/SelectTownship';
import Header from './components/Header/Header';

//22577A 38A3A5 57CC99 80ED99 C7F9CC
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#57CC99',
      contrastText: '#000',
    },
    secondary: {
      main: '#80ED99',
      contrastText: '#000',
    },
    tertiary: {
      main: '#38A3A5',
      contrastText: '#000',
    },
    accentOne: {
      main: '#C7F9CC',
      contrastText: '#000',
    },
    accentTwo: {
      main: '#22577A',
      contrastText: '#000',
    },
    background: {
      paper: '#C7F9CC'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container item xs={12} style={{justifyContent: 'center', marginTop: '100px'}}>
        <Grid container item xs={8}>
          <Header />
          <SelectTownship />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
