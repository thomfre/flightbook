import 'leaflet/dist/leaflet.css';

import { Card, CardContent, CardMedia, Chip, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar/Avatar';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import Flightbook from '../../data/flightbook.json';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import dayjs from 'dayjs';

const Aircraft = ({ aircraft }: { aircraft: any }): React.ReactElement => {
    const firstFlown = dayjs(aircraft.firstFlown);
    const lastFlown = dayjs(aircraft.lastFlown);

    return (
        <Grid item xs={12} md={6} lg={4} padding={2}>
            <Card variant="outlined">
                {aircraft.picture && <CardMedia component="img" height="140" image={aircraft.picture} title={aircraft.registration} />}
                <CardContent>
                    <Typography variant="h5" align="center">
                        {aircraft.registration}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                        {aircraft.type}
                    </Typography>
                    <Stack justifyContent="center" spacing={1} alignItems="center" direction="row">
                        {!!aircraft.asDual && <Chip icon={<SchoolIcon />} label="Dual" variant="outlined" />}
                        {!!aircraft.asPic && <Chip icon={<PersonIcon />} label="PIC" variant="outlined" color="primary" />}
                    </Stack>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${firstFlown.format('MMMM Do, YYYY')} (${firstFlown.fromNow()})`} secondary="First flown" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${lastFlown.format('MMMM Do, YYYY')} (${lastFlown.fromNow()})`} secondary="Last flown" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FlightIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={aircraft.numberOfFlights} secondary="Number of flights" />
                        </ListItem>
                    </List>
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
