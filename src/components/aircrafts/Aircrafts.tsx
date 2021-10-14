import FlightIcon from '@mui/icons-material/Flight';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Flightbook from '../../data/flightbook.json';
import { Aircraft } from '../../models/flightbook/Aircraft';
import { setTitle } from '../../tools/SetTitle';
import AircraftDialog from './AircraftDialog';
import AircraftList from './AircraftList';

const Aircrafts = (): React.ReactElement => {
    const theme = useTheme();
    const history = useHistory();
    const { params }: { params: { aircraft?: string } } = useRouteMatch();

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedAircraft, setSelectedAircraft] = useState<Aircraft>();

    useEffect(() => {
        setTitle('Aircrafts flown');
    }, []);

    const aircraftClicked = (registration: string): void => {
        setSelectedAircraft(Flightbook.aircrafts.filter((a) => a.registration.toLowerCase() === registration.toLowerCase())[0]);

        const newValue = !detailsOpen;
        setDetailsOpen(newValue);
        history.replace(newValue ? '/aircrafts/' + registration : '/aircrafts');
    };

    const handleInfoClose = (): void => {
        setDetailsOpen(false);
        history.replace('/aircrafts');
    };

    useEffect(() => {
        if (params.aircraft) {
            aircraftClicked(params.aircraft);
        }
    }, []);

    return (
        <Container maxWidth={false}>
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <FlightIcon fontSize="large" /> Aircrafts flown
            </Typography>
            <AircraftList onAircraftClicked={aircraftClicked} />
            <AircraftDialog aircraft={selectedAircraft} dialogOpen={detailsOpen} handleClose={handleInfoClose} />
        </Container>
    );
};

export default Aircrafts;
