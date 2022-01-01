import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip as ChartJsTooltip } from 'chart.js';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Flightbook from '../../data/flightbook.json';
import { ConvertedValue, UnitType } from '../flight/UnitChip';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, BarController, ChartJsTooltip);

const FlightStatistics = (): React.ReactElement => {
    const history = useHistory();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                        Altitude
                    </TableCell>
                    <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                        Speed
                    </TableCell>
                    <TableCell align="center" colSpan={3} sx={{ fontWeight: 'bold' }}>
                        Distance
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', borderRightWidth: 1, borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Year</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Maximum</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Average</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Maximum</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Average</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Maximum</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Average</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Flightbook.flightStatistics.map((f) => {
                    return (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{f.year ?? 'Overall'}</TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.altitudeMax} type={UnitType.Altitude} />}>
                                    <span>{f.altitudeMax} ft</span>
                                </Tooltip>{' '}
                                <IconButton size="small" onClick={() => history.push(`/flight/${f.altitudeMaxFlight}`)}>
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.altitudeAverage} type={UnitType.Altitude} />}>
                                    <span>{f.altitudeAverage} ft</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.speedMax} type={UnitType.Speed} />}>
                                    <span>{f.speedMax} kts</span>
                                </Tooltip>{' '}
                                <IconButton size="small" onClick={() => history.push(`/flight/${f.speedMaxFlight}`)}>
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.speedAverage} type={UnitType.Speed} />}>
                                    <span>{f.speedAverage} kts</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.distanceMax} type={UnitType.Distance} />}>
                                    <span>{f.distanceMax.toFixed(2)} nm</span>
                                </Tooltip>{' '}
                                <IconButton size="small" onClick={() => history.push(`/flight/${f.distanceMaxFlight}`)}>
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.distanceAverage} type={UnitType.Distance} />}>
                                    <span>{f.distanceAverage.toFixed(2)} nm</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.distanceTotal} type={UnitType.Distance} />}>
                                    <span>{f.distanceTotal.toFixed(2)} nm</span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default FlightStatistics;
