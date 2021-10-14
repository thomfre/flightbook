import EventIcon from '@mui/icons-material/Event';
import FlightIcon from '@mui/icons-material/Flight';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SchoolIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import Flightbook from '../../data/flightbook.json';
import Tracklogs from '../../data/tracklogs.json';

const AircraftDialog = ({ aircraft, dialogOpen, handleClose }: { aircraft: any; dialogOpen: boolean; handleClose: any }): React.ReactElement | null => {
    const firstFlown = dayjs(aircraft?.firstFlown);
    const lastFlown = dayjs(aircraft?.lastFlown);

    const filteredTracklogs = Tracklogs.tracks.filter((t) => t.aircraft === aircraft?.registration).sort((a, b) => b.date.localeCompare(a.date));

    if (!aircraft) {
        return null;
    }

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
                            {Flightbook.aircraftGallerySearch && (
                                <Chip
                                    icon={<PhotoLibraryIcon />}
                                    label="Search gallery"
                                    title="Search image gallery for more pictures"
                                    component="a"
                                    href={
                                        // @ts-ignore
                                        Flightbook.aircraftGallerySearch.replace('{AIRCRAFT}', aircraft.registration.replace('-', ''))
                                    }
                                    target="_blank"
                                    variant="filled"
                                    color="success"
                                    clickable
                                />
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
