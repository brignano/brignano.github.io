import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default function Layout() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            flexGrow="1"
        >
            <ResponsiveAppBar/>
            <Box
                display="inherit"
                flexDirection="column"
                flexGrow="1"
                alignItems="center"
                justifyContent="center"
            >
                <Outlet/>
            </Box>
        </Box>
    );
}
