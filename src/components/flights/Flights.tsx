import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import { default as React } from 'react';
import Tracklogs from '../../data/tracklogs.json';

const Flights = (): React.ReactElement => {
    return (
        <Container maxWidth="lg">
            <List>
                {Tracklogs?.tracks
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((track) => (
                        <ListItem key={track.filename} button component="a" href={`/flight/${track.filename.replace('.json', '')}`}>
                            <ListItemIcon>
                                <MapIcon />
                            </ListItemIcon>
                            <ListItemText primary={track.name} secondary={track.date} />
                        </ListItem>
                    ))}
            </List>
        </Container>
    );
};

export default Flights;
