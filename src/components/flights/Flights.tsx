import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Container from '@material-ui/core/Container';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlightIcon from '@material-ui/icons/Flight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import { default as React } from 'react';
import Tracklogs from '../../data/tracklogs.json';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch } from 'react-router-dom';

const Flights = (): React.ReactElement => {
    const { params }: { params: { filter?: string } } = useRouteMatch();

    const filteredTracks = Tracklogs?.tracks.filter((t) => !params.filter || t.aircraft === params.filter).sort((a, b) => b.date.localeCompare(a.date));

    const trackYears = filteredTracks.map((t) => t.date.split('-')[0]).filter((v, i, a) => a.indexOf(v) === i);

    return (
        <Container maxWidth="lg">
            <Typography variant="h3">
                <FlightIcon fontSize="large" /> Flights{params.filter && ` - ${params.filter}`}
            </Typography>
            {filteredTracks.length === 0 && <Typography component="i">No flights found</Typography>}
            {trackYears.map((year, index) => (
                <Accordion defaultExpanded={index === 0} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">
                            <DateRangeIcon /> {year}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {filteredTracks
                                .filter((t) => t.date.startsWith(`${year}-`))
                                .map((track) => (
                                    <ListItem key={track.filename} button component="a" href={`/flight/${track.filename.replace('.json', '')}`}>
                                        <ListItemIcon>
                                            <MapIcon />
                                        </ListItemIcon>
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
