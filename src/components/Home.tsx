import { Box, Typography } from '@material-ui/core';
import { faPlane, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

import AircraftList from './stats/AircraftList';
import AirportMap from './stats/AirportMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Home = (): React.ReactElement => {
    return (
        <Box>
            <Box>
                <Typography variant="h4" marginBottom={2}>
                    <FontAwesomeIcon icon={faPlaneDeparture} /> Airports visited
                </Typography>
                <AirportMap />
            </Box>
            <Box marginTop={4}>
                <Typography variant="h4" marginBottom={2}>
                    <FontAwesomeIcon icon={faPlane} /> Aircrafts flown
                </Typography>
                <AircraftList />
            </Box>
        </Box>
    );
};

export default Home;
