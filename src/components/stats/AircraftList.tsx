import 'leaflet/dist/leaflet.css';

import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

import Flightbook from '../../data/flightbook.json';
import React from 'react';
import dayjs from 'dayjs';

const Aircraft = ({ aircraft }: { aircraft: any }): React.ReactElement => {
    const firstFlown = dayjs(aircraft.firstFlown);
    const lastFlown = dayjs(aircraft.lastFlown);
    console.log(aircraft);
    return (
        <Grid item width={1 / 3} padding={2}>
            <Card variant="outlined">
                {aircraft.picture && <CardMedia component="img" height="140" image={aircraft.picture} title={aircraft.registration} />}
                <CardContent>
                    <Typography variant="h5" align="center">
                        {aircraft.registration}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                        {aircraft.type}
                    </Typography>
                    <Typography variant="subtitle2" align="center">
                        First flown: {firstFlown.format('MMMM Do, YYYY')}
                        <br />
                        Last flown: {lastFlown.format('MMMM Do, YYYY')}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

const AircraftList = (): React.ReactElement => {
    return (
        <Grid container>
            {Flightbook.aircrafts.map((aircraft) => (
                <Aircraft key={aircraft.registration} aircraft={aircraft} />
            ))}
        </Grid>
    );
};

export default AircraftList;
