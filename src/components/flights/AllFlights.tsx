import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventIcon from '@mui/icons-material/Event';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import 'leaflet.heightgraph';
import 'leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import L from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';
import { default as React, useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import Tracklogs from '../../data/tracklogs.json';
import { Tracklog } from '../../models/tracklog/Tracklog';
import { setTitle } from '../../tools/SetTitle';

const MapAdjuster = () => {
    const map = useMap();

    useEffect(() => {
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

const AllFlights = (): React.ReactElement => {
    const navigate = useNavigate();

    const [error, setError] = useState(false);

    const [flightYear, setFlightYear] = useState<number | undefined>(undefined);

    const { year, filter, airport }: { year?: string; filter?: string; airport?: string } = useParams();

    const [tracks, setTracks] = useState<GeoJSON.Feature[]>([]);
    const [loading, setLoading] = useState(true);

    const filterRegistration = filter && isNaN(parseInt(filter, 10)) && filter;
    const filterAirport = !!airport && airport;

    const loadData = async () => {
        setError(false);

        const filteredTracks = Tracklogs?.tracks.filter(
            (t) =>
                (!filterRegistration && !filterAirport) ||
                (filterRegistration && t.aircraft.toLowerCase() === filterRegistration.toLowerCase()) ||
                (filterAirport && t.airports.filter((a) => a.toLowerCase() === filterAirport.toLowerCase()).length > 0)
        );

        const fetchedTracks = await Promise.all(
            filteredTracks
                .filter((t) => !year || t.date.split('-')[0] === year)
                .map(async (track) => {
                    const data: Tracklog = await fetch(`/tracklogs/${track.filename}`).then((response) => response.json());
                    return data.geoJson ?? null;
                })
        );

        if (!fetchedTracks || fetchedTracks.length === 0) {
            setError(true);
        } else {
            setTracks(fetchedTracks);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (year) {
            setFlightYear(parseInt(year, 10));
            setTitle(`All flights - ${year}`);
        } else {
            setFlightYear(undefined);
            setTitle('All flights');
        }

        loadData();
    }, []);

    if (error) {
        return <Alert severity="error">Unable to load flights</Alert>;
    }

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box style={{ height: '100%' }}>
            <Grid container>
                <Grid item md={12}>
                    <Breadcrumbs>
                        <Link color="inherit" onClick={() => navigate('/flights')} sx={{ cursor: 'pointer' }}>
                            Flights
                        </Link>
                        {flightYear && (
                            <Link color="inherit" onClick={() => navigate(`/flights/${flightYear}`)} sx={{ cursor: 'pointer' }}>
                                {flightYear}
                            </Link>
                        )}
                    </Breadcrumbs>
                </Grid>
                <Grid item md={10} sm={12}>
                    <Typography variant="h4" sx={{ display: 'inline' }}>
                        <AirplaneTicketIcon fontSize="large" /> All flights{filterRegistration && ` - ${filterRegistration.toUpperCase()}`}
                        {filterAirport && ` - ${filterAirport.toUpperCase()}`}
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="h4" textAlign="right">
                        {!flightYear ? 'All of time' : flightYear} <EventIcon fontSize="large" />
                    </Typography>
                </Grid>
            </Grid>
            <Box style={{ height: '95%' }}>
                <MapContainer
                    scrollWheelZoom={true}
                    style={{ height: '100%' }}
                    // @ts-ignore
                    fullscreenControl={true}
                    // @ts-ignore
                    fullscreenControlOptions={{ position: 'topleft' }}>
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png	"
                        subdomains="abcd"
                        minZoom={0}
                        maxZoom={20}
                    />
                    {tracks.map((track, index) => (
                        <GeoJSON key={index} data={track} pathOptions={{ color: 'magenta' }} />
                    ))}
                    <MapAdjuster />
                </MapContainer>
            </Box>
        </Box>
    );
};

export default AllFlights;
