import React from 'react';
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


const Footer = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={3} style={{marginTop: "20px"}}>
      <Grid item xs>
      <Paper elevation={5} style={{backgroundColor: theme.palette.secondary.main}}>
          <Grid container spacing={3}>
          <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
              <DescriptionOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
          </Grid>
          <Grid item xs={8} style={{fontSize: 30}}>
              541
          </Grid>
          </Grid>
      </Paper>
      </Grid>
      <Grid item xs>
      <Paper elevation={5} style={{backgroundColor: theme.palette.average.main}}>
          <Grid container spacing={3}>
          <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
              <InfoOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
          </Grid>
          <Grid item xs={8} style={{fontSize: 30}}>
              5461
          </Grid>
          </Grid>
      </Paper>
      </Grid>
      <Grid item xs>
      <Paper elevation={5} style={{backgroundColor: theme.palette.secondary.main}}>
          <Grid container spacing={3}>
          <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
              <SettingsInputAntennaOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
          </Grid>
          <Grid item xs={8} style={{fontSize: 30}}>
              1504
          </Grid>
          </Grid>
      </Paper>
      </Grid>
      <Grid item xs>
      <Paper elevation={5} style={{backgroundColor: theme.palette.negative.main}}>
          <Grid container spacing={3}>
          <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
              <TouchAppOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
          </Grid>
          <Grid item xs={8} style={{fontSize: 30}}>
              4516031
          </Grid>
          </Grid>
      </Paper>
      </Grid>
    </Grid>
  );
};

export default Footer;
