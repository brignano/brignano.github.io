import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Contact() {
    return (
        <Box
            display="inherit"
            flexDirection="column"
            minHeight="100svh"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h1" display={{xs: 'none', md: 'inherit'}}>
                Contact Me
            </Typography>
            <Typography variant="h2" display={{md: 'none'}}>
                Contact Me
            </Typography>
            <Typography variant="subtitle1">
                to be continued...
            </Typography>
        </Box>
    );
}
