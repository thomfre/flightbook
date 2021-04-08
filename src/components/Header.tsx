import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Config from '../data/config.json';
import { Divider } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import FlightIcon from '@material-ui/icons/Flight';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import StackedLineChartIcon from '@material-ui/icons/StackedLineChart';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper
        }
    })
);

const Header = (): React.ReactElement => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const classes = useStyles();

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
                <Hidden only={['sm', 'xs']}>
                    <Typography variant="h6">Flightbook</Typography>
                </Hidden>
            </Toolbar>
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <List className={classes.drawer}>
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
