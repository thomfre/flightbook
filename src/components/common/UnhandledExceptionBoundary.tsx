import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const reload = (): void => {
    window.location.reload();
};

const UnhandledExceptionBoundary = (props: { children: React.ReactNode }): React.ReactElement => {
    const theme = useTheme();

    return (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }): React.ReactElement => {
                return (
                    <Container sx={{ paddingTop: theme.spacing(10), paddingBottom: theme.spacing(10) }}>
                        <Alert severity="error">
                            <b>Unhandled error occurred</b>
                            <p>
                                This error was not handled properly, and caused the application to fail. Please notify us about this, and let us know what you
                                did when this happened, and the contents of the message below.
                            </p>
                            <pre>{error.message}</pre>
                            <pre>{error.stack}</pre>
                            <Button onClick={resetErrorBoundary} color="primary">
                                Reload and try again
                            </Button>{' '}
                            <Button onClick={reload}>Refresh page</Button>
                        </Alert>
                    </Container>
                );
            }}>
            {props.children}
        </ErrorBoundary>
    );
};

export default UnhandledExceptionBoundary;
