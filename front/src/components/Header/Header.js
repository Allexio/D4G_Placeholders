import  React from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined
} from '@material-ui/icons';

import { useTheme } from '@material-ui/core/styles';

import './Header.css';

const Header = () => {
  const globalOpacity = 1;
  const theme = useTheme();
  const iconSize = 60
  const verticalMargin = "20px"
  console.log(theme.palette)
  return (
    <>
      <Paper elevation={5} style= {{opacity: globalOpacity, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}>
        <div style={{paddingLeft: '20px'}} >
          <p>The Placeholders' township digital fragility library.</p>
          <p>What is the digital fragility index?
            The fragility index is a way of classifying townships in France (metropolitan and overseas territories) by multiple criteria in order to help government offices, statisticians, and the public in general, by providing a ranking in "digitial fragility" with which to compare regions against one another.
          </p>
          <p>
            This fragility index is determined by four characteristics.
          </p>
        </div>
      </Paper>
      <Grid container spacing={3} style={{marginTop: verticalMargin, opacity: globalOpacity}}>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.accentOne.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <DescriptionOutlined style={{ color: theme.palette.primary.main, fontSize: iconSize }} />
              </Grid>
              <Grid item xs={8}>
                Identifier des populations parmi lesquelles s'observent des difficultés à accomplir des procédures administratives.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.tertiary.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <InfoOutlined style={{color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                Identifier des territoires mal couverts par une offre de service d'information ou des populations qui auront des difficultés à comprendre l'information.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{marginTop: verticalMargin, opacity: globalOpacity}}>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.secondary.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <SettingsInputAntennaOutlined style={{color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                Identifier des territoires mal couverts par les réseaux ou dans lesquels des populations auront des difficultés financières à y accéder.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.accentTwo.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <TouchAppOutlined style={{color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                Identifier des populations parmi lesquelles s'observe une fréquence d'illectronisme ou difficulté à utiliser internet.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
