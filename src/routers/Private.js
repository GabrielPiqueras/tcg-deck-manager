import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Private = ({ isAuth, component: Component }) => {
    
    return (
        ( isAuth )
        ? <Component />
        : <Navigate to='/login' />
    )
}

Private.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}