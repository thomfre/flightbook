import InfoIcon from '@mui/icons-material/Info';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import dayjs from 'dayjs';
import 'flag-icons/css/flag-icons.css';
import React from 'react';
import Flightbook from '../../data/flightbook.json';

const AircraftEntry = ({ aircraft, aircraftClicked }: { aircraft: any; aircraftClicked: (registration: string) => void }): React.ReactElement => {
    return (
        <ImageListItem onClick={() => aircraftClicked(aircraft.registration)} sx={{ cursor: 'pointer' }}>
            {aircraft.picture && <img src={aircraft.picture} title={aircraft.registration} loading="lazy" />}
            <ImageListItemBar
                title={aircraft.registration}
                subtitle={
                    <Stack direction="row" spacing={1} divider={<div>&bull;</div>}>
                        <div>
                            <span className={`flag-icon flag-icon-${aircraft.isoCountry.toLowerCase()}`}></span> {aircraft.type}
                        </div>
                        <div>
                            {aircraft.numberOfFlights} flight{aircraft.numberOfFlights !== 1 && 's'}
                        </div>
                        {aircraft.asPic && <div>PIC</div>}
                        <div>First flight: {dayjs(aircraft.firstFlown).format('MMMM Do, YYYY')}</div>
                        <div>Last flight: {dayjs(aircraft.lastFlown).format('MMMM Do, YYYY')}</div>
                    </Stack>
                }
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

const AircraftList = ({
    onAircraftClicked,
    orderBy,
    order
}: {
    onAircraftClicked: (registration: string) => void;
    orderBy: string;
    order: 'asc' | 'desc';
}): React.ReactElement => {
    const sort = (a: any, b: any): number => {
        switch (orderBy) {
            case 'first':
                return order === 'asc' ? a.firstFlown.localeCompare(b.firstFlown) : b.firstFlown.localeCompare(a.firstFlown);
            case 'last':
                return order === 'asc' ? a.lastFlown.localeCompare(b.lastFlown) : b.lastFlown.localeCompare(a.lastFlown);
            case 'number':
                return order === 'asc' ? a.numberOfFlights - b.numberOfFlights : b.numberOfFlights - a.numberOfFlights;
            default:
                return 1;
        }
    };

    return (
        <ImageList>
            {Flightbook.aircrafts
                .sort((a, b) => sort(a, b))
                .map((aircraft) => (
                    <AircraftEntry key={aircraft.registration} aircraft={aircraft} aircraftClicked={onAircraftClicked} />
                ))}
        </ImageList>
    );
};

export default AircraftList;
