import 'leaflet/dist/leaflet.css';

import { Icon, LatLngBounds, LatLngTuple } from 'leaflet';
import { List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import Avatar from '@material-ui/core/Avatar';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import Flightbook from '../../data/flightbook.json';
import React from 'react';
import dayjs from 'dayjs';

const AirportMap = (): React.ReactElement => {
    const markerIcon = new Icon({
        iconUrl: '/airport-green.svg',
        iconSize: [24, 24]
    });

    const latitudes = Flightbook.airports.flatMap((airport) => airport.coordinates[0]);
    const longitudes = Flightbook.airports.flatMap((airport) => airport.coordinates[1]);

    const boundingBox = new LatLngBounds([
        [Math.min.apply(null, latitudes), Math.min.apply(null, longitudes)],
        [Math.max.apply(null, latitudes), Math.max.apply(null, longitudes)]
    ]);

    return (
        <MapContainer scrollWheelZoom={true} style={{ minHeight: '700px' }} bounds={boundingBox}>
            <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>,
                <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                minZoom={0}
                maxZoom={20}
            />
            {Flightbook.airports.map((airport) => {
                const firstVisited = dayjs(airport.firstVisited);
                const lastVisited = dayjs(airport.lastVisited);

                return (
                    <Marker key={airport.icao} position={airport.coordinates as LatLngTuple} icon={markerIcon}>
                        <Popup maxWidth={800}>
                            {airport.picture && <img src={airport.picture ?? ''} title={airport.icao} width="100%" />}
                            <Typography variant="h5" align="center">
                                {airport.icao}
                            </Typography>
                            <Typography variant="subtitle1" align="center">
                                {airport.name}
                            </Typography>
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
                                    <ListItemText primary={airport.distinctVisitDates} secondary="Times visited (distinct visit dates)" />
                                </ListItem>
                            </List>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default AirportMap;
