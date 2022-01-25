import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import Chip from '@mui/material/Chip';
import Hidden from '@mui/material/Hidden';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import 'flag-icons/css/flag-icons.css';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import Flightbook from '../../data/flightbook.json';
import Number from '../common/Number';
import { ConvertedValue, UnitType } from '../common/UnitChip';

const Airport = ({ airport, airportClicked }: { airport: any; airportClicked: (icao: string) => void }): React.ReactElement => {
    const firstVisited = dayjs(airport.firstVisited);
    const lastVisited = dayjs(airport.lastVisited);

    return (
        <TableRow key={airport.icao} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} onClick={() => airportClicked(airport.icao)}>
            <TableCell component="th" scope="row">
                <span className={`fi fi-${airport.isoCountry.toLowerCase()}`}></span> {airport.icao}
            </TableCell>
            <TableCell>{airport.name}</TableCell>
            <TableCell>
                <Tooltip title={<ConvertedValue value={airport.fieldElevation} type={UnitType.Altitude} />}>
                    <span>
                        <Number value={airport.fieldElevation} unit="ft" />
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell>
                {firstVisited.format('MMMM Do, YYYY')} ({firstVisited.fromNow()})
            </TableCell>
            <TableCell>
                {lastVisited.format('MMMM Do, YYYY')} ({lastVisited.fromNow()})
            </TableCell>
            <TableCell>{airport.distinctVisitDates}</TableCell>
            <TableCell>{airport.totalFlights}</TableCell>
            <TableCell>{airport.aircrafts.length}</TableCell>
            <TableCell>
                <Hidden mdDown>
                    <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
                        {!!airport.asDual && <Chip icon={<SchoolIcon />} label="Dual" title="Visited with instructor" variant="outlined" />}
                        {!!airport.asPic && <Chip icon={<PersonIcon />} label="PIC" title="Visited as pilot in command" variant="outlined" color="primary" />}
                        {!!airport.asFrom && <Chip icon={<FlightTakeoffIcon />} label="From" title="Departed from" variant="outlined" color="primary" />}
                        {!!airport.asTo && <Chip icon={<FlightLandIcon />} label="To" title="Arrived at" variant="outlined" color="primary" />}
                        {!!airport.asVia && <Chip icon={<FlightIcon />} label="Via" title="Flown via" variant="outlined" color="secondary" />}
                    </Stack>
                </Hidden>
            </TableCell>
        </TableRow>
    );
};

const descendingComparator = (a: { [x: string]: any }, b: { [x: string]: any }, orderBy: string | number) => {
    if (orderBy === 'aircrafts') {
        if (b[orderBy].length < a[orderBy].length) {
            return -1;
        }
        if (b[orderBy].length > a[orderBy].length) {
            return 1;
        }
        return 0;
    }

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order: string, orderBy: string) => {
    return order === 'desc' ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

const AirportList = ({ onAirportClicked }: { onAirportClicked: (icao: string) => void }): React.ReactElement => {
    const [orderBy, setOrderBy] = useState('firstVisited');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const handleRequestSort = (event: any, property: React.SetStateAction<string>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property: React.SetStateAction<string>) => (event: any) => {
        handleRequestSort(event, property);
    };

    return (
        <React.Fragment>
            <Table sx={{ marginTop: 1 }}>
                <TableHead>
                    <TableRow>
                        <TableCell key="icao" sortDirection={orderBy === 'icao' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel active={orderBy === 'icao'} direction={orderBy === 'icao' ? order : 'asc'} onClick={createSortHandler('icao')}>
                                ICAO
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="name" sortDirection={orderBy === 'name' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel active={orderBy === 'name'} direction={orderBy === 'name' ? order : 'asc'} onClick={createSortHandler('name')}>
                                Airport
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="fieldElevation" sortDirection={orderBy === 'fieldElevation' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel
                                active={orderBy === 'fieldElevation'}
                                direction={orderBy === 'fieldElevation' ? order : 'asc'}
                                onClick={createSortHandler('fieldElevation')}>
                                Elevation
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="firstVisited" sortDirection={orderBy === 'firstVisited' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel
                                active={orderBy === 'firstVisited'}
                                direction={orderBy === 'firstVisited' ? order : 'asc'}
                                onClick={createSortHandler('firstVisited')}>
                                First visited
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="lastVisited" sortDirection={orderBy === 'lastVisited' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel
                                active={orderBy === 'lastVisited'}
                                direction={orderBy === 'lastVisited' ? order : 'asc'}
                                onClick={createSortHandler('lastVisited')}>
                                Last visited
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="distinctVisitDates" sortDirection={orderBy === 'distinctVisitDates' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel
                                active={orderBy === 'distinctVisitDates'}
                                direction={orderBy === 'distinctVisitDates' ? order : 'asc'}
                                onClick={createSortHandler('distinctVisitDates')}>
                                Dates visited
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="totalFlights" sortDirection={orderBy === 'totalFlights' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel
                                active={orderBy === 'totalFlights'}
                                direction={orderBy === 'totalFlights' ? order : 'asc'}
                                onClick={createSortHandler('totalFlights')}>
                                Flights
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="aircrafts" sortDirection={orderBy === 'aircrafts' ? order : false} sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel
                                active={orderBy === 'aircrafts'}
                                direction={orderBy === 'aircrafts' ? order : 'asc'}
                                onClick={createSortHandler('aircrafts')}>
                                Aircrafts
                            </TableSortLabel>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Flightbook.airports.sort(getComparator(order, orderBy)).map((airport) => {
                        return <Airport key={airport.icao} airport={airport} airportClicked={onAirportClicked} />;
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default AirportList;
