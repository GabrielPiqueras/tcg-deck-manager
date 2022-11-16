import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

export const SearchCards = () => {

    const authContext = useContext(AuthContext);

    return (
        <>
            <h1>Buscar cartas</h1>

            <p>{ JSON.stringify(authContext) }</p>
        </>
    )
}
