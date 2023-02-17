import React from 'react';
import { Typography } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

function Home() {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography variant="h1" display={{xs: 'none', md: 'inherit'}}>
                    Anthony Brignano
                </Typography>
                <Typography variant="h2" display={{md: 'none'}}>
                    Anthony Brignano
                </Typography>
                <Typography variant="subtitle1">
                    Staff Software Engineer
                </Typography>
            </ThemeProvider>
        </>
    );
}

export default Home;
