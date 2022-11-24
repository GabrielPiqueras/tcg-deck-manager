import React, { useContext } from 'react';
import { Input } from '../mui/Input';
import { SearchContext } from '../../context/SearchContext';

export const Search = () => {
    
    const searchContext = useContext(SearchContext);
    const { searchValue, setSearchValue } = searchContext;

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    return(
        <Input value={ searchValue } onChange={ handleInputChange } width={600} maxWidth='90%' placeholder='Buscar pokemon' />
    )
}