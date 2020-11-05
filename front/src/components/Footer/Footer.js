import React from 'react';
import { useSelector } from 'react-redux';

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

const selector = ({ townShip, showResult }) => ({ townShip, showResult });
const Footer = () => {
  const theme = useTheme();

  const {
    showResult,
    townShip,
  } = useSelector(selector);

  function getColor(score) {
    if (score >= 80 && score <= 130) {
      return theme.palette.average.main;
    }

    if (score > 130) {
      return theme.palette.negative.main;
    }

    if (score < 80) {
      return theme.palette.secondary.main;
    }
  }

  return (
    <>
      {
        showResult && townShip !== null && (
          <Grid container spacing={3} style={{marginTop: "20px"}}>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["COMPETENCES ADMINISTATIVES"])}}>
                <Grid container spacing={3}>
                <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
                  <DescriptionOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
                </Grid>
                  <Grid item xs={8} style={{fontSize: 30}}>{townShip["COMPETENCES ADMINISTATIVES"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["ACCES A L'INFORMATION"])}}>
                <Grid container spacing={3}>
                <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
                  <InfoOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
                </Grid>
                  <Grid item xs={8} style={{fontSize: 30}}>{townShip["ACCES A L'INFORMATION"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["ACCÈS AUX INTERFACES NUMERIQUES"])}}>
                <Grid container spacing={3}>
                  <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
                    <SettingsInputAntennaOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
                  </Grid>
                    <Grid item xs={8} style={{fontSize: 30}}>{townShip["ACCÈS AUX INTERFACES NUMERIQUES"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["COMPÉTENCES NUMÉRIQUES / SCOLAIRES"])}}>
                <Grid container spacing={3}>
                  <Grid item xs={2} style={{textAlign: 'center', paddingLeft: '20px'}}>
                    <TouchAppOutlined style={{color: theme.palette.primary.main, fontSize: 40}} />
                  </Grid>
                    <Grid item xs={8} style={{fontSize: 30}}>{townShip["COMPÉTENCES NUMÉRIQUES / SCOLAIRES"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )
      }
    </>
  );
};

export default Footer;
