import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { fadeIn, merge, zoomInDown } from 'react-animations';

const headerAnimation = keyframes`${merge(fadeIn, zoomInDown)}`;
const subHeaderAnimation = keyframes`${merge(fadeIn, zoomInDown)}`;

const AnimatedHeader = styled.div`
  animation: 1s ${headerAnimation};
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(.55, .055, .675, .19);
`;

const AnimatedSubHeader = styled.div`
  0% {
    opacity: 0;
    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0)
  }

  60% {
    opacity: 1;
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
  }

  animation: 1s ${subHeaderAnimation} 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(.55, .055, .675, .19);
`;

export default function Home() {
    const theme = useTheme();
    return (
        <Box
            display="inherit"
            flexDirection="column"
            minHeight="100svh"
            alignItems="center"
            justifyContent="center"
            id="home"
        >
            <Typography variant="h2" color={theme.palette.primary.main} gutterBottom>
                <AnimatedHeader>Anthony Brignano</AnimatedHeader>
            </Typography>
            <Typography variant="button">
                <AnimatedSubHeader>Staff Software Engineer</AnimatedSubHeader>
            </Typography>
        </Box>
    );
}
