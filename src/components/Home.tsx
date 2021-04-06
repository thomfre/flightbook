import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, makeStyles } from '@material-ui/core';

import AircraftList from './stats/AircraftList';
import AirportMap from './stats/AirportMap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlightIcon from '@material-ui/icons/Flight';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightTimeMonths from './stats/FlightTimeMonths';
import HistoryIcon from '@material-ui/icons/History';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    visitedHeader: {
        marginBottom: theme.spacing(2)
    }
}));

const Home = (): React.ReactElement => {
    const classes = useStyles();

    return (
        <Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">
                        <FlightTakeoffIcon /> Airports visited
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AirportMap />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">
                        <FlightIcon /> Aircrafts flown
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AircraftList />
                </AccordionDetails>
            </Accordion>
            <Accordion>
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
