import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip as ChartJsTooltip } from 'chart.js';
import dayjs from 'dayjs';
import React from 'react';
import Flightbook from '../../data/flightbook.json';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, BarController, ChartJsTooltip);

const FlightStatisticsStreakSlump = (): React.ReactElement => {
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Longest streak</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Longest slump</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Flightbook.flightStatistics.map((f) => {
                        return (
                            <TableRow key={f.year ?? 0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{f.year ?? 'Overall'}</TableCell>
                                <TableCell>
                                    {f.longestStreak?.numberOfDays} day{f.longestStreak?.numberOfDays === 1 ? '' : 's'}{' '}
                                    <small>
                                        ({dayjs(f.longestStreak?.from).format(`dddd MMMM Do${!f.year ? ', YYYY' : ''}`)} -{' '}
                                        {dayjs(f.longestStreak?.to).format(`dddd MMMM Do${!f.year ? ', YYYY' : ''}`)})
                                    </small>
                                </TableCell>
                                <TableCell>
                                    {!!f.longestSlump?.numberOfDays && (
                                        <>
                                            {f.longestSlump?.numberOfDays} day{f.longestSlump?.numberOfDays === 1 ? '' : 's'}{' '}
                                            <small>
                                                ({dayjs(f.longestSlump?.from).format(`dddd MMMM Do${!f.year ? ', YYYY' : ''}`)} -{' '}
                                                {dayjs(f.longestSlump?.to).format(`dddd MMMM Do${!f.year ? ', YYYY' : ''}`)})
                                            </small>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <p>
                Time since first flight: <b>{dayjs(Flightbook.flightStatistics[0].firstFlight).fromNow(true)}</b>
            </p>
            <p>
                Time since last flight (current slump): <b>{dayjs(Flightbook.flightStatistics[0].lastFlight).fromNow(true)}</b>
            </p>
        </>
    );
};

export default FlightStatisticsStreakSlump;
