import Flightbook from '../../data/flightbook.json';
import { Line } from 'react-chartjs-2';
import React from 'react';

const FlightTimeMonths = (): React.ReactElement => {
    const chartData = {
        labels: Flightbook.flightTimeMonths.map((f) => f.month),
        datasets: [
            {
                type: 'line',
                label: 'Total flight time',
                data: Flightbook.flightTimeMonths.map((f) => f.flightTimeMinutes),
                fill: false,
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgba(0, 99, 132, 0.8)',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'Dual time',
                data: Flightbook.flightTimeMonths.map((f) => f.dualMinutes),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'PIC Time',
                data: Flightbook.flightTimeMonths.map((f) => f.picMinutes),
                fill: false,
                backgroundColor: 'rgb(0, 0, 132)',
                borderColor: 'rgba(0, 0, 132, 0.8)',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                type: 'bar',
                label: 'Number of flights',
                data: Flightbook.flightTimeMonths.map((f) => f.numberOfFlights),
                fill: false,
                backgroundColor: 'rgba(185, 237, 255, 0.4)',
                borderColor: 'rgba(185, 237, 255, 0.8)',
                yAxisID: 'y1'
            }
        ]
    };

    return (
        <Line
            type="line"
            data={chartData}
            options={{
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false // only want the grid lines for one axis to show up
                        }
                    }
                }
            }}
        />
    );
};

export default FlightTimeMonths;
