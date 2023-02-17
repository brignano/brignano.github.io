import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Box } from '@mui/material';

function Layout() {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <ResponsiveAppBar/>
                <Box
                    display="inherit"
                    flexDirection="column"
                    flexGrow="1"
                    alignSelf="center"
                    justifyContent="center"
                >
                    <Outlet/>
                </Box>
            </Box>

        </>
    );
}

export default Layout;
