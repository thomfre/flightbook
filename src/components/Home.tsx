import { Box, Typography, makeStyles } from '@material-ui/core';

import AircraftList from './stats/AircraftList';
import AirportMap from './stats/AirportMap';
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
            <Box>
                <Typography variant="h4" className={classes.visitedHeader}>
                    <FlightTakeoffIcon /> Airports visited
                </Typography>
                <AirportMap />
            </Box>
            <Box marginTop={4}>
                <Typography variant="h4">
                    <FlightIcon /> Aircrafts flown
                </Typography>
                <AircraftList />
            </Box>
            <Box>
                <Typography variant="h4">
                    <HistoryIcon /> Flight time per month
                </Typography>
                <FlightTimeMonths />
            </Box>
        </Box>
    );
};

export default Home;
