import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import MapIcon from '@mui/icons-material/Map';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tracklogs from '../../data/tracklogs.json';
import { TracklogInfo } from '../../models/tracklog/TracklogInfo';
import { setTitle } from '../../tools/SetTitle';
import { uniqueValues } from '../../tools/UniqueValues';

const Flights = (): React.ReactElement => {
    const { year, filter, airport }: { year?: string; filter?: string; airport?: string } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        setTitle('Flights');
    }, []);

    const filterYear = (year && parseInt(year, 10)) || (filter && !isNaN(parseInt(filter, 10)) && parseInt(filter, 10));
    const filterRegistration = filter && isNaN(parseInt(filter, 10)) && filter;
    const filterAirport = !!airport && airport;

    const filteredTracks = Tracklogs?.tracks
        .filter(
            (t) =>
                (!filterRegistration && !filterAirport) ||
                (filterRegistration && t.aircraft.toLowerCase() === filterRegistration.toLowerCase()) ||
                (filterAirport && t.airports.filter((a) => a.toLowerCase() === filterAirport.toLowerCase()).length > 0)
        )
        .sort((a, b) => b.date.localeCompare(a.date));

    const trackYears = filteredTracks.map((t) => parseInt(t.date.split('-')[0], 10)).filter(uniqueValues);

    const accordionExpanded = (expandedYear: number, expanded: boolean) => {
        if (filterAirport) {
            if (expanded) {
                navigate(`/flights/${expandedYear}/airport/${filterAirport}`, { replace: true });
            } else if (location.pathname.startsWith(`/flights/${expandedYear}/airport/${filterAirport}`)) {
                navigate(`/flights/airport/${filterAirport}`, { replace: true });
            }
        } else if (filterRegistration) {
            if (expanded) {
                navigate(`/flights/${expandedYear}/${filterRegistration}`, { replace: true });
            } else if (location.pathname.startsWith(`/flights/${expandedYear}/${filterRegistration}`)) {
                navigate(`/flights/${filterRegistration}`, { replace: true });
            }
        } else {
            if (expanded) {
                navigate(`/flights/${expandedYear}`, { replace: true });
            } else if (location.pathname.startsWith(`/flights/${expandedYear}`)) {
                navigate('/flights', { replace: true });
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <AirplaneTicketIcon fontSize="large" /> Flights{filterRegistration && ` - ${filterRegistration.toUpperCase()}`}
                {filterAirport && ` - ${filterAirport.toUpperCase()}`}
            </Typography>
            {filteredTracks.length === 0 && <Typography component="i">No flights found</Typography>}
            {trackYears.map((y, index) => (
                <Accordion
                    key={y}
                    defaultExpanded={(!filterYear && index === 0) || filterYear === y}
                    TransitionProps={{ unmountOnExit: true }}
                    onChange={(_event, expanded) => accordionExpanded(y, expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">
                            <DateRangeIcon /> {y}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {filteredTracks
                                .filter((t) => t.date.startsWith(`${y}-`))
                                .map((track: TracklogInfo) => (
                                    <ListItem key={track.filename} button onClick={() => navigate(`/flight/${track.filename.replace('.json', '')}`)}>
                                        <ListItemIcon>
                                            <MapIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={track.name}
                                            secondary={track.aircraft ? `${track.aircraft}${track.asPic ? ' | PIC' : ''} | ${track.date}` : track.date}
                                        />
                                        <ListItemSecondaryAction>
                                            <Hidden mdDown>
                                                {track.hasFacebookPost && (
                                                    <ListItemIcon>
                                                        <FacebookIcon color="primary" />
                                                    </ListItemIcon>
                                                )}
                                                {track.hasBlogpost && (
                                                    <ListItemIcon>
                                                        <ArticleIcon color="primary" />
                                                    </ListItemIcon>
                                                )}
                                                {track.hasYoutube && (
                                                    <ListItemIcon>
                                                        <YouTubeIcon color="secondary" />
                                                    </ListItemIcon>
                                                )}
                                                {track.hasGallery && (
                                                    <ListItemIcon>
                                                        <PhotoLibraryIcon color="success" />
                                                    </ListItemIcon>
                                                )}
                                            </Hidden>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                        </List>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<MapIcon />}
                            onClick={() =>
                                navigate(
                                    filterAirport
                                        ? `/flights/map/${y}/airport/${filterAirport}`
                                        : filterRegistration
                                        ? `/flights/map/${y}/${filterRegistration}`
                                        : `/flights/map/${y}`
                                )
                            }>
                            View all on map
                        </Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Flights;
