import React from 'react';
import { Typography } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

function Contact() {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography variant="h1" display={{xs: 'none', md: 'inherit'}}>
                    Contact Me
                </Typography>
                <Typography variant="h2" display={{md: 'none'}}>
                    Contact Me
                </Typography>
                <Typography variant="subtitle1">
                    to be continued...
                </Typography>
            </ThemeProvider>
        </>
    );
}

export default Contact;
