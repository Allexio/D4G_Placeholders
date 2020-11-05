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
    <Grid container item xs={12}>
      <Grid item xs={3}>
        <TextField type="text" placeholder="Postal code" />
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Code Postal" />
          <Button 
            variant="contained"
            color="primary"
            onClick={toggleSearch}
          >
            Recherche
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TabPostalCode;
