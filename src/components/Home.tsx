import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, makeStyles } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import AircraftList from './stats/AircraftList';
import AirportMap from './stats/AirportMap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlightIcon from '@material-ui/icons/Flight';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightTimeMonths from './stats/FlightTimeMonths';
import HistoryIcon from '@material-ui/icons/History';
import React from 'react';

const useStyles = makeStyles((theme) => ({}));

const Home = (): React.ReactElement => {
    const classes = useStyles();

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
        <Box>
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
        </Box>
    );
};

export default Home;
