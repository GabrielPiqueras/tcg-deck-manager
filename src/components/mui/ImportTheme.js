import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export const ImportTheme = styled(Paper)(({ theme }) => ({
    color: theme.palette.color.paper,
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    height: '100%',
    
    // color: theme.palette.text.secondary,
}));

export const ImportTheme2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    height: '100%',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));
