import * as React from 'react';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Icons
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Router
import { useNavigate } from 'react-router-dom';

// Autocomplete
import InputAutocomplete from './InputAutocomplete';

// Pokemons
import { pokemons } from '../../data/pokemons';
import { getEfficienciesByType } from '../../helpers/getEfficienciesByType';
import { testFunction } from '../../helpers/testFunction';

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

export const Pokedex = () => {

    const inputName = useRef();
    const navigation = useNavigate();

    const handleSubmit = (e) => {      
      e.preventDefault();

      const name = document.querySelector('#pokemon').value.toLowerCase();
      navigation(`/pokedex/${name}`);
    }
  
  // En cualquier caso deberíamos llamar al then() y mostrar lo que devuelve:
    return (
        <Box sx={{ flexGrow: 1 }} style={{display: 'flex'}}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Item>
                  <form onSubmit={ handleSubmit } style={{ display: 'flex'}}>
                    <InputAutocomplete
                        id="pokemon"
                        labels={ pokemons }
                        showDialog={ false }
                      />
                    <Button id="search-btn" style={{ marginLeft: '1em'}} type="submit" variant="contained" startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}>
                    </Button>
                  </form>
              </Item>
            </Grid>
          </Grid>
        </Box>
      );
}
