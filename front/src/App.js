import {
  Grid,
} from '@material-ui/core';

import Search from './components/Search.js'

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined
} from '@material-ui/icons';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    
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
        <Search />
      </Grid>
    </Grid>
  );
}

export default App;
