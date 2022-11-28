import React, { useContext } from 'react';
import { Input } from '../mui/Input';

// Context
import { AddDeckContext } from '../../context/AddDeckContext';

export const Search = () => {
    
    const addDeckContext = useContext(AddDeckContext);
    const { searchWord, setSearchWord } = addDeckContext;

    const handleInputChange = (e) => {
        setSearchWord(e.target.value);
    }

    return(
        <Input value={ searchWord } onChange={ handleInputChange } width={600} maxWidth='90%' placeholder='Buscar pokemon' />
    )
}