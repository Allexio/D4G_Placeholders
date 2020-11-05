import React from 'react';

import {
  Grid,
  TextField
} from '@material-ui/core';

const TabPostalCode = () => {
  return (
    <Grid item xs={12}>
      <TextField type="text" placeholder="Postal code" />
    </Grid>
  );
};

export default TabPostalCode;
