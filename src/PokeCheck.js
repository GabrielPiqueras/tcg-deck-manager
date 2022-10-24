import React, { useState, useEffect, useReducer } from 'react';

// Contextos
import { ThemeContext } from './context/ThemeContext';
import { AuthContext } from './auth/AuthContext';

// Reducer
import { authReducer } from './auth/authReducer';

// Router
import { AppRouter } from './routers/AppRouter';

// For themes
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { dark, light } from './data/themes';

// CSS
import './styles/styles.scss';

const PokeCheck = () => {

    const init = () => {
      const user = localStorage.getItem('user');
      return JSON.parse(user) || { logged: false };
    } 
    
    const [ user, dispatch ] = useReducer(authReducer, [], init);
    
    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    // The light theme is used by default
    const darkIsEnabled = JSON.parse(localStorage.getItem('isDarkTheme'));
    const [ isDarkTheme, setIsDarkTheme ] = useState(darkIsEnabled || false);
    
    return (
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <AuthContext.Provider value={{ user, dispatch }}>
          <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
            <AppRouter />     
          </ThemeProvider>
        </AuthContext.Provider>
        </ThemeContext.Provider>
    )
}

export default PokeCheck;