import React from 'react'
import { ImportTheme } from '../mui/ImportTheme'
import { SearchCards } from '../cards/SearchCards'

export const AddDeck = () => {
    return (
        <ImportTheme>
            <h1>Crear Mazo</h1>
            
            <SearchCards />
        </ImportTheme>
    )
}
