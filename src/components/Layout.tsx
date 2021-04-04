import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Routes from './Routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2)
    }
}));

const Layout = (): React.ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <Container component="main" className={classes.main} maxWidth="lg">
                <Routes />
            </Container>
            <Footer />
        </div>
    );
};

export default Layout;
