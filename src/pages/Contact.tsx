import React from 'react';
import { Typography } from '@mui/material';

export default function Contact() {
    return (
        <>
            <Typography variant="h1" display={{xs: 'none', md: 'inherit'}}>
                Contact Me
            </Typography>
            <Typography variant="h2" display={{md: 'none'}}>
                Contact Me
            </Typography>
            <Typography variant="subtitle1">
                to be continued...
            </Typography>
        </>
    );
}
