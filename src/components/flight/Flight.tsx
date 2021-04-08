import '@thomfre/leaflet.heightgraph';
import '@thomfre/leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import 'chartjs-plugin-zoom';
import 'hammerjs';
import 'leaflet/dist/leaflet.css';

import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L, { Icon, LatLngTuple } from 'leaflet';
import { default as React, useEffect, useState } from 'react';
import UnitChip, { UnitType } from './UnitChip';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';
import MapIcon from '@material-ui/icons/Map';
import SpeedIcon from '@material-ui/icons/Speed';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch } from 'react-router-dom';

const FlightElevation = ({ data }: { data: any }) => {
    const map = useMap();

    useEffect(() => {
        const heightgraphData = [
            {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: data,
                        properties: {
                            attributeType: '3'
                        }
                    }
                ],
                properties: {
                    summary: 'Elevation'
                }
            }
        ];

        // @ts-ignore
        const hg = L.control.heightgraph();
        hg.addTo(map);
        hg.addData(heightgraphData);

        const group = new L.FeatureGroup();

        map.eachLayer((layer) => {
            // @ts-ignore
            if (layer.getBounds || layer.getLatLng) {
                group.addLayer(layer);
            }
        });

        map.fitBounds(group.getBounds());
    }, []);

    return null;
};

const Flight = (): React.ReactElement => {
    const [flight, setFlight] = useState<any>();
    const [airports, setAirports] = useState<any[]>([]);

    const { params }: { params: { filename: string } } = useRouteMatch();

    useEffect(() => {
        fetch(`/tracklogs/${params.filename}.json`)
            .then((response) => response.json())
            .then((data) => {
                setFlight(data);
                setAirports([data.geoJson.coordinates[0], data.geoJson.coordinates[data.geoJson.coordinates.length - 1]]);
            });
    }, []);

    if (!flight || airports.length === 0) {
        return <CircularProgress />;
    }

    const markerIconGreen = new Icon({
        iconUrl: '/airport-green.svg',
        iconSize: [24, 24]
    });

    const chartData = {
        labels: Array.from({ length: flight.speedElevationPoints.length }, (x, i) => i),
        datasets: [
            {
                label: 'Speed',
                data: flight.speedElevationPoints.map((p: any) => p.speed),
                fill: false,
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgba(0, 99, 132, 0.8)',
                yAxisID: 'y-axis-1',
                pointRadius: 0
            },
            {
                label: 'Elevation',
                data: flight.speedElevationPoints.map((p: any) => p.elevation),
                fill: false,
                backgroundColor: 'rgb(0, 0, 132)',
                borderColor: 'rgba(0, 0, 132, 0.8)',
                yAxisID: 'y-axis-2',
                pointRadius: 0
            }
        ]
    };

    const getAverage = (array: number[]): number => {
        const sum = array.reduce((a, b) => a + b, 0);
        return sum / array.length || 0;
    };

    const altitudeMax = Math.max.apply(
        null,
        flight.speedElevationPoints.map((p: any) => p.elevation)
    );
    const altitudeAverage = getAverage(flight.speedElevationPoints.map((p: any) => p.elevation));

    const speedMax = Math.max.apply(
        null,
        flight.speedElevationPoints.map((p: any) => p.speed)
    );
    const speedAverage = getAverage(flight.speedElevationPoints.map((p: any) => p.speed));

    return (
        <Box>
            <Grid container>
                <Grid item md={10} sm={12}>
                    <Typography variant="h3">
                        <FlightIcon fontSize="large" /> {flight?.name}
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="h3" textAlign="right">
                        {flight?.date} <EventIcon fontSize="large" />
                    </Typography>
                </Grid>
            </Grid>
            <MapContainer scrollWheelZoom={true} style={{ minHeight: '700px' }}>
                <TileLayer
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>,
                <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                    subdomains="abcd"
                    minZoom={0}
                    maxZoom={20}
                />
                <GeoJSON data={flight?.geoJson} pathOptions={{ color: 'magenta' }} />
                {airports.map((airport) => {
                    return <Marker key={airport} position={[airport[1], airport[0]] as LatLngTuple} icon={markerIconGreen}></Marker>;
                })}
                <FlightElevation data={flight?.geoJson} />
            </MapContainer>
            <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'column', md: 'row' }} padding={2}>
                <UnitChip icon={<FlightTakeoffIcon />} label={`Max altitude: ${altitudeMax.toFixed(0)} ft`} value={altitudeMax} type={UnitType.Altitude} />
                <UnitChip
                    icon={<FlightTakeoffIcon />}
                    label={`Average altitude: ${altitudeAverage.toFixed(0)} ft`}
                    value={altitudeAverage}
                    type={UnitType.Altitude}
                />
                <UnitChip icon={<SpeedIcon />} label={`Max speed: ${speedMax.toFixed(0)} kt`} value={speedMax} type={UnitType.Speed} />
                <UnitChip icon={<SpeedIcon />} label={`Average speed: ${speedAverage.toFixed(0)} kt`} value={speedAverage} type={UnitType.Speed} />
                <UnitChip icon={<MapIcon />} label={`Distance: ${flight.totalDistance.toFixed(1)} nm`} value={flight.totalDistance} type={UnitType.Distance} />

                {flight.aircraft && (
                    <Chip
                        icon={<FlightIcon />}
                        label={flight.aircraft}
                        variant="outlined"
                        color="primary"
                        component="a"
                        href={`/aircrafts/${flight.aircraft}`}
                        clickable
                    />
                )}
            </Stack>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                title: {
                                    display: true,
                                    text: 'Ground speed'
                                },
                                type: 'linear',
                                display: true,
                                position: 'left',
                                id: 'y-axis-1'
                            },
                            {
                                title: {
                                    display: true,
                                    text: 'GPS elevation'
                                },
                                type: 'linear',
                                display: true,
                                position: 'right',
                                id: 'y-axis-2',
                                gridLines: {
                                    drawOnArea: false
                                }
                            }
                        ],
                        x: { display: false, gridLines: { drawOnArea: false } }
                    },
                    plugins: {
                        zoom: { pan: { enabled: true, mode: 'x' }, zoom: { enabled: true, drag: true, mode: 'x' } }
                    }
                }}
            />
        </Box>
    );
};

export default Flight;
