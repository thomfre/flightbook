import 'leaflet/dist/leaflet.css';

import { Icon, LatLngBounds, LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import Flightbook from '../../data/flightbook.json';
import React from 'react';
import { Typography } from '@material-ui/core';
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
                        <Popup>
                            <Typography variant="h5" align="center">
                                {airport.icao}
                            </Typography>
                            <Typography variant="subtitle1" align="center">
                                {airport.name}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                                First visited: {firstVisited.format('MMMM Do, YYYY')}
                                <br />
                                Last visited: {lastVisited.format('MMMM Do, YYYY')}
                            </Typography>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default AirportMap;
