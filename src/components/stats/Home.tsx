import { useHistory, useLocation } from 'react-router-dom';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AircraftList from './aircrafts/AircraftList';
import AirportMap from './AirportMap';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlightIcon from '@material-ui/icons/Flight';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightTimeMonths from './FlightTimeMonths';
import HistoryIcon from '@material-ui/icons/History';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const Home = (): React.ReactElement => {
    const location = useLocation();
    const history = useHistory();

    const locationIs = (identifier: string): boolean => {
        const pathParts = location.pathname?.split('/');
        if (pathParts === null || pathParts.length < 1) {
            return false;
        }

        return pathParts[1].toLowerCase() === identifier.toLowerCase();
    };

    const accordionExpanded = (route: string, expanded: boolean) => {
        if (expanded) {
            history.replace(`/${route}`);
        } else if (location.pathname.startsWith(`/${route}`)) {
            history.replace('/');
        }
    };

    return (
        <Container maxWidth="lg">
            <Accordion
                defaultExpanded={locationIs('airports')}
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