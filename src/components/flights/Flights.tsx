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
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Tracklogs from '../../data/tracklogs.json';
import { TracklogInfo } from '../../models/tracklog/TracklogInfo';
import { setTitle } from '../../tools/SetTitle';
import { uniqueValues } from '../../tools/UniqueValues';

const Flights = (): React.ReactElement => {
    const { params }: { params: { year?: string; filter?: string; airport?: string } } = useRouteMatch();
    const theme = useTheme();
    const history = useHistory();

    useEffect(() => {
        setTitle('Flights');
    }, []);

    const filterYear = (params.year && parseInt(params.year, 10)) || (params.filter && !isNaN(parseInt(params.filter, 10)) && parseInt(params.filter, 10));
    const filterRegistration = params.filter && isNaN(parseInt(params.filter, 10)) && params.filter;
    const filterAirport = !!params.airport && params.airport;

    const filteredTracks = Tracklogs?.tracks
        .filter(
            (t) =>
                (!filterRegistration && !filterAirport) ||
                (filterRegistration && t.aircraft.toLowerCase() === filterRegistration.toLowerCase()) ||
                (filterAirport && t.airports.filter((a) => a.toLowerCase() === filterAirport.toLowerCase()).length > 0)
        )
        .sort((a, b) => b.date.localeCompare(a.date));

    const trackYears = filteredTracks.map((t) => parseInt(t.date.split('-')[0], 10)).filter(uniqueValues);

    const accordionExpanded = (year: number, expanded: boolean) => {
        if (filterAirport) {
            if (expanded) {
                history.replace(`/flights/${year}/airport/${filterAirport}`);
            } else if (location.pathname.startsWith(`/flights/${year}/airport/${filterAirport}`)) {
                history.replace(`/flights/airport/${filterAirport}`);
            }
        } else if (filterRegistration) {
            if (expanded) {
                history.replace(`/flights/${year}/${filterRegistration}`);
            } else if (location.pathname.startsWith(`/flights/${year}/${filterRegistration}`)) {
                history.replace(`/flights/${filterRegistration}`);
            }
        } else {
            if (expanded) {
                history.replace(`/flights/${year}`);
            } else if (location.pathname.startsWith(`/flights/${year}`)) {
                history.replace('/flights');
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
            {trackYears.map((year, index) => (
                <Accordion
                    key={year}
                    defaultExpanded={(!filterYear && index === 0) || filterYear === year}
                    TransitionProps={{ unmountOnExit: true }}
                    onChange={(_event, expanded) => accordionExpanded(year, expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">
                            <DateRangeIcon /> {year}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {filteredTracks
                                .filter((t) => t.date.startsWith(`${year}-`))
                                .map((track: TracklogInfo) => (
                                    <ListItem key={track.filename} button onClick={() => history.push(`/flight/${track.filename.replace('.json', '')}`)}>
                                        <ListItemIcon>
                                            <MapIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={track.name} secondary={track.aircraft ? `${track.aircraft} | ${track.date}` : track.date} />
                                        <ListItemSecondaryAction>
                                            <Hidden mdDown>
                                                {track.hasGallery && (
                                                    <ListItemIcon>
                                                        <PhotoLibraryIcon color="success" />
                                                    </ListItemIcon>
                                                )}
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
                                            </Hidden>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                        </List>
                        <Link
                            to={`/flights/map/${year}`}
                            component={Button}
                            /* @ts-ignore */
                            variant="outlined"
                            color="primary"
                            startIcon={<MapIcon />}>
                            View all on map
                        </Link>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Flights;
