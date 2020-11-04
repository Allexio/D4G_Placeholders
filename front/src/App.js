import {
  Grid,
  Paper,
} from '@material-ui/core';

import Search from './components/Search.js'

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined
} from '@material-ui/icons';

function App() {
  const globalOpacity = 0.60;
  return (
    <Grid container item xs={12} style={{justifyContent: 'center', marginTop: '100px'}}>
      
      <Grid container item xs={8}>
        <Paper elevation={5} style= {{opacity: globalOpacity}}>
          <p>The Placeholders' township digital fragility library.</p>
          <p>What is the digital fragility index?
            The fragility index is a way of classifying townships in France (metropolitan and overseas territories) by multiple criteria in order to help government offices, statisticians, and the public in general, by providing a ranking in "digitial fragility" with which to compare regions against one another.
          </p>
          <p>
            This fragility index is determined by four characteristics.
          </p>
        </Paper>
        <Grid container spacing={3} style={{marginTop: '10px', opacity: globalOpacity}}>
          <Grid item xs>
            <Paper elevation={5}>
              <DescriptionOutlined style={{ color: "green", fontSize: 100 }} />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={5}>
              <InfoOutlined style={{ color: "green", fontSize: 100 }} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '10px', opacity: globalOpacity}}>
          <Grid item xs>
            <Paper elevation={5}>
              <SettingsInputAntennaOutlined style={{ color: "green", fontSize: 100 }} />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={5}>
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
