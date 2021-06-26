import { Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FlightIcon from '@material-ui/icons/Flight';
import MenuIcon from '@material-ui/icons/Menu';
import StackedLineChartIcon from '@material-ui/icons/StackedLineChart';
import React, { useState } from 'react';
import Config from '../data/config.json';

const Header = (): React.ReactElement => {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerWidth = 240;

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                {Config.parentPage ? (
                    <a href={Config.parentPage ?? ''}>
                        <img src="/logo.svg" alt="Logo" style={{ maxHeight: '34px', maxWidth: '90%', padding: '10px', filter: 'invert(1)' }} />
                    </a>
                ) : (
                    <img src="/logo.svg" alt="Logo" style={{ maxHeight: '34px', maxWidth: '90%', padding: '10px', filter: 'invert(1)' }} />
                )}
                <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    Flightbook
                </Typography>
            </Toolbar>
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <List sx={{ width: drawerWidth, backgroundColor: theme?.palette?.background?.paper ?? 'white' }}>
                    <ListItem>
                        <img src="/logo.svg" alt="Logo" style={{ maxHeight: '34px', maxWidth: '90%', padding: '10px' }} />
                    </ListItem>
                    <Divider />
                    <ListItem button key="stats" component="a" href="/">
                        <ListItemIcon>
                            <StackedLineChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Statistics" />
                    </ListItem>
                    <ListItem button key="stats" component="a" href="/flights">
                        <ListItemIcon>
                            <FlightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Flights" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Header;
