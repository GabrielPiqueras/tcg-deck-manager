import React from 'react';

// Style themes
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// Components
import { FloatingButton } from '../mui/FloatingButton';
import AddIcon from '@mui/icons-material/Add';
import { ImportTheme } from '../mui/ImportTheme';
import { Grid } from '@mui/material';
import { Box, height } from '@mui/system';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    height: '100%',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const MyDecks = () => {
    return (
        <ImportTheme>
  
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} className='elgrid'>
                    <Grid className='title-h1' item xs={12}>
                        <Item><h1>Mis Mazos</h1></Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid id='grid-add-deck' item xs={12}>
                    <Link to="/add-deck">
                        <FloatingButton id='add-deck' text= 'Mazo' icon={ <AddIcon sx={{ mr: 1 }} /> } />
                    </Link>
                </Grid>
            </Box>
                   
            
        </ImportTheme>
    )
}

