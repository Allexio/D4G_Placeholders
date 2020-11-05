import React, { useCallback } from 'react';

import {
  Button,
  FormControl,
  Grid,
  TextField,
} from '@material-ui/core';

const TabPostalCode = () => {
  const toggleSearch = useCallback(() => {

  }, []);

  return (
    <Grid item xs={12}>
      <FormControl>
        <TextField type="text" placeholder="Postal code" />
        <Button 
          variant="contained"
          color="primary"
          onClick={toggleSearch}
        >
          Search
        </Button>
      </FormControl>
    </Grid>
  );
};

export default TabPostalCode;
