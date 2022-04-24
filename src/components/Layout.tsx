import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React from 'react';
import UnhandledExceptionBoundary from '../components/common/UnhandledExceptionBoundary';
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
        },
        components: {
            MuiChip: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        backgroundColor: ownerState.variant === 'outlined' ? 'white' : ''
                    })
                }
            }
        }
    });

    return (
        <UnhandledExceptionBoundary>
            <ThemeProvider theme={theme}>
                <Header />
                <Container
                    maxWidth={false}
                    component="main"
                    sx={{ height: '100%', width: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}
                    style={{ padding: 0, margin: 0 }}>
                    <Container
                        sx={{ flex: '1 0 auto', paddingTop: theme.spacing(2), paddingBottom: theme.spacing(7), backgroundColor: '#fafafa' }}
                        maxWidth={false}>
                        <UnhandledExceptionBoundary>
                            <Routes />
                        </UnhandledExceptionBoundary>
                    </Container>
                    <Footer />
                </Container>
            </ThemeProvider>
        </UnhandledExceptionBoundary>
    );
};

export default Layout;
