import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import 'flag-icons/css/flag-icons.css';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Flightbook from '../../../data/flightbook.json';
import { uniqueValues } from '../../../tools/UniqueValues';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AirportStatisticsYearly = (): React.ReactElement => {
    const data = useMemo(() => {
        const years = Flightbook.flightTimeMonths.map((f) => f.month.split('-')[0]).filter(uniqueValues);
        const values = years.map(
            (y) =>
                Flightbook.flightTimeMonths
                    .filter((m) => m.month.startsWith(y))
                    .flatMap((m) => m.airports)
                    .filter(uniqueValues).length
        );

        return {
            labels: years,
            datasets: [
                {
                    label: 'Airports visited',
                    data: values,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        };
    }, []);

    return (
        <Line
            options={{
                responsive: true,
                normalized: true,
                scales: {
                    y: {
                        // @ts-ignore
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    // @ts-ignore
                    x: { display: true }
                }
            }}
            data={data}
        />
    );
};

export default AirportStatisticsYearly;
