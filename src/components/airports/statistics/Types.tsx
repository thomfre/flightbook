import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import 'flag-icons/css/flag-icons.css';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import Flightbook from '../../../data/flightbook.json';
import { uniqueValues } from '../../../tools/UniqueValues';

ChartJS.register(ArcElement, Tooltip, Legend);

const AirportStatisticsTypes = (): React.ReactElement => {
    const data = useMemo(() => {
        const types = Flightbook.airports.map((a) => a.type).filter(uniqueValues);
        const values = types.map((t) => Flightbook.airports.filter((a) => a.type === t).length);

        return {
            labels: types,
            datasets: [
                {
                    label: '# of airports',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        };
    }, []);

    return <Pie data={data} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />;
};

export default AirportStatisticsTypes;
