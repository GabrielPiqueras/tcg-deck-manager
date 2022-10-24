import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import CircularProgress from '@mui/material/CircularProgress';

// Grid
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Divider
import Divider from '@mui/material/Divider';

// Tables
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { getEfficienciesByType } from '../../helpers/getEfficienciesByType';

// Button
import Button from '@mui/material/Button';
import { EfficienciesList } from './EfficienciesList';

const Item = styled(Paper)(({ theme }) => ({
    color: theme.palette.color.paper,
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // color: theme.palette.text.secondary,
}));

const H3 = styled(Paper)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 'bold'
    // color: theme.palette.text.secondary,
}));

const H5 = styled(Paper)(({ theme }) => ({
    fontSize: '1.2rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
    // color: theme.palette.text.secondary,
}));


export const PokemonInfo = () => {

    const { name } = useParams();
    const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${encodeURI(name)}/`);

    const {
        // id,
        order,
        height,
        weight,
        sprites,
        stats,
        abilities
    } = !!data && data;

    let { types, moves } = !!data && data;

    let weaknesses, strengths, immunities;
    
    if ( data ) {

        // Establecer Titulo
        document.title = name[0].toUpperCase() + name.slice(1);                     

        // Obtener eficiencias
        const type1 = types[0].type.name;
        const type2 = types[1]?.type.name;
        const efficiencies = getEfficienciesByType(type1, type2);

        weaknesses = efficiencies.weaknesses;
        strengths = efficiencies.strengths;
        immunities = efficiencies.immunities;

        // Filtrar y ordenar movimientos por nivel
        moves = data && moves.filter(({move: { name }, version_group_details}) => version_group_details[0].level_learned_at !== 0)
                             .sort((a,b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at);

    }

    return (
        <>
        {
            (loading)
            ?
                <Box id='box-pokemon-info' sx={{  bgcolor: 'background.paper', color: 'color.paper', display: 'flex', alignItems: 'stretch', height: '100%', width: '100%'}}>
                    <Box id='loading-box' sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress disableShrink size={ 120 } />
                    </Box>
                </Box>
            :
            (!error && data)
                ?
                    <>
                        <title>{ name }</title>
                        <Grid id='pokemon-page' container spacing={0} sx={{ bgcolor: 'background.paper', color: 'color.paper' }}>
                            
                            {/* Nombre y número */}
                            <Grid container spacing={0} className='pokedex-title animate__animated animate__fadeIn'>
                                <Grid item xs={10}>
                                    <Item sx={{ color: 'color.paper' }}>
                                        <H3 id="pokemon-name" variant="h3">{ name }</H3>
                                    </Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item sx={{ color: 'color.paper' }}>
                                        <H3 id="pokemon-order" variant="h3">#{ order }</H3>
                                    </Item>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider xs={12}/>
                                </Grid>
                            </Grid>
                            
                            {/* Datos principales */}
                            <Grid item xs={12} sm={9} md={9} lg={9} xl={9} className='animate__animated animate__fadeIn'>
                                <H5 className="pokedex-subtitle" variant="h5"><b>Altura:</b> { (height/10).toFixed(2) } m</H5>
                                <H5 className="pokedex-subtitle" variant="h5"><b>Peso:</b> { (weight/10).toFixed(2) } kg</H5>
                                <H5 className="pokedex-subtitle" variant="h5">
                                    <b>Habilidades:</b>
                                    <ul>
                                        {
                                            abilities.map(({ability: { name }}) => {
                                                return <li key={ name }><i>{ name }</i></li>
                                            })
                                        }
                                    </ul>
                                </H5>
     
                                <EfficienciesList title='Debilidades' effs={ weaknesses } />
                                <EfficienciesList title='Resistencias' effs={ strengths } />
                                <EfficienciesList title='Inmunidades' effs={ immunities } />
                            </Grid>
                            {/* Foto y tipos */}
                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} className='animate__animated animate__fadeIn'>
                                <Item sx={{ color: 'color.paper' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <img id='pokemon-img' src={sprites.other.dream_world.front_default || sprites.other.home.front_default} alt={name} />

                                    <div id={`types-count-${types.length}`} style={{ display: 'flex', justifyContent: 'center' }}>
                                        {
                                            types.map(({type: { name }}) => {
                                                return <img key={name} className='pokemon-type' src={`/assets/types/${name}.svg`} alt={name} />
                                            })
                                            // ESTILO EN EM: style={{maxWidth: '3em', margin: '1em 0.5em'}}
                                        }
                                    </div>
                                </Item>
                            </Grid>

                            {/* Titulo stats */}
                            <Grid container spacing={0} className='animate__animated animate__fadeIn pokedex-title'>
                                <Grid item xs={12}>
                                    <Item sx={{ color: 'color.paper' }}>
                                        <H3 variant="h3">
                                        <FontAwesomeIcon icon={ faShieldHalved } />
                                        &nbsp; Stats
                                        </H3>
                                    </Item>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            {/* Tabla stats */}
                            <Grid container spacing={0} className='animate__animated animate__fadeIn'>
                                <Grid item xs={12} sm={6}>
                                    <Item>
                                        <TableContainer component={Paper} sx={{ width: '100%' }}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        {/*  */}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {stats.map(({stat: { name }, base_stat}) => (
                                                    <TableRow
                                                        key={name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" sx={{ color: 'color.paper' }}>
                                                            { name }
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ color: 'color.paper' }}>{ base_stat }</TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img style={{ maxWidth: '49%' }} src='https://i.imgur.com/pyIxEyo.png' alt='graphic' />
                                </Grid>
                            </Grid>

                            {/* Nombre y número */}
                            <Grid container spacing={0} className='pokedex-title'>
                                <Grid item xs={12}>
                                    <Item sx={{ color: 'color.paper' }}>
                                        <H3 id="pokemon-name" variant="h3">
                                            <FontAwesomeIcon icon={ faWind } />
                                            &nbsp; Movimientos
                                        </H3>
                                    </Item>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <Divider xs={12}/>
                                </Grid>
                            </Grid>

                            {/* Tabla movimientos */}
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <Item>
                                        <TableContainer component={Paper} sx={{ width: '100%' }}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" component="th" scope="row" sx={{ color: 'color.paper' }}> Nombre </TableCell>
                                                        <TableCell align="center" component="th" scope="row" sx={{ color: 'color.paper' }}> Nivel de aprendizaje </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                { moves.map(({move: { name }, version_group_details}) => 
                                                    {
                                                        return (
                                                            <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell align="center" component="td" scope="row" sx={{ color: 'color.paper' }}>
                                                                    { name }
                                                                </TableCell>
                                                                <TableCell align="center" component="td" sx={{ color: 'color.paper' }}>
                                                                    { version_group_details[0].level_learned_at }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                :
                    <p>Error</p>
        }
        </>
    )
}
