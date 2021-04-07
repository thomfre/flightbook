import Avatar from '@material-ui/core/Avatar/Avatar';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

const AircraftDialog = ({ aircraft, dialogOpen, handleClose }: { aircraft: any; dialogOpen: boolean; handleClose: any }): React.ReactElement => {
    const firstFlown = dayjs(aircraft.firstFlown);
    const lastFlown = dayjs(aircraft.lastFlown);

    return (
        <Dialog fullWidth maxWidth={false} open={dialogOpen} onClose={handleClose} sx={{ padding: 0, marginLeft: '10%', marginRight: '10%', height: '100%' }}>
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
    );
};

export default AircraftDialog;
