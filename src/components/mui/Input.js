import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';

export const Input = ({id, width, maxWidth, placeholder, onChange}) => {
  return (
    <Box
      sx={{
        width: { width },
        maxWidth: { maxWidth },
      }}
    >
      <TextField onChange={onChange} fullWidth label={ placeholder } id={ id } />
    </Box>
  );
}

Input.propTypes = {
    id: PropTypes.string,
    width: PropTypes.number,
    maxWidth: PropTypes.string,
    placeholder: PropTypes.string
}

Input.defaultProps = {
    id: '',
    width: 500,
    maxWidth: '100%',
    placeholder: '',
}