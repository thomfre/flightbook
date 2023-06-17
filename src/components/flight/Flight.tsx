import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import FacebookIcon from '@mui/icons-material/Facebook';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SpeedIcon from '@mui/icons-material/Speed';
import TerrainIcon from '@mui/icons-material/Terrain';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import 'leaflet.heightgraph';
import 'leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';
import { default as React, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GeoJSON, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Tracklog } from '../../models/tracklog/Tracklog';
import { setTitle } from '../../tools/SetTitle';
import { getYouTubeId } from '../../tools/YouTubeTools';
import { formatNumber } from '../common/Number';
import UnitChip, { UnitType } from '../common/UnitChip';
import FlightElevation from './FlightElevation';
import Metar from './Metar';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const Flight = (): React.ReactElement => {
    const [flight, setFlight] = useState<Tracklog>();
    const [airports, setAirports] = useState<any[]>([]);
    const [error, setError] = useState(false);

    const [flightYear, setFlightYear] = useState('');

    const navigate = useNavigate();
    const { filename }: { filename?: string } = useParams();

    useEffect(() => {
        setError(false);

        if (!filename || filename.length === 0) {
            setError(true);
            return;
        }

        fetch(`/tracklogs/${filename}.json`)
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

    return (
        <>
            <Grid container>
                <Grid item md={12}>
                    <Breadcrumbs>
                        <Link color="inherit" onClick={() => navigate('/flights')} sx={{ cursor: 'pointer' }}>
                            Flights
                        </Link>
                        {flightYear !== '' && (
                            <Link color="inherit" onClick={() => navigate(`/flights/${flightYear}`)} sx={{ cursor: 'pointer' }}>
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
            <MapContainer
                scrollWheelZoom={true}
                style={{ minHeight: '700px' }}
                // @ts-ignore
                fullscreenControl={true}
                // @ts-ignore
                fullscreenControlOptions={{ position: 'topleft' }}>
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
                <UnitChip
                    icon={<TerrainIcon />}
                    label={`Max altitude: ${formatNumber(flight.altitudeMax, 'ft')}`}
                    value={flight.altitudeMax}
                    type={UnitType.Altitude}
                />
                <UnitChip
                    icon={<TerrainIcon />}
                    label={`Average altitude: ${formatNumber(flight.altitudeAverage, 'ft')}`}
                    value={flight.altitudeAverage}
                    type={UnitType.Altitude}
                />
                <UnitChip icon={<SpeedIcon />} label={`Max speed: ${flight.speedMax.toFixed(0)} kt`} value={flight.speedMax} type={UnitType.Speed} />
                <UnitChip
                    icon={<SpeedIcon />}
                    label={`Average speed: ${formatNumber(flight.speedAverage, 'kts')}`}
                    value={flight.speedAverage}
                    type={UnitType.Speed}
                />
                <UnitChip
                    icon={<MapIcon />}
                    label={`Distance: ${formatNumber(flight.totalDistance, 'nm', 1)}`}
                    value={flight.totalDistance}
                    type={UnitType.Distance}
                />

                {!!flight.asPic && <Chip icon={<PersonIcon />} label="PIC" title="Flown as pilot in command" variant="outlined" color="primary" />}

                {flight.aircraft && (
                    <Chip
                        icon={<FlightIcon />}
                        label={flight.aircraft}
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`/aircraft/${flight.aircraft}`)}
                        clickable
                    />
                )}
            </Stack>

            <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'column', md: 'row' }} padding={0}>
                <Chip icon={<FlightTakeoffIcon />} label={flight.from} onClick={() => navigate(`/airports/${flight.from}`)} clickable />
                {flight.via?.map((a) => (
                    <Chip key={a} icon={<AirlineStopsIcon />} label={a} onClick={() => navigate(`/airports/${a}`)} clickable />
                ))}
                <Chip icon={<FlightLandIcon />} label={flight.to} onClick={() => navigate(`/airports/${flight.to}`)} clickable />
            </Stack>

            {((flight.youtube && flight.youtube.length > 0) ||
                (flight.blogpost && flight.blogpost.length > 0) ||
                (flight.facebookPost && flight.facebookPost.length > 0) ||
                (flight.gallery && flight.gallery.length > 0)) && (
                <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'column', md: 'row' }} padding={2}>
                    {flight.youtube &&
                        flight.youtube.length > 0 &&
                        flight.youtube.map((y, i) => (
                            <Chip key={i} icon={<YouTubeIcon />} label={'View on YouTube'} color="secondary" component="a" href={y} target="_blank" clickable />
                        ))}

                    {flight.blogpost && flight.blogpost.length > 0 && (
                        <Chip icon={<ArticleIcon />} label={'Read blog post'} color="primary" component="a" href={flight.blogpost} clickable />
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
                            // @ts-ignore
                            gridLines: {
                                drawOnArea: false
                            }
                        },
                        // @ts-ignore
                        x: { display: false, gridLines: { drawOnArea: false } }
                    }
                }}
            />

            <Metar metars={flight.metars} />

            {flight?.youtube?.map((y, i) => (
                <div key={i} className="youtube-container">
                    <YouTube
                        videoId={getYouTubeId(y)}
                        opts={{
                            host: 'https://www.youtube-nocookie.com',
                            playerVars: { autoplay: 0, rel: 0 }
                        }}
                    />
                </div>
            ))}
        </>
    );
};

export default Flight;
