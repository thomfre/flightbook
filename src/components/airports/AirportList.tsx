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
import dayjs from 'dayjs';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import Flightbook from '../../data/flightbook.json';
import 'flag-icon-css/css/flag-icon.css';

const descendingComparator = (a: { [x: string]: number }, b: { [x: string]: number }, orderBy: string | number) => {
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

const AirportList = (): React.ReactElement => {
    const [orderBy, setOrderBy] = useState('');
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
                                Times visited
                            </TableSortLabel>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Flightbook.airports.sort(getComparator(order, orderBy)).map((airport) => {
                        const firstVisited = dayjs(airport.firstVisited);
                        const lastVisited = dayjs(airport.lastVisited);
                        return (
                            <TableRow key={airport.icao} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <span className={`flag-icon flag-icon-${airport.isoCountry.toLowerCase()}`}></span> {airport.icao}
                                </TableCell>
                                <TableCell>{airport.name}</TableCell>
                                <TableCell>
                                    {firstVisited.format('MMMM Do, YYYY')} ({firstVisited.fromNow()})
                                </TableCell>
                                <TableCell>
                                    {lastVisited.format('MMMM Do, YYYY')} ({lastVisited.fromNow()})
                                </TableCell>
                                <TableCell>{airport.distinctVisitDates}</TableCell>
                                <TableCell>
                                    <Hidden mdDown>
                                        <Stack justifyContent="center" spacing={1} alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
                                            {!!airport.asDual && <Chip icon={<SchoolIcon />} label="Dual" title="Visited with instructor" variant="outlined" />}
                                            {!!airport.asPic && (
                                                <Chip
                                                    icon={<PersonIcon />}
                                                    label="PIC"
                                                    title="Visited as pilot in command"
                                                    variant="outlined"
                                                    color="primary"
                                                />
                                            )}
                                            {!!airport.asFrom && (
                                                <Chip icon={<FlightTakeoffIcon />} label="From" title="Departed from" variant="outlined" color="primary" />
                                            )}
                                            {!!airport.asTo && (
                                                <Chip icon={<FlightLandIcon />} label="To" title="Arrived at" variant="outlined" color="primary" />
                                            )}
                                            {!!airport.asVia && (
                                                <Chip icon={<FlightIcon />} label="Via" title="Flown via" variant="outlined" color="secondary" />
                                            )}
                                        </Stack>
                                    </Hidden>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default AirportList;
