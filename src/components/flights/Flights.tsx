import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlightIcon from '@material-ui/icons/Flight';
import MapIcon from '@material-ui/icons/Map';
import { default as React, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Tracklogs from '../../data/tracklogs.json';
import { TracklogInfo } from '../../models/tracklog/TracklogInfo';
import { setTitle } from '../../tools/SetTitle';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Flights = (): React.ReactElement => {
    const { params }: { params: { year?: string; filter?: string } } = useRouteMatch();
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
            <Typography variant="h3">
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
                                        <ListItemIcon>{track.hasYoutube ? <YouTubeIcon /> : <MapIcon />}</ListItemIcon>
                                        <ListItemText primary={track.name} secondary={track.aircraft ? `${track.aircraft} | ${track.date}` : track.date} />
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
