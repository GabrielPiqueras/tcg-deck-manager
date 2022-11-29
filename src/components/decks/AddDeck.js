import React, { useState } from 'react'
import { ImportTheme } from '../mui/ImportTheme'
import { SearchCards } from '../cards/SearchCards'
import { DeckCards } from './DeckCards'
import { AddDeckContext } from '../../context/AddDeckContext'

// Context


export const AddDeck = () => {

    const sumDeckCards = () => {

        return 0;
    }

    const [ deckCards, setDeckCards ] = useState([]);
    const [ deckProperties, setDeckProperties ] = useState({total: 0});

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

    return (
        <ImportTheme>
            <AddDeckContext.Provider value={ contextData }>
                    <h1>Nuevo mazo ({deckProperties.total}/60)</h1>
                    <DeckCards />
                    <SearchCards />
            </AddDeckContext.Provider>
        </ImportTheme>
    )
}
