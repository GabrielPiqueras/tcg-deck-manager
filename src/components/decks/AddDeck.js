import React, { useState } from 'react'
import { ImportTheme } from '../mui/ImportTheme'
import { SearchCards } from '../cards/SearchCards'
import { DeckCards } from './DeckCards'
import { AddDeckContext } from '../../context/AddDeckContext'

// Context


export const AddDeck = () => {

    const [ deckCards, setDeckCards ] = useState([]);
    const [ searchCards, setSearchCards ] = useState([]);
    const [ searchWord, setSearchWord ] = useState('');

    // Context data provide
    const contextData = {
        // Cartas añadidas al mazo
        deckCards,
        setDeckCards,
        // Cartas buscadas
        searchCards,
        setSearchCards,
        // Palabra a buscar
        searchWord,
        setSearchWord
    };

    console.log(deckCards);

    return (
        <AddDeckContext.Provider value={ contextData }>
            <ImportTheme>
                <h1>Nuevo mazo</h1>
                <DeckCards />
                <SearchCards />
            </ImportTheme>
        </AddDeckContext.Provider>
    )
}
