import React, { useContext, useEffect, useState } from 'react'
import { getCards } from '../../helpers/getCards'

// Context
import { SearchContext } from '../../context/SearchContext';

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

export const SearchCards = () => {
    
    const [cards, setCards] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() => {
        getCards(searchValue).then(cards => setCards(cards));
    }, [searchValue])
    
    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid id='cards_search' container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                    <Grid container spacing={0} columns={{ xs: 12 }}>
                        <Search />
                    </Grid>
                    <Grid id='cards_search' container spacing={0} columns={{ xs: 2, sm: 8, md: 8 }}>
                        {
                            cards.map(card => 
                                <Grid item xs={1} sm={2} md={2} key={card.id}>
                                    <Item>
                                        <img src={card.small_img} alt={card.name} />
                                        <div>{ card.name }</div>
                                    </Item>
                                </Grid>
                            )
                        }
                    </Grid>
                
                </Grid>
            </Box>
        </SearchContext.Provider>
    )
}