import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { setTitle } from '../../tools/SetTitle';
import AirportList from './AirportList';
import AirportMap from './AirportMap';
import AirportStatistics from './AirportStatistics';

const Airports = (): React.ReactElement => {
    const theme = useTheme();

    useEffect(() => {
        setTitle('Airports visited');
    }, []);

    return (
        <Container maxWidth={false}>
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <FlightTakeoffIcon fontSize="large" /> Airports visited
            </Typography>
            <AirportMap />
            <AirportList />
            <AirportStatistics />
        </Container>
    );
};

export default Airports;
