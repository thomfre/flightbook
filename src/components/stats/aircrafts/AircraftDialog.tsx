import Avatar from '@material-ui/core/Avatar/Avatar';
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import Stack from '@material-ui/core/Stack';
import Tracklogs from '../../../data/tracklogs.json';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

const AircraftDialog = ({ aircraft, dialogOpen, handleClose }: { aircraft: any; dialogOpen: boolean; handleClose: any }): React.ReactElement => {
    const firstFlown = dayjs(aircraft.firstFlown);
    const lastFlown = dayjs(aircraft.lastFlown);

    const filteredTracklogs = Tracklogs.tracks.filter((t) => t.aircraft === aircraft.registration).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <Dialog fullWidth maxWidth={false} open={dialogOpen} onClose={handleClose} sx={{ padding: 0, margin: 'auto', height: '100%', maxWidth: '1400px' }}>
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
                    <Grid item xs={12} marginBottom={2}>
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
                    <Grid item lg={6} md={12} padding={2}>
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
                    <Grid item lg={6} md={12} padding={2}>
                        <Typography variant="h5">Last flights</Typography>
                        {filteredTracklogs.length === 0 && <Typography component="i">No flight track logs found</Typography>}
                        {filteredTracklogs.length > 0 && (
                            <React.Fragment>
                                <List>
                                    {filteredTracklogs.slice(0, 3).map((track) => (
                                        <ListItem key={track.filename} button component="a" href={`/flight/${track.filename.replace('.json', '')}`}>
                                            <ListItemIcon>
                                                <MapIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={track.name} secondary={track.date} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Button variant="outlined" color="primary" component="a" href={`/flights/${aircraft.registration}`}>
                                    View more
                                </Button>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AircraftDialog;
