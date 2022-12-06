import React, { useContext, useState } from 'react'
import { SearchCards } from '../cards/SearchCards'
import { DeckCards } from './DeckCards'

// Mui
import { FloatingButton } from '../mui/FloatingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, Paper } from '@mui/material'
import { Input } from '../mui/Input';

// Context
import { AddDeckContext } from '../../context/AddDeckContext'
import { AuthContext } from '../../auth/AuthContext';

// Style
import styled from '@emotion/styled'
import { ImportTheme } from '../mui/ImportTheme'
import { createDeck } from '../../helpers/createDeck';

// Router
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const AddDeck = () => {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [ deckCards, setDeckCards ] = useState([]);
    const [ deckProperties, setDeckProperties ] = useState({
        title: '',
        isPublic: true,
        total: 0,
    });

    const [ searchedCards, setSearchedCards ] = useState([]);
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
        searchedCards,
        setSearchedCards,
        // Palabra a buscar
        searchWord,
        setSearchWord
    };

    const handleTitleChange = (e) => {
        setDeckProperties({...deckProperties, title: e.target.value});
    }

    const handleSaveDeck = () => {
        
        // Logged user info
        const { user: { data: {id: user_id} }} = authContext;
        
        // Deck info
        const { title, isPublic, total } = deckProperties;

        const cards = deckCards.map(card => {
            return {
                id: card.id,
                quantity: card.quantity
            }
        });

        const deckObj = {
            userId: user_id,
            title: title,
            isPublic: isPublic,
            total: total,
            cards: cards
        }

        // createDeck(deckObj);
        createDeck(deckObj).then(deckCreated => {
            console.log('deckCreated', deckCreated);
            if(deckCreated) {
                navigate('/my-decks', {replace: true});
            }
        })
    }

    return (
        <ImportTheme>
            <AddDeckContext.Provider value={ contextData }>
                    {/* CAJA */}
                    <Grid container spacing={2} id='add-deck'>
                        {/* FILA 1 */}
                        <Grid item xs={12}>
                            <Item>
                                <h1>Nuevo mazo</h1>
                            </Item>
                        </Grid>
                        {/* FILA 2 */}
                        <Grid item xs={12} md={6} className='title'>
                            <Input value={ searchWord } onChange={ handleTitleChange } width='100%' maxWidth='100%' placeholder='Título del mazo' />
                        </Grid>
                        <Grid item xs={12} md={6} className='total'>
                            <Item><h1>Total: {deckProperties.total}/60</h1></Item>
                        </Grid>
                        {/* FILA 3 */}
                        <Grid item xs={12}>
                            <Item>
                                <h1>Cartas</h1>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <DeckCards />
                            </Item>
                        </Grid>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* GRID PRINCIPAL */}
                        <Grid container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                            {/* FILA 1 */}
                            <Grid item xs={12} sm={12} md={12}>
                                
                            </Grid>
                            {/* FILA 2 */}
                            <Grid item xs={12} sm={12} md={12}>
                            <h1 md={4}>Título: </h1><h1 md={4}>Título: </h1>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                
                            </Grid>
                            <Grid id='grid-save-deck' item xs={12}>
                                <FloatingButton onClick={() => handleSaveDeck()} id='save-deck' text= 'Guardar' icon={ <SaveIcon sx={{ mr: 1 }} /> } />
                            </Grid>
                        </Grid>
                    </Box>

                    <SearchCards />

            </AddDeckContext.Provider>
        </ImportTheme>
    )
}
