import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const DropDownList = ({
  label = '',
  options = [],
  onSearch = () => {},
  onSelect = () => {},
  placeholder = '',
}) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          onChange={onSearch}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
      onSelect={onSelect}
    />
  )
};

export default DropDownList;
