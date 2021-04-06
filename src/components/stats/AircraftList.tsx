import 'leaflet/dist/leaflet.css';

import { Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar/Avatar';
import Chip from '@material-ui/core/Chip';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import Flightbook from '../../data/flightbook.json';
import IconButton from '@material-ui/core/IconButton';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import InfoIcon from '@material-ui/icons/Info';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import Stack from '@material-ui/core/Stack';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    airplaneListItem: {
        cursor: 'pointer'
    }
}));

const Aircraft = ({ aircraft }: { aircraft: any }): React.ReactElement => {
    const firstFlown = dayjs(aircraft.firstFlown);
    const lastFlown = dayjs(aircraft.lastFlown);

    const location = useLocation();
    const history = useHistory();

    const locationIsAirplane = (registration: string): boolean => {
        const pathParts = location.pathname?.split('/');

        if (pathParts === null || pathParts.length < 3) {
            return false;
        }

        return pathParts[1].toLowerCase() === 'aircrafts' && pathParts[2].toLowerCase() === registration.toLowerCase();
    };

    const [detailsOpen, setDetailsOpen] = useState(locationIsAirplane(aircraft.registration));

    const infoClicked = (): void => {
        const newValue = !detailsOpen;
        setDetailsOpen(newValue);
        history.replace(newValue ? '/aircrafts/' + aircraft.registration : '/aircrafts');
    };

    const handleInfoClose = (): void => {
        setDetailsOpen(false);
    };

    const classes = useStyles();

    return (
        <ImageListItem onClick={infoClicked} className={classes.airplaneListItem}>
            {aircraft.picture && <img src={aircraft.picture} title={aircraft.registration} loading="lazy" />}
            <ImageListItemBar
                title={aircraft.registration}
                subtitle={aircraft.type}
                actionIcon={
                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${aircraft.registration}`} onClick={infoClicked}>
                        <InfoIcon />
                    </IconButton>
                }
            />
            <Dialog
                fullWidth
                maxWidth={false}
                open={detailsOpen}
                onClose={handleInfoClose}
                sx={{ padding: 0, marginLeft: '10%', marginRight: '10%', height: '100%' }}>
                <DialogContent onClick={(e) => e.stopPropagation()} style={{ padding: 0, margin: 0 }}>
                    {aircraft.picture && (
                        <img
                            src={aircraft.picture}
                            title={aircraft.registration}
                            loading="lazy"
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', margin: 0, padding: 0 }}
                        />
                    )}
                    <Grid container>
                        <Grid item sm={12} marginBottom={2}>
                            <Typography variant="h3" align="center" paddingTop={2}>
                                {aircraft.registration}
                            </Typography>
                            <Typography variant="subtitle1" align="center">
                                {aircraft.type}
                            </Typography>
                            <Stack justifyContent="center" spacing={1} alignItems="center" direction="row">
                                {!!aircraft.asDual && <Chip icon={<SchoolIcon />} label="Dual" title="Flown with instructor" variant="outlined" />}
                                {!!aircraft.asPic && (
                                    <Chip icon={<PersonIcon />} label="PIC" title="Flown as pilot in command" variant="outlined" color="primary" />
                                )}
                            </Stack>
                        </Grid>
                        <Grid item lg={6} sm={12} padding={2}>
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
                        </Grid>
                        <Grid item lg={6} sm={12} padding={2}>
                            <i>More data will come here</i>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </ImageListItem>
    );
};

const AircraftList = (): React.ReactElement => {
    return (
        <ImageList>
            {Flightbook.aircrafts.map((aircraft) => (
                <Aircraft key={aircraft.registration} aircraft={aircraft} />
            ))}
        </ImageList>
    );
};

export default AircraftList;
