import React, { useContext, useEffect, useState } from 'react'
import { getCards } from '../../helpers/getCards'

// Context
import { AddDeckContext } from '../../context/AddDeckContext';

// Mui
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Theme
import { ImportTheme } from '../mui/ImportTheme';
import { Search } from './Search';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

/**
 * @cards : Estado que guarda las cartas encontradas al buscar
 * @setCards : Función para establecer nuevas cartas buscadas
 * 
 * @searchValue : Estado que guarda la palabra buscada. Cada vez que cambia, setCards() actualiza las cartas.
 * @setSearchValue : Función para cambiar la palabra buscada
 * 
 */

export const SearchCards = () => {
    
    const addDeckContext = useContext(AddDeckContext);
    const { searchCards, setSearchCards, deckCards, setDeckCards, searchWord } = addDeckContext;
    
    useEffect(() => {
        getCards(searchWord).then(cards => setSearchCards(cards));
    }, [searchWord]);

    const cardExist = (id) => {
        return deckCards.find(card => card.id === id);
    }

    const handleCardClick = (c) => {
        
        const exist = cardExist(c.id);

        if (exist) {
            if (exist.quantity < 4 || exist.supertype === 'Energy') {

                const oldCards = deckCards.filter(card => card.id !== c.id);
                
                const newQuantity = exist.quantity + 1;
                const newCard = { ...c, quantity: newQuantity };

                setDeckCards([...oldCards, newCard]);
            } else {
                alert('Error, no puedes añadir más de 4 cartas del tipo: ' + exist.supertype);
            }
        } else {
            const card = {
                ...c,
                quantity: 1
            }

            setDeckCards(cards => [...cards, card]);
        }
    }
    
    // Propago el estado del término buscado al componente <Search />
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                <Grid container spacing={0} columns={{ xs: 12 }}>
                    <Search />
                </Grid>
                <Grid id='cards_search' container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                    {
                        searchCards.map((card) => 
                            <Grid item xs={1} sm={2} md={2} key={card.id}>
                                <Item className='card' onClick={ () => handleCardClick(card) }>
                                    <img src={card.small_img} alt={card.name} />
                                    <div>{ card.name }</div>
                                </Item>
                            </Grid>
                        )
                    }
                </Grid>
            
            </Grid>
        </Box>
    )
}