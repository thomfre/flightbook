import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FlightIcon from '@mui/icons-material/Flight';
import MenuIcon from '@mui/icons-material/Menu';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import React, { useState } from 'react';
import Flightbook from '../data/flightbook.json';

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
                {Flightbook.parentPage ? (
                    <a href={Flightbook.parentPage ?? ''}>
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
