import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import Flightbook from '../../data/flightbook.json';
import FlightTimeMonths from './FlightTimeMonths';
import LandingMonths from './LandingMonths';

const FlightTimeStatistics = (): React.ReactElement => {
    const minYear = parseInt(Flightbook.flightTimeMonths[0].month.split('-')[0], 10);
    const maxYear = parseInt(Flightbook.flightTimeMonths.at(-1)?.month.split('-')[0] ?? minYear.toString(), 10);
    const years = Array(maxYear + 1 - minYear)
        .fill(maxYear)
        .map((x, y) => x - y);

    const [flightTimeMonths, setFlightTimeMonths] = useState(Flightbook.flightTimeMonths);
    const [selectedYear, setSelectedYear] = useState<number[] | null>([maxYear]);
    const [showEverything, setShowEverything] = useState(true);

    useEffect(() => {
        if (!selectedYear || selectedYear.length === 0 || showEverything) {
            setFlightTimeMonths(Flightbook.flightTimeMonths);
        } else {
            setFlightTimeMonths(Flightbook.flightTimeMonths.filter((f) => selectedYear.includes(parseInt(f.month.split('-')[0], 10))));
        }
    }, [selectedYear, showEverything]);

    const handleYearChange = (event: { target: { value: any } }) => {
        const {
            target: { value }
        } = event;
        setSelectedYear(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <>
            <Box flexDirection="row" display="flex" justifyContent="right">
                <FormControlLabel
                    control={<Switch value={showEverything} defaultChecked onChange={(e) => setShowEverything(e.target.checked)} />}
                    label="Show all of time"
                />
                <FormControl sx={{ minWidth: 140 }}>
                    <InputLabel id="year-select">Year</InputLabel>
                    <Select
                        labelId="year-select"
                        value={selectedYear}
                        multiple={true}
                        label="Year"
                        onChange={handleYearChange}
                        disabled={showEverything}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected?.map((value) => (
                                    <Chip key={value} label={value} sx={{ borderRadius: 2 }} />
                                ))}
                            </Box>
                        )}>
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <FlightTimeMonths data={flightTimeMonths} />
            <Divider sx={{ margin: 2 }} />
            <LandingMonths data={flightTimeMonths} />
        </>
    );
};

export default FlightTimeStatistics;
