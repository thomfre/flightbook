import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon, LatLngBounds, LatLngTuple } from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Airports from '../../data/airports.json';
import Flightbook from '../../data/flightbook.json';
import { getAirportLabel } from '../../tools/AirportTools';

const AirportMap = ({ onAirportClicked }: { onAirportClicked: (icao: string) => void }): React.ReactElement => {
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

    return (
        <>
            <MapContainer
                scrollWheelZoom={true}
                style={{ minHeight: '700px' }}
                bounds={boundingBox}
                // @ts-ignore
                fullscreenControl={true}
                // @ts-ignore
                fullscreenControlOptions={{ position: 'topleft' }}>
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png	"
                    minZoom={0}
                    maxZoom={20}
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Visited airports">
                        <LayerGroup>
                            {Flightbook.airports.map((airport) => {
                                return (
                                    <Marker
                                        key={airport.icao}
                                        position={airport.coordinates as LatLngTuple}
                                        icon={airport.asPic && (airport.asFrom || airport.asTo) ? markerIconGreen : markerIconYellow}
                                        eventHandlers={{ click: () => onAirportClicked(airport.icao) }}
                                    />
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
        </>
    );
};

export default AirportMap;
