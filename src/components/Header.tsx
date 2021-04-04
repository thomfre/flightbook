import AppBar from '@material-ui/core/AppBar';
import Config from '../data/config.json';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = (): React.ReactElement => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                {Config.parentPage ? (
                    <a href={Config.parentPage ?? ''}>
                        <img src="/logo.svg" alt="Logo" style={{ maxHeight: '34px', padding: '10px', filter: 'invert(1)' }} />
                    </a>
                ) : (
                    <img src="/logo.svg" alt="Logo" style={{ maxHeight: '34px', padding: '10px', filter: 'invert(1)' }} />
                )}
                <Typography variant="h6">Flightbook</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
