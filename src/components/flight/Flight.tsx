import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import FacebookIcon from '@mui/icons-material/Facebook';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MapIcon from '@mui/icons-material/Map';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SpeedIcon from '@mui/icons-material/Speed';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import NiceLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '@thomfre/leaflet.heightgraph';
import '@thomfre/leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import L, { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { default as React, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Tracklog } from '../../models/tracklog/Tracklog';
import { setTitle } from '../../tools/SetTitle';
import UnitChip, { UnitType } from './UnitChip';

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
        const hg = L.control.heightgraph({ expand: false });
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
    const [flight, setFlight] = useState<Tracklog>();
    const [airports, setAirports] = useState<any[]>([]);
    const [error, setError] = useState(false);

    const [flightYear, setFlightYear] = useState('');

    const history = useHistory();
    const { params }: { params: { filename: string } } = useRouteMatch();

    useEffect(() => {
        setError(false);

        fetch(`/tracklogs/${params.filename}.json`)
            .then((response) => response.json())
            .then((data) => {
                setFlight(data);
                setAirports([data.geoJson.coordinates[0], data.geoJson.coordinates[data.geoJson.coordinates.length - 1]]);
                setTitle(`Flight ${data?.name}`);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            });
    }, []);

    useEffect(() => {
        setFlightYear(flight?.date?.split('-')[0] ?? '');
    }, [flight]);

    if (error) {
        return <Alert severity="error">Unable to load flight</Alert>;
    }

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
                type: 'line',
                label: 'Speed',
                data: flight.speedElevationPoints.map((p: any) => p.speed),
                fill: false,
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgba(0, 99, 132, 0.8)',
                yAxisID: 'y',
                pointRadius: 0
            },
            {
                type: 'line',
                label: 'Elevation',
                data: flight.speedElevationPoints.map((p: any) => p.elevation),
                fill: false,
                backgroundColor: 'rgb(0, 0, 132)',
                borderColor: 'rgba(0, 0, 132, 0.8)',
                yAxisID: 'y1',
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
                <Grid item md={12}>
                    <Breadcrumbs>
                        <Link to="/flights" component={NiceLink} color="inherit">
                            Flights
                        </Link>
                        {flightYear !== '' && (
                            <Link to={`/flights/${flightYear}`} component={NiceLink} color="inherit">
                                {flightYear}
                            </Link>
                        )}
                        <Typography color="text.primary" aria-current="page">
                            {flight?.name}
                        </Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item md={10} sm={12}>
                    <Typography variant="h4" sx={{ display: 'inline' }}>
                        <AirplaneTicketIcon fontSize="large" /> {flight?.name}
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="h4" textAlign="right">
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
                        onClick={() => history.push(`/aircrafts/${flight.aircraft}`)}
                        clickable
                    />
                )}
            </Stack>
            {((flight.youtube && flight.youtube.length > 0) ||
                (flight.blogpost && flight.blogpost.length > 0) ||
                (flight.facebookPost && flight.facebookPost.length > 0) ||
                (flight.gallery && flight.gallery.length > 0)) && (
                <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'column', md: 'row' }} padding={2}>
                    {flight.youtube && flight.youtube.length > 0 && (
                        <Chip
                            icon={<YouTubeIcon />}
                            label={'View on YouTube'}
                            color="secondary"
                            component="a"
                            href={flight.youtube}
                            target="_blank"
                            clickable
                        />
                    )}

                    {flight.blogpost && flight.blogpost.length > 0 && (
                        <Chip icon={<ArticleIcon />} label={'Read blog post'} color="primary" component="a" href={flight.blogpost} target="_blank" clickable />
                    )}

                    {flight.facebookPost && flight.facebookPost.length > 0 && (
                        <Chip
                            icon={<FacebookIcon />}
                            label={'View Facebook post'}
                            color="primary"
                            component="a"
                            href={flight.facebookPost}
                            target="_blank"
                            clickable
                        />
                    )}

                    {flight.gallery && flight.gallery.length > 0 && (
                        <Chip
                            icon={<PhotoLibraryIcon />}
                            label={'View image gallery'}
                            color="success"
                            component="a"
                            href={flight.gallery}
                            target="_blank"
                            clickable
                        />
                    )}
                </Stack>
            )}
            <Line
                // @ts-ignore
                type="line"
                // @ts-ignore
                data={chartData}
                options={{
                    responsive: true,
                    normalized: true,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Ground speed'
                            },
                            // @ts-ignore
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        y1: {
                            title: {
                                display: true,
                                text: 'GPS elevation'
                            },
                            // @ts-ignore
                            type: 'linear',
                            display: true,
                            position: 'right',
                            gridLines: {
                                drawOnArea: false
                            }
                        },
                        // @ts-ignore
                        x: { display: false, gridLines: { drawOnArea: false } }
                    }
                }}
            />

            {flight.youtube && flight.youtube.length > 0 && (
                <div className="youtube-container">
                    <YouTube
                        videoId={flight.youtube.split('=').pop()}
                        opts={{
                            host: 'https://www.youtube-nocookie.com',
                            playerVars: { autoplay: 0, rel: 0 }
                        }}
                    />
                </div>
            )}
        </Box>
    );
};

export default Flight;
