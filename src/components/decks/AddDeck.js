import React, { useState } from 'react'
import { ImportTheme } from '../mui/ImportTheme'
import { SearchCards } from '../cards/SearchCards'
import { DeckCards } from './DeckCards'
import { AddDeckContext } from '../../context/AddDeckContext'

import { Input } from '../mui/Input';


// Context


export const AddDeck = () => {

    const sumDeckCards = () => {

        return 0;
    }

    const [ deckCards, setDeckCards ] = useState([]);
    const [ deckProperties, setDeckProperties ] = useState({
        title: '',
        public: true,
        total: 0
    });

    const [ searchCards, setSearchCards ] = useState([]);
    const [ searchWord, setSearchWord ] = useState('');

    // Context data provide
    const contextData = {
        // Cartas añadidas al mazo
        deckCards,
        setDeckCards,
        // Propiedades del mazo
        deckProperties,
        setDeckProperties,
        // Cartas buscadas
        searchCards,
        setSearchCards,
        // Palabra a buscar
        searchWord,
        setSearchWord
    };

    const handleTitleChange = (e) => {
        setDeckProperties({...deckProperties, title: e.target.value});
    }

    return (
        <ImportTheme>
            <AddDeckContext.Provider value={ contextData }>
                    <h1>Nuevo mazo ({deckProperties.total}/60)</h1>
                    <Input value={ searchWord } onChange={ handleTitleChange } width={600} maxWidth='90%' placeholder='Título del mazo' />
        
                    <DeckCards />
                    <SearchCards />
            </AddDeckContext.Provider>
        </ImportTheme>
    )
}
