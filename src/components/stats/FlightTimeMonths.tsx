import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import Flightbook from '../../data/flightbook.json';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, BarController, Tooltip);

const FlightTimeMonths = (): React.ReactElement => {
    const chartData = {
        labels: Flightbook.flightTimeMonths.map((f) => f.month),
        datasets: [
            {
                type: 'line',
                label: 'Total flight time',
                data: Flightbook.flightTimeMonths.map((f) => f.flightTimeMinutes / 60),
                fill: false,
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgba(0, 99, 132, 0.8)',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'Dual time',
                data: Flightbook.flightTimeMonths.map((f) => f.dualMinutes / 60),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'PIC time',
                data: Flightbook.flightTimeMonths.map((f) => f.picMinutes / 60),
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
            // @ts-ignore
            type="line"
            // @ts-ignore
            data={chartData}
            options={{
                responsive: true,
                normalized: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context: any) => {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }

                                if (context.parsed.y !== null) {
                                    if (context.dataset.label.includes('time')) {
                                        const hours = Math.floor(context.parsed.y);
                                        const minutes = Math.round((context.parsed.y - hours) * 60);

                                        label +=
                                            minutes > 0
                                                ? `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`
                                                : `${hours} hour${hours !== 1 ? 's' : ''}`;
                                    } else {
                                        label += context.parsed.y;
                                    }
                                }

                                return label;
                            }
                        }
                    }
                },
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
