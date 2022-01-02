import EventIcon from '@mui/icons-material/Event';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MapIcon from '@mui/icons-material/Map';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonIcon from '@mui/icons-material/Person';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SchoolIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Flightbook from '../../data/flightbook.json';
import Tracklogs from '../../data/tracklogs.json';
import FlickrFeed from '../common/FlickrFeed';

const AirportDialog = ({ airport, dialogOpen, handleClose }: { airport: any; dialogOpen: boolean; handleClose: any }): React.ReactElement | null => {
    const history = useHistory();

    const firstVisited = dayjs(airport?.firstVisited);
    const lastVisited = dayjs(airport?.lastVisited);

    const filteredTracklogs = Tracklogs.tracks
        .filter((t) => t.airports.filter((a) => a === airport?.icao).length > 0)
        .sort((a, b) => b.date.localeCompare(a.date));

    if (!airport) {
        return null;
    }

    return (
        <Dialog fullWidth maxWidth={false} open={dialogOpen} onClose={handleClose} sx={{ padding: 0, margin: 'auto', height: '100%', maxWidth: '1400px' }}>
            <DialogContent onClick={(e) => e.stopPropagation()} style={{ padding: 0, margin: 0 }}>
                {airport.picture && (
                    <img
                        src={airport.picture}
                        title={airport.icao}
                        loading="lazy"
                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', margin: 0, padding: 0 }}
                    />
                )}
                <Grid container>
                    <Grid item xs={12} marginBottom={2}>
                        <Typography variant="h3" align="center" paddingTop={2}>
                            {airport.icao}
                        </Typography>
                        <Stack
                            justifyContent="center"
                            spacing={1}
                            marginBottom={1}
                            alignItems="center"
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}>
                            <Typography variant="subtitle1">{airport.name}</Typography>
                            {airport.iata && (
                                <Typography variant="subtitle1" title="IATA code">
                                    {airport.iata}
                                </Typography>
                            )}
                            <Typography variant="subtitle1">{airport.type}</Typography>
                            <Typography variant="subtitle1" title="Airport region">
                                {airport.region}
                            </Typography>
                            <Typography variant="subtitle1" title="Field elevation">
                                {airport.fieldElevation} ft
                            </Typography>
                            {airport.wikipedia && (
                                <IconButton
                                    aria-label="Open Wikipedia"
                                    title="Open Wikipedia"
                                    size="small"
                                    component="a"
                                    href={airport.wikipedia}
                                    target="_blank">
                                    <OpenInNewIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                        <Stack justifyContent="center" spacing={1} alignItems="center" direction="row">
                            {!!airport.asDual && <Chip icon={<SchoolIcon />} label="Dual" title="Visited with instructor" variant="outlined" />}
                            {!!airport.asPic && (
                                <Chip icon={<PersonIcon />} label="PIC" title="Visited as pilot in command" variant="outlined" color="primary" />
                            )}
                            {!!airport.asFrom && <Chip icon={<FlightTakeoffIcon />} label="From" title="Departed from" variant="outlined" color="primary" />}
                            {!!airport.asTo && <Chip icon={<FlightLandIcon />} label="To" title="Arrived at" variant="outlined" color="primary" />}
                            {!!airport.asVia && <Chip icon={<FlightIcon />} label="Via" title="Flown via" variant="outlined" color="secondary" />}
                            {Flightbook.airportGallerySearch && (
                                <Chip
                                    icon={<PhotoLibraryIcon />}
                                    label="Search gallery"
                                    title="Search image gallery for more pictures"
                                    component="a"
                                    href={
                                        // @ts-ignore
                                        Flightbook.airportGallerySearch.replace('{AIRPORT}', airport.icao.replace('-', ''))
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
                                <ListItemText primary={`${firstVisited.format('MMMM Do, YYYY')} (${firstVisited.fromNow()})`} secondary="First visited" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EventIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${lastVisited.format('MMMM Do, YYYY')} (${lastVisited.fromNow()})`} secondary="Last visited" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FlightIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={airport.totalFlights} secondary="Number of flights to/from/via this airport" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FlightIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={airport.distinctVisitDates} secondary="Number of distinct visit dates" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FlightIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Stack direction="row" spacing={1}>
                                            {airport.aircrafts.map((a: string) => (
                                                <Chip key={a} label={a} size="small" onClick={() => history.push(`/aircrafts/${a}`)} />
                                            ))}
                                        </Stack>
                                    }
                                    secondary="Aircrafts flown here"
                                />
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
                                        <ListItem key={track.filename} button onClick={() => history.push(`/flight/${track.filename.replace('.json', '')}`)}>
                                            <ListItemIcon>
                                                <MapIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={track.name} secondary={track.date} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Link
                                    to={`/flights/airport/${airport.icao}`}
                                    component={Button}
                                    /* @ts-ignore */
                                    variant="outlined"
                                    color="primary">
                                    View more
                                </Link>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
                <Grid item lg={12} md={12} padding={2} paddingBottom={1}>
                    <FlickrFeed tag={airport.icao} />
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AirportDialog;
