import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AircraftDialog from './AircraftDialog';
import Flightbook from '../../../data/flightbook.json';
import IconButton from '@material-ui/core/IconButton';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    airplaneListItem: {
        cursor: 'pointer'
    }
}));

const Aircraft = ({ aircraft }: { aircraft: any }): React.ReactElement => {
    const location = useLocation();
    const history = useHistory();

    const locationIsAirplane = (registration: string): boolean => {
        const pathParts = location.pathname?.split('/');

        if (pathParts === null || pathParts.length < 3) {
            return false;
        }

        return pathParts[1].toLowerCase() === 'aircrafts' && pathParts[2].toLowerCase() === registration.toLowerCase();
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

    const classes = useStyles();

    return (
        <ImageListItem onClick={infoClicked} className={classes.airplaneListItem}>
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
