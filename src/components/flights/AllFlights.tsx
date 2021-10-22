import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventIcon from '@mui/icons-material/Event';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import NiceLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '@thomfre/leaflet.heightgraph';
import '@thomfre/leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import L from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';
import { default as React, useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Link, useRouteMatch } from 'react-router-dom';
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
    const [error, setError] = useState(false);

    const [flightYear, setFlightYear] = useState<number | undefined>(undefined);

    const { params }: { params: { year: string } } = useRouteMatch();

    const [tracks, setTracks] = useState<GeoJSON.Feature[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setError(false);

        const fetchedTracks = await Promise.all(
            Tracklogs.tracks
                .filter((t) => !params.year || t.date.split('-')[0] === params.year)
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
        if (params.year) {
            setFlightYear(parseInt(params.year, 10));
            setTitle(`All flights - ${params.year}`);
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
        <Box>
            <Grid container>
                <Grid item md={12}>
                    <Breadcrumbs>
                        <Link to="/flights" component={NiceLink} color="inherit">
                            Flights
                        </Link>
                        {flightYear && (
                            <Link to={`/flights/${flightYear}`} component={NiceLink} color="inherit">
                                {flightYear}
                            </Link>
                        )}
                    </Breadcrumbs>
                </Grid>
                <Grid item md={10} sm={12}>
                    <Typography variant="h4" sx={{ display: 'inline' }}>
                        <AirplaneTicketIcon fontSize="large" /> All flights
                    </Typography>
                </Grid>
                <Grid item md={2} sm={12}>
                    <Typography variant="h4" textAlign="right">
                        {!flightYear ? 'All of time' : flightYear} <EventIcon fontSize="large" />
                    </Typography>
                </Grid>
            </Grid>
            <MapContainer scrollWheelZoom={true} style={{ minHeight: '700px' }} fullscreenControl={true} fullscreenControlOptions={{ position: 'topleft' }}>
                <TileLayer
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>,
                <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
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
    );
};

export default AllFlights;
