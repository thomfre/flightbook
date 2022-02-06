import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import 'flag-icons/css/flag-icons.css';
import React from 'react';
import AirportStatisticsGeneral from './statistics/General';
import AirportStatisticsTypes from './statistics/Types';
import AirportStatisticsYearly from './statistics/Yearly';

const AirportStatistics = ({ onAirportClicked }: { onAirportClicked: (icao: string) => void }): React.ReactElement => {
    const theme = useTheme();

    return (
        <Card variant="outlined" sx={{ marginTop: theme.spacing(2) }}>
            <CardHeader title="Statistics" />
            <CardContent>
                <Grid container>
                    <Grid item sm={12} xs={12} md={6} xl={4}>
                        <AirportStatisticsGeneral onAirportClicked={onAirportClicked} />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} xl={4}>
                        <AirportStatisticsTypes />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} xl={4}>
                        <AirportStatisticsYearly />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AirportStatistics;
