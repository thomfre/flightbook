import { useHistory, useLocation } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AircraftList from './aircrafts/AircraftList';
import AirportMap from './AirportMap';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightTimeMonths from './FlightTimeMonths';
import HistoryIcon from '@mui/icons-material/History';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { setTitle } from '../../tools/SetTitle';

const Home = (): React.ReactElement => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        setTitle('Statistics');
    }, []);

    const locationIs = (identifier: string, expandedIfEmpty: boolean = false): boolean => {
        const pathParts = location.pathname?.split('/');
        if (pathParts === null || pathParts.length < 1) {
            return expandedIfEmpty;
        }

        return pathParts[1].toLowerCase() === identifier.toLowerCase() || (pathParts[1] === '' && expandedIfEmpty);
    };

    const accordionExpanded = (route: string, expanded: boolean) => {
        if (expanded) {
            history.replace(`/${route}`);
        } else if (location.pathname.startsWith(`/${route}`)) {
            history.replace('/');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: '10px' }}>
            <Accordion
                defaultExpanded={locationIs('airports', true)}
                onChange={(_event, expanded) => accordionExpanded('airports', expanded)}
                TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">
                        <FlightTakeoffIcon /> Airports visited
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AirportMap />
                </AccordionDetails>
            </Accordion>
            <Accordion
                defaultExpanded={locationIs('aircrafts')}
                onChange={(_event, expanded) => accordionExpanded('aircrafts', expanded)}
                TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">
                        <FlightIcon /> Aircrafts flown
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingBottom: 0, paddingTop: 0 }}>
                    <AircraftList />
                </AccordionDetails>
            </Accordion>
            <Accordion
                defaultExpanded={locationIs('flighttime')}
                onChange={(_event, expanded) => accordionExpanded('flighttime', expanded)}
                TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">
                        <HistoryIcon /> Flight time per month
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FlightTimeMonths />
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default Home;
