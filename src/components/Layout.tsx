import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Routes from './Routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10)
    }
}));

const Layout = (): React.ReactElement => {
    const classes = useStyles();

    return (
        <div>
            <Header />
            <Container component="main" className={classes.main} maxWidth="lg">
                <Routes />
            </Container>
            <Footer />
        </div>
    );
};

export default Layout;
