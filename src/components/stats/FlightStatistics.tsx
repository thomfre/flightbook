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
import { useNavigate } from 'react-router-dom';
import Flightbook from '../../data/flightbook.json';
import Number from '../common/Number';
import { ConvertedValue, UnitType } from '../common/UnitChip';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, BarController, ChartJsTooltip);

const FlightStatistics = (): React.ReactElement => {
    const navigate = useNavigate();

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
                        <TableRow key={f.year ?? 0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{f.year ?? 'Overall'}</TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.altitudeMax} type={UnitType.Altitude} />}>
                                    <span>
                                        <Number value={f.altitudeMax} unit="ft" />
                                    </span>
                                </Tooltip>{' '}
                                <IconButton size="small" onClick={() => navigate(`/flight/${f.altitudeMaxFlight}`)}>
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.altitudeAverage} type={UnitType.Altitude} />}>
                                    <span>
                                        <Number value={f.altitudeAverage} unit="ft" />
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.speedMax} type={UnitType.Speed} />}>
                                    <span>
                                        <Number value={f.speedMax} unit="kts" />
                                    </span>
                                </Tooltip>{' '}
                                <IconButton size="small" onClick={() => navigate(`/flight/${f.speedMaxFlight}`)}>
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.speedAverage} type={UnitType.Speed} />}>
                                    <span>
                                        <Number value={f.speedAverage} unit="kts" />
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.distanceMax} type={UnitType.Distance} />}>
                                    <span>
                                        <Number value={f.distanceMax} numberOfDecimals={2} unit="nm" />
                                    </span>
                                </Tooltip>{' '}
                                <IconButton size="small" onClick={() => navigate(`/flight/${f.distanceMaxFlight}`)}>
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.distanceAverage} type={UnitType.Distance} />}>
                                    <span>
                                        <Number value={f.distanceAverage} numberOfDecimals={2} unit="nm" />
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={<ConvertedValue value={f.distanceTotal} type={UnitType.Distance} />}>
                                    <span>
                                        <Number value={f.distanceTotal} numberOfDecimals={2} unit="nm" />
                                    </span>
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
