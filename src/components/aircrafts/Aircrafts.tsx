import FlightIcon from '@mui/icons-material/Flight';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { setTitle } from '../../tools/SetTitle';
import AircraftList from './AircraftList';


const Aircrafts = (): React.ReactElement => {
    const theme = useTheme();

    useEffect(() => {
        setTitle('Aircrafts flown');
    }, []);

    return (
        <Container maxWidth={false}>
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <FlightIcon fontSize="large" /> Aircrafts flown
            </Typography>
            <AircraftList />
        </Container>
    );
};

export default Aircrafts;
