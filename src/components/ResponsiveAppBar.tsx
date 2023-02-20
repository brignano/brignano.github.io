import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { Slide, useScrollTrigger, useTheme } from '@mui/material';

const pages = ['home', 'contact'];

// const pages = ['home', 'projects', 'resume', 'contact'];

export default function ResponsiveAppBar() {
    const theme = useTheme();
    const trigger = useScrollTrigger();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters variant="dense">
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: theme.typography.fontWeightBold,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ANT
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
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
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <NavLink to={page === 'home' ? '' : page}
                                                 style={({isActive}) =>
                                                     isActive ? {
                                                         color: 'inherit',
                                                         textDecoration: "none",
                                                     } : {
                                                         color: 'inherit',
                                                         textDecoration: "none",
                                                         opacity: ".5"

                                                     }
                                                 }>
                                            <Typography
                                                variant="button"
                                            >
                                                {page}
                                            </Typography>
                                        </NavLink>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: theme.typography.fontWeightBold,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            @brignano
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <NavLink key={page} to={page === 'home' ? '' : page}
                                         style={({isActive}) =>
                                             isActive ? {
                                                 textDecoration: "none",
                                             } : {
                                                 textDecoration: "none",
                                                 opacity: ".5"
                                             }
                                         }>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page}
                                    </Button>
                                </NavLink>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Slide>
    );
}
