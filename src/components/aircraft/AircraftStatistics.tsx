import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Flightbook from '../../data/flightbook.json';
import { uniqueValues } from '../../tools/UniqueValues';

const AircraftStatistics = ({ onAircraftClicked }: { onAircraftClicked: (registration: string) => void }): React.ReactElement => {
    const theme = useTheme();

    const aircraftFlown = Flightbook.aircraft.length;
    const aircraftFlownAsPic = Flightbook.aircraft.filter((aircraft) => aircraft.asPic).length;
    const oldestAircraft = Flightbook.aircraft.sort((a, b) => a.manufacturedYear - b.manufacturedYear)[0];
    const newestAircraft = Flightbook.aircraft.sort((a, b) => b.manufacturedYear - a.manufacturedYear)[0];
    const uniqueManufacturers = Flightbook.aircraft
        .filter((aircraft) => aircraft.manufacturer && aircraft.manufacturer.length > 0)
        .map((aircraft) => aircraft.manufacturer)
        .filter(uniqueValues);
    const uniqueTypes = Flightbook.aircraft.map((aircraft) => aircraft.type).filter(uniqueValues);

    const currentYear = new Date().getFullYear();

    return (
        <Card variant="outlined" sx={{ marginTop: theme.spacing(2) }}>
            <CardHeader title="Statistics" />
            <CardContent>
                <ul style={{ marginTop: 0 }}>
                    <li>
                        <b>{aircraftFlown}</b> aircraft flown
                    </li>
                    <li>
                        <b>{aircraftFlownAsPic}</b> aircraft flown as PIC
                    </li>
                    <li>
                        Oldest aircraft flown is{' '}
                        <b>
                            ~{currentYear - oldestAircraft.manufacturedYear} year{currentYear - oldestAircraft.manufacturedYear === 1 ? '' : 's'} old (
                            {oldestAircraft.manufacturedYear})
                        </b>{' '}
                        <Chip label={oldestAircraft.registration} size="small" onClick={() => onAircraftClicked(oldestAircraft.registration)} />
                    </li>
                    <li>
                        Newest aircraft flown is{' '}
                        <b>
                            ~{currentYear - newestAircraft.manufacturedYear} year{currentYear - newestAircraft.manufacturedYear === 1 ? '' : 's'} old (
                            {newestAircraft.manufacturedYear})
                        </b>{' '}
                        <Chip label={newestAircraft.registration} size="small" onClick={() => onAircraftClicked(newestAircraft.registration)} />
                    </li>
                    <li>
                        Aircraft from <b>{uniqueManufacturers.length}</b> {uniqueManufacturers.length === 1 ? 'manufacturer' : 'manufacturers'} flown
                        <ul>
                            {uniqueManufacturers.map((manufacturer) => (
                                <li key={manufacturer}>{manufacturer}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        Aircraft from <b>{uniqueTypes.length}</b> {uniqueTypes.length === 1 ? 'model group' : 'model groups'} flown
                        <ul>
                            {uniqueTypes.map((type) => (
                                <li key={type}>{type}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
};

export default AircraftStatistics;
