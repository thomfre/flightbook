import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Routes from './Routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        flex: '1 0 auto',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10)
    }
}));

const Layout = (): React.ReactElement => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Header />
            <Container component="main" className={classes.main} maxWidth={false}>
                <Routes />
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
