import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FlightIcon from '@mui/icons-material/Flight';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Flightbook from '../../data/flightbook.json';
import { AircraftDetails } from '../../models/flightbook/Aircraft';
import { setTitle } from '../../tools/SetTitle';
import AircraftDialog from './AircraftDialog';
import AircraftList from './AircraftList';
import AircraftStatistics from './AircraftStatistics';

const Aircraft = (): React.ReactElement => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { aircraft }: { aircraft?: string } = useParams();

    const [orderBy, setOrderBy] = useState('last');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedAircraft, setSelectedAircraft] = useState<AircraftDetails>();

    useEffect(() => {
        setTitle('Aircraft flown');
    }, []);

    const aircraftClicked = (registration: string): void => {
        setSelectedAircraft(Flightbook.aircraft.filter((a) => a.registration.toLowerCase() === registration.toLowerCase())[0]);

        const newValue = !detailsOpen;
        setDetailsOpen(newValue);
        navigate(newValue ? '/aircraft/' + registration : '/aircraft', { replace: true });
    };

    const handleInfoClose = (): void => {
        setDetailsOpen(false);
        navigate('/aircraft', { replace: true });
    };

    useEffect(() => {
        if (aircraft) {
            aircraftClicked(aircraft);
        }
    }, []);

    const handleRequestSort = (event: any, property: React.SetStateAction<string>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property: React.SetStateAction<string>) => (event: any) => {
        handleRequestSort(event, property);
    };

    return (
        <Container maxWidth={false}>
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <FlightIcon fontSize="large" /> Aircraft flown
            </Typography>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Grid item>
                    <ButtonGroup style={{ marginLeft: 10 }} size="small" variant="outlined">
                        <Button variant="text" startIcon={<SortIcon />} disabled component="div">
                            Order by:
                        </Button>
                        <Button
                            variant={orderBy === 'first' ? 'contained' : undefined}
                            endIcon={orderBy === 'first' && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                            onClick={createSortHandler('first')}>
                            First flown
                        </Button>
                        <Button
                            variant={orderBy === 'last' ? 'contained' : undefined}
                            endIcon={orderBy === 'last' && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                            onClick={createSortHandler('last')}>
                            Last flown
                        </Button>
                        <Button
                            variant={orderBy === 'number' ? 'contained' : undefined}
                            endIcon={orderBy === 'number' && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                            onClick={createSortHandler('number')}>
                            Number of flights
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <AircraftList onAircraftClicked={aircraftClicked} orderBy={orderBy} order={order} />
            <AircraftStatistics onAircraftClicked={aircraftClicked} />
            <AircraftDialog aircraft={selectedAircraft} dialogOpen={detailsOpen} handleClose={handleInfoClose} />
        </Container>
    );
};

export default Aircraft;
