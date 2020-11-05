import React, { useCallback } from 'react';

import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

const TabPostalCode = () => {
  const toggleSearch = useCallback(() => {

  }, []);

  return (
    <Grid container spacing={3}>
      <Grid container item xs justify="center">
        <TextField type="text" placeholder="Code Postal" />
      </Grid>
      <Grid container item xs justify="center">
        <Button 
          variant="contained"
          color="primary"
          onClick={toggleSearch}
        >
          Recherche
        </Button>
      </Grid>
    </Grid>
  );
};

export default TabPostalCode;
