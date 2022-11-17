import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import PropTypes from 'prop-types';

export const FloatingButton = ({id, size, icon, text, color}) => {
    return (
        <Fab id= { id } variant="extended" size={ size } color={ color } aria-label="add">
            { icon }
            { text }
        </Fab>
    );
}


FloatingButton.propTypes = {
    size: PropTypes.string,
    icon: PropTypes.isRequired,
    text: PropTypes.string,
    color: PropTypes.string
}

FloatingButton.defaultProps = {
    size: '',
    text: '',
    color: 'primary'
}
