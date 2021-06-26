import Container from '@material-ui/core/Container';
import { createTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/core/styles/ThemeProvider';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Routes from './Routes';

const Layout = (): React.ReactElement => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#3f51b5'
            },
            secondary: {
                main: '#f50057'
            }
        }
    });

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
