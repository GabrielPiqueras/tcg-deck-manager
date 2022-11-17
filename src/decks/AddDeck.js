import React from 'react'
import { ImportTheme } from '../components/mui/ImportTheme'
import { SearchCards } from '../components/cards/SearchCards'

export const AddDeck = () => {
    return (
        <ImportTheme>
            <h1>Crear Mazo</h1>
            
            <SearchCards />
        </ImportTheme>
    )
}
