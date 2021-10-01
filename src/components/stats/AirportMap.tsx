import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EventIcon from '@mui/icons-material/Event';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import dayjs from 'dayjs';
import { Icon, LatLngBounds, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Airports from '../../data/airports.json';
import Flightbook from '../../data/flightbook.json';

const AirportMap = (): React.ReactElement => {
    const markerIconGreen = new Icon({
        iconUrl: '/airport-green.svg',
        iconSize: [24, 24]
    });

    const markerIconYellow = new Icon({
        iconUrl: '/airport-yellow.svg',
        iconSize: [24, 24]
    });

    const markerIconGray = new Icon({
        iconUrl: '/airport.svg',
        iconSize: [24, 24],
        className: 'dimmed-icon'
    });

    const latitudes = Flightbook.airports.flatMap((airport) => airport.coordinates[0]);
    const longitudes = Flightbook.airports.flatMap((airport) => airport.coordinates[1]);

    const boundingBox = new LatLngBounds([
        [Math.min.apply(null, latitudes), Math.min.apply(null, longitudes)],
        [Math.max.apply(null, latitudes), Math.max.apply(null, longitudes)]
    ]);

    const getAirportLabel = (type: string): string => {
        switch (type) {
            case 'large_airport':
                return 'Large';
            case 'medium_airport':
                return 'Medium';
            case 'small_airport':
                return 'Small';
            case 'seaplane_base':
                return 'Seaplane base';
            default:
                return type;
        }
    };

    return (
        <React.Fragment>
            <MapContainer scrollWheelZoom={true} style={{ minHeight: '700px' }} bounds={boundingBox}>
                <TileLayer
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>,
                <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                    subdomains="abcd"
                    minZoom={0}
                    maxZoom={20}
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Visited airports">
                        <LayerGroup>
                            {Flightbook.airports.map((airport) => {
                                const firstVisited = dayjs(airport.firstVisited);
                                const lastVisited = dayjs(airport.lastVisited);

                                return (
                                    <Marker
                                        key={airport.icao}
                                        position={airport.coordinates as LatLngTuple}
                                        icon={airport.asPic && (airport.asFrom || airport.asTo) ? markerIconGreen : markerIconYellow}>
                                        <Popup maxWidth={800}>
                                            {airport.picture && <img src={airport.picture ?? ''} title={airport.icao} width="100%" />}
                                            <Typography variant="h5" align="center">
                                                {airport.icao}
                                            </Typography>
                                            <Typography variant="subtitle1" align="center">
                                                {airport.name}
                                            </Typography>
                                            <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
                                                {!!airport.asDual && (
                                                    <Chip icon={<SchoolIcon />} label="Dual" title="Visited with instructor" variant="outlined" />
                                                )}
                                                {!!airport.asPic && (
                                                    <Chip
                                                        icon={<PersonIcon />}
                                                        label="PIC"
                                                        title="Visited as pilot in command"
                                                        variant="outlined"
                                                        color="primary"
                                                    />
                                                )}
                                                {!!airport.asFrom && (
                                                    <Chip icon={<FlightTakeoffIcon />} label="From" title="Departed from" variant="outlined" color="primary" />
                                                )}
                                                {!!airport.asTo && (
                                                    <Chip icon={<FlightLandIcon />} label="To" title="Arrived at" variant="outlined" color="primary" />
                                                )}
                                                {!!airport.asVia && (
                                                    <Chip icon={<FlightIcon />} label="Via" title="Flown via" variant="outlined" color="secondary" />
                                                )}
                                            </Stack>
                                            <List>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <EventIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${firstVisited.format('MMMM Do, YYYY')} (${firstVisited.fromNow()})`}
                                                        secondary="First visited"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <EventIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${lastVisited.format('MMMM Do, YYYY')} (${lastVisited.fromNow()})`}
                                                        secondary="Last visited"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FlightIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={airport.distinctVisitDates} secondary="Times visited (distinct visit dates)" />
                                                </ListItem>
                                            </List>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Other airports">
                        <LayerGroup>
                            {Airports.filter(
                                (a: any) => Flightbook.airports.filter((fa) => fa.icao === a.icaoCode).length === 0 && a.type !== 'seaplane_base'
                            ).map((airport) => (
                                <Marker key={airport.icaoCode} position={[airport.latitude, airport.longitude]} icon={markerIconGray}>
                                    <Popup maxWidth={800}>
                                        <Typography variant="h5" align="center">
                                            {airport.icaoCode}
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            {airport.name}
                                        </Typography>
                                        <Box textAlign="center">
                                            <Chip label={getAirportLabel(airport.type)} />
                                        </Box>
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1} marginTop={1}>
                <Typography variant="h6">Legend:</Typography>
                <Chip
                    icon={<img src="/airport-green.svg" style={{ maxWidth: '75%', maxHeight: '75%' }} />}
                    label="Visited as PIC"
                    variant="outlined"
                    sx={{ borderRadius: '0 !important' }}
                />
                <Chip
                    icon={<img src="/airport-yellow.svg" style={{ maxWidth: '75%', maxHeight: '75%' }} />}
                    label="Only visited with instructor and/or no full stop landing/departure"
                    variant="outlined"
                    sx={{ borderRadius: '0 !important' }}
                />
                <Chip
                    icon={<img src="/airport.svg" style={{ maxWidth: '75%', maxHeight: '75%' }} className="dimmed-icon" />}
                    label="Not yet visited"
                    variant="outlined"
                    sx={{ borderRadius: '0 !important' }}
                />
            </Stack>
        </React.Fragment>
    );
};

export default AirportMap;
