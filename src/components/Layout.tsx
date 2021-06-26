import Container from '@material-ui/core/Container';
import ThemeProvider from '@material-ui/core/styles/ThemeProvider';
import createTheme from '@material-ui/system/createTheme';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Routes from './Routes';

const Layout = (): React.ReactElement => {
    const theme = createTheme({});

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Container component="main" sx={{ flex: '1 0 auto', paddingTop: theme.spacing(10), paddingBottom: theme.spacing(10) }} maxWidth={false}>
                <Routes />
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Layout;
