import React, { useContext } from 'react';

// Mui
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Context
import { AddDeckContext } from '../../context/AddDeckContext';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export const DeckCards = () => {

    const addDeckContext = useContext(AddDeckContext);
    const { deckCards, setDeckCards, setDeckProperties } = addDeckContext;

    const cardExist = (id) => {
        return deckCards.find(card => card.id === id);
    }

    const handleCardRemove = (c) => {
        
        const exist = cardExist(c.id);

        if (exist) {
            const { id, quantity } = exist;

            if (quantity > 1) {

                const newQuantity = quantity - 1;

                setDeckCards(cards => cards.map(card => {
                    if (card.id === id) {
                        return {...card, quantity: newQuantity}
                    }
                    
                    return card;
                }));
               
                setDeckProperties(properties => {
                    return {...properties, total: properties.total - 1}
                });
            } else {
                setDeckCards(cards => cards.filter(card => {
                    return card.id !== id;
                }));

                setDeckProperties(properties => {
                    return {...properties, total: properties.total - 1}
                });
            }
        }
    }
    
    return (
        <>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.dashbox', border: 'background.dashboxBorder' }} id='deck-cards'>
                <Grid container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                    <Grid container spacing={0} columns={{ xs: 12 }}>
                        
                    </Grid>
                    <Grid container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                        {
                            deckCards.map(card => 
                                <Grid item xs={1} sm={2} md={2} key={card.id}>
                                    <Item className='card-remove' onClick={ () => handleCardRemove(card) }>
                                        <img src={card.small_img} alt={card.name} />
                                        <div>
                                            { card.name }<br />
                                            Cantidad: { card.quantity }
                                        </div>
                                    </Item>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}