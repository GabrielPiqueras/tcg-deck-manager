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
    const { deckCards } = addDeckContext;
    
    return (
        <>
            <h2>Cartas</h2>

            <Box sx={{ flexGrow: 1 }}>
                <Grid id='cards_search' container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                    <Grid container spacing={0} columns={{ xs: 12 }}>
                        
                    </Grid>
                    <Grid id='cards_search' container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                        {
                            deckCards.map(card => 
                                <Grid item xs={1} sm={2} md={2} key={card.id}>
                                    <Item>
                                        <img src={card.small_img} alt={card.name} />
                                        <div>{ card.name }</div>
                                        <div>Cantidad: { card.quantity }</div>
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
