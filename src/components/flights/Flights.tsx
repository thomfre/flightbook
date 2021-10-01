import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlightIcon from '@mui/icons-material/Flight';
import MapIcon from '@mui/icons-material/Map';
import { default as React, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Tracklogs from '../../data/tracklogs.json';
import { TracklogInfo } from '../../models/tracklog/TracklogInfo';
import { setTitle } from '../../tools/SetTitle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArticleIcon from '@mui/icons-material/Article';
import { ListItemSecondaryAction } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Flights = (): React.ReactElement => {
    const { params }: { params: { year?: string; filter?: string } } = useRouteMatch();
    const theme = useTheme();
    const history = useHistory();

    useEffect(() => {
        setTitle('Flights');
    }, []);

    const filterYear = (params.year && parseInt(params.year, 10)) || (params.filter && !isNaN(parseInt(params.filter, 10)) && parseInt(params.filter, 10));
    const filterRegistration = params.filter && isNaN(parseInt(params.filter, 10)) && params.filter;

    const filteredTracks = Tracklogs?.tracks
        .filter((t) => !filterRegistration || t.aircraft === filterRegistration)
        .sort((a, b) => b.date.localeCompare(a.date));

    const trackYears = filteredTracks.map((t) => parseInt(t.date.split('-')[0], 10)).filter((v, i, a) => a.indexOf(v) === i);

    const accordionExpanded = (year: number, expanded: boolean) => {
        if (filterRegistration) {
            if (expanded) {
                history.replace(`/flights/${year}/${filterRegistration}`);
            } else if (location.pathname.startsWith(`/flights/${year}`)) {
                history.replace('/flights');
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
                <FlightIcon fontSize="large" /> Flights{filterRegistration && ` - ${filterRegistration}`}
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
                                    <ListItem key={track.filename} button component="a" href={`/flight/${track.filename.replace('.json', '')}`}>
                                        <ListItemIcon>
                                            <MapIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={track.name} secondary={track.aircraft ? `${track.aircraft} | ${track.date}` : track.date} />
                                        <ListItemSecondaryAction>
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
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Flights;
