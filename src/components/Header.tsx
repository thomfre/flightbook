import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Flightbook from '../data/flightbook.json';

const Header = (): React.ReactElement => {
    const theme = useTheme();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerWidth = 240;

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Hidden mdUp>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
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
                <Hidden smDown>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton edge="start" color="inherit" aria-label="home" title="Home" sx={{ mr: 2 }} onClick={() => history.push('/')}>
                        <HomeIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="statistics"
                        title="Statistics"
                        sx={{ mr: 2 }}
                        onClick={() => history.push('/statistics')}>
                        <StackedLineChartIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="airports"
                        title="Airports visited"
                        sx={{ mr: 2 }}
                        onClick={() => history.push('/airports')}>
                        <FlightTakeoffIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="aircrafts"
                        title="Aircrafts flown"
                        sx={{ mr: 2 }}
                        onClick={() => history.push('/aircrafts')}>
                        <FlightIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="flights" title="Flights" sx={{ mr: 2 }} onClick={() => history.push('/flights')}>
                        <AirplaneTicketIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <List sx={{ width: drawerWidth, backgroundColor: theme?.palette?.background?.paper ?? 'white' }}>
                    <ListItem>
                        <img src="/logo.svg" alt="Logo" style={{ maxHeight: '34px', maxWidth: '90%', padding: '10px' }} />
                    </ListItem>
                    <Divider />
                    <ListItem button key="home" component="a" href="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Statistics" />
                    </ListItem>
                    <ListItem button key="stats" component="a" href="/statistics">
                        <ListItemIcon>
                            <StackedLineChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Statistics" />
                    </ListItem>
                    <ListItem button key="airports" component="a" href="/airports">
                        <ListItemIcon>
                            <FlightTakeoffIcon />
                        </ListItemIcon>
                        <ListItemText primary="Airports" />
                    </ListItem>
                    <ListItem button key="aircrafts" component="a" href="/aircrafts">
                        <ListItemIcon>
                            <FlightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Aircrafts" />
                    </ListItem>
                    <ListItem button key="flights" component="a" href="/flights">
                        <ListItemIcon>
                            <AirplaneTicketIcon />
                        </ListItemIcon>
                        <ListItemText primary="Flights" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Header;
