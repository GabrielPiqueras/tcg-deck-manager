import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Items } from '../components/items/Items';
import { Compare } from '../components/compare/Compare';
import { Account } from '../components/dashboard/Account';
import { Profile } from '../components/dashboard/Profile';
import { Logout } from '../components/login/Logout';
import { Pokedex } from '../components/pokedex/Pokedex';
import { PokemonInfo } from '../components/pokedex/PokemonInfo';
import { SearchCards } from '../components/dashboard/SearchCards';

export const AuthRoutes = () => {
    return (
            <>
                <Routes>
                    <Route exact path='/search-cards' element={ <SearchCards /> }></Route>
                    <Route exact path='/pokedex' element={ <Pokedex /> }></Route>
                    <Route exact path='/pokedex/:name' element={ <PokemonInfo /> }></Route>
                    <Route exact path='/items' element={ <Items /> }></Route>
                    <Route exact path='/compare' element={ <Compare /> }></Route>
                    <Route exact path='/profile' element={ <Profile /> }></Route>
                    <Route exact path='/account' element={ <Account /> }></Route>
                    <Route exact path='/logout' element={ <Logout /> }></Route>
                    <Route path="*" element={ <Navigate to='/search-cards' /> }></Route>
                </Routes>
            </>
    )
}
