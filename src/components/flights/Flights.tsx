import Container from '@material-ui/core/Container';
import FlightIcon from '@material-ui/icons/Flight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import { default as React } from 'react';
import Tracklogs from '../../data/tracklogs.json';
import { Typography } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';

const Flights = (): React.ReactElement => {
    const { params }: { params: { filter?: string } } = useRouteMatch();

    const filteredTracks = Tracklogs?.tracks.filter((t) => !params.filter || t.aircraft === params.filter).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <Container maxWidth="lg">
            <Typography variant="h3">
                <FlightIcon fontSize="large" /> Flights{params.filter && ` - ${params.filter}`}
            </Typography>
            <List>
                {filteredTracks.length === 0 && <Typography component="i">No flights found</Typography>}
                {filteredTracks.map((track) => (
                    <ListItem key={track.filename} button component="a" href={`/flight/${track.filename.replace('.json', '')}`}>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary={track.name} secondary={track.aircraft ? `${track.aircraft} | ${track.date}` : track.date} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Flights;
