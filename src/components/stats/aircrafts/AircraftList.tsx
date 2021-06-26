import IconButton from '@material-ui/core/IconButton';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Flightbook from '../../../data/flightbook.json';
import AircraftDialog from './AircraftDialog';

const Aircraft = ({ aircraft }: { aircraft: any }): React.ReactElement => {
    const history = useHistory();
    const { params }: { params: { aircraft?: string } } = useRouteMatch();

    const locationIsAirplane = (registration: string): boolean => {
        return params.aircraft?.toLowerCase() === registration.toLowerCase();
    };

    const [detailsOpen, setDetailsOpen] = useState(locationIsAirplane(aircraft.registration));

    const infoClicked = (): void => {
        const newValue = !detailsOpen;
        setDetailsOpen(newValue);
        history.replace(newValue ? '/aircrafts/' + aircraft.registration : '/aircrafts');
    };

    const handleInfoClose = (): void => {
        setDetailsOpen(false);
    };

    return (
        <ImageListItem onClick={infoClicked} sx={{ cursor: 'pointer' }}>
            {aircraft.picture && <img src={aircraft.picture} title={aircraft.registration} loading="lazy" />}
            <ImageListItemBar
                title={aircraft.registration}
                subtitle={aircraft.type}
                actionIcon={
                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${aircraft.registration}`} onClick={infoClicked}>
                        <InfoIcon />
                    </IconButton>
                }
            />
            <AircraftDialog aircraft={aircraft} dialogOpen={detailsOpen} handleClose={handleInfoClose} />
        </ImageListItem>
    );
};

const AircraftList = (): React.ReactElement => {
    return (
        <ImageList>
            {Flightbook.aircrafts.map((aircraft) => (
                <Aircraft key={aircraft.registration} aircraft={aircraft} />
            ))}
        </ImageList>
    );
};

export default AircraftList;
