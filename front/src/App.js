import React from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';

import SelectTownship from './components/SelectTownship/SelectTownship.js'

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined
} from '@material-ui/icons';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
          <p>The Placeholders' township digital fragility library.</p>
          <p>What is the digital fragility index?
            The fragility index is a way of classifying townships in France (metropolitan and overseas territories) by multiple criteria in order to help government offices, statisticians, and the public in general, by providing a ranking in "digitial fragility" with which to compare regions against one another.
          </p>
          <p>
            This fragility index is determined by four characteristics.
          </p>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper>
                <DescriptionOutlined style={{ color: "green", fontSize: 100 }} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper>
                <InfoOutlined style={{ color: "green", fontSize: 100 }} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper>
                <SettingsInputAntennaOutlined style={{ color: "green", fontSize: 100 }} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper>
                <TouchAppOutlined style={{ color: "green", fontSize: 100 }} />
              </Paper>
            </Grid>
          </Grid>
          <SelectTownship />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
