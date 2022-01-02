import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Flightbook from '../../data/flightbook.json';
import { Airport } from '../../models/flightbook/Airport';
import { setTitle } from '../../tools/SetTitle';
import AirportDialog from './AirportDialog';
import AirportList from './AirportList';
import AirportMap from './AirportMap';
import AirportStatistics from './AirportStatistics';

const Airports = (): React.ReactElement => {
    const theme = useTheme();
    const history = useHistory();
    const { params }: { params: { airport?: string } } = useRouteMatch();

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedAirport, setSelectedAirport] = useState<Airport>();

    useEffect(() => {
        setTitle('Airports visited');
    }, []);

    const airportClicked = (icao: string): void => {
        setSelectedAirport(Flightbook.airports.filter((a) => a.icao.toLowerCase() === icao.toLowerCase())[0]);

        const newValue = !detailsOpen;
        setDetailsOpen(newValue);
        history.replace(newValue ? '/airports/' + icao : '/airports');
    };

    const handleInfoClose = (): void => {
        setDetailsOpen(false);
        history.replace('/airports');
    };

    useEffect(() => {
        if (params.airport) {
            airportClicked(params.airport);
        }
    }, []);

    return (
        <Container maxWidth={false}>
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <FlightTakeoffIcon fontSize="large" /> Airports visited
            </Typography>
            <AirportMap onAirportClicked={airportClicked} />
            <AirportList onAirportClicked={airportClicked} />
            <AirportStatistics onAirportClicked={airportClicked} />
            <AirportDialog airport={selectedAirport} dialogOpen={detailsOpen} handleClose={handleInfoClose} />
        </Container>
    );
};

export default Airports;
