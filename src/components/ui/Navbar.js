import * as React from 'react';
import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// AuthContext
import { AuthContext } from '../../auth/AuthContext';

// import AdbIcon from '@mui/icons-material/Adb';

//Router
import { useNavigate } from 'react-router-dom';

// Icons for change theme
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Importo contexto 
import { ThemeContext } from '../../context/ThemeContext';

// Types context
import { types } from '../../types/types';

const pages = [
    { name: 'Pokedex', route: '/pokedex' },
    { name: 'Mazos', route: '/decks' },
    // { name: 'Objetos', route: '/items' },
    // { name: 'Comparar', route: '/compare' }
];
const settings = [
    { name: 'Mis Mazos', route: '/my-decks' },
    { name: 'Perfil', route: '/profile' },
    { name: 'Cuenta', route: '/account' },
    { name: 'Dashboard', route: '/dashboard' },
    // { name: 'Salir', route: '/logout' }
];

export const Navbar = () => {

    const authContext = useContext(AuthContext);
    const { user: { name, logged }, dispatch } = authContext;

    const navigate = useNavigate();

    const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleLogout = () => {
        setAnchorElUser(null);
        dispatch({type: types.logout});

        localStorage.removeItem('user');
        navigate('/login');
    }

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        localStorage.setItem('isDarkTheme', !isDarkTheme);
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar id="navbar" position="static">
            <Container maxWidth="xl">
            <Toolbar disableGutters>
                
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                }}
                >
                    <img src='/pokecheck_logo.svg' alt='pokecheck' style={{width: '7.5em', margin: '0em 1em 0em 0em'}} />
                </Typography>

                {/* Menú para móviles */}
                {
                    (logged)
                    &&
                    (<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                (logged)
                                &&
                                pages.map(({name, route}) => (
                                    <MenuItem key={name} onClick={ () => {
                                        handleCloseNavMenu();
                                        navigate(route);
                                    }}>
                                        <Typography textAlign="center">{name}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>)
                }

                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <img src='/pokecheck_logo.svg' alt='pokecheck' style={{width: '7.5em', margin: '0.5em 2em 0em 2.5em'}} />
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {
                        (logged)
                        &&
                        pages.map(({name, route}) => (
                            <Button
                                key={name}
                                onClick={() => navigate(route)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {name}
                            </Button>
                        ))
                    }
                </Box>
                
                {/* Icono para cambiar de tema */}
                <IconButton sx={{ ml: 1 }} onClick={ changeTheme } color="inherit">
                    { isDarkTheme ? <Brightness4Icon /> : <Brightness7Icon /> }
                </IconButton>
                {
                    (logged)
                    ?
                        (<Box sx={{ flexGrow: 0 }}>
                            
                            <Tooltip title="Menu de usuario">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    settings.map(({name, route}) => (
                                        <MenuItem key={name} onClick={ () => {
                                                handleCloseUserMenu();
                                                navigate(route);
                                            }
                                        }>
                                            <Typography textAlign="center">{name}</Typography>
                                        </MenuItem>
                                    ))
                                }
                                {/* Cerrar sesión */}
                                <MenuItem key='logout' onClick={ handleLogout }>
                                    <Typography textAlign="center">Salir</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>)
                    :
                        (<Button 
                            onClick={() => navigate('/login')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Entrar
                        </Button>)
                }
            </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
