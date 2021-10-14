import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React from 'react';
import Flightbook from '../../data/flightbook.json';

const Aircraft = ({ aircraft, aircraftClicked }: { aircraft: any; aircraftClicked: (registration: string) => void }): React.ReactElement => {
    return (
        <ImageListItem onClick={() => aircraftClicked(aircraft.registration)} sx={{ cursor: 'pointer' }}>
            {aircraft.picture && <img src={aircraft.picture} title={aircraft.registration} loading="lazy" />}
            <ImageListItemBar
                title={aircraft.registration}
                subtitle={aircraft.type}
                actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${aircraft.registration}`}
                        onClick={() => aircraftClicked(aircraft.registration)}>
                        <InfoIcon />
                    </IconButton>
                }
            />
        </ImageListItem>
    );
};

const AircraftList = ({ onAircraftClicked }: { onAircraftClicked: (registration: string) => void }): React.ReactElement => {
    return (
        <ImageList>
            {Flightbook.aircrafts.map((aircraft) => (
                <Aircraft key={aircraft.registration} aircraft={aircraft} aircraftClicked={onAircraftClicked} />
            ))}
        </ImageList>
    );
};

export default AircraftList;
