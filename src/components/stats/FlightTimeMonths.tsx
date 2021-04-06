import 'chartjs-plugin-zoom';
import 'hammerjs';

import Flightbook from '../../data/flightbook.json';
import { Line } from 'react-chartjs-2';
import React from 'react';

const FlightTimeMonths = (): React.ReactElement => {
    const chartData = {
        labels: Flightbook.flightTimeMonths.map((f) => f.month),
        datasets: [
            {
                label: 'Total flight time',
                data: Flightbook.flightTimeMonths.map((f) => f.flightTimeMinutes),
                fill: false,
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgba(0, 99, 132, 0.8)'
            },
            {
                label: 'Dual time',
                data: Flightbook.flightTimeMonths.map((f) => f.dualMinutes),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.8)'
            },
            {
                label: 'PIC Time',
                data: Flightbook.flightTimeMonths.map((f) => f.picMinutes),
                fill: false,
                backgroundColor: 'rgb(0, 0, 132)',
                borderColor: 'rgba(0, 0, 132, 0.8)'
            }
        ]
    };

    return (
        <Line
            data={chartData}
            options={{ responsive: true, plugins: { zoom: { pan: { enabled: true, mode: 'x' }, zoom: { enabled: true, drag: true, mode: 'x' } } } }}
        />
    );
};

export default FlightTimeMonths;
