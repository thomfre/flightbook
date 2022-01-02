import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import 'flag-icon-css/css/flag-icons.css';
import React from 'react';
import Flightbook from '../../data/flightbook.json';
import { isoCodeToCountryName } from '../../tools/CountryTools';
import { uniqueValues } from '../../tools/UniqueValues';
import { formatNumber } from '../common/Number';
import { ConvertedValue, UnitType } from '../common/UnitChip';

const AirportStatistics = ({ onAirportClicked }: { onAirportClicked: (icao: string) => void }): React.ReactElement => {
    const airportsVisited = Flightbook.airports.length;
    const airportsVisitedAsPic = Flightbook.airports.filter((airport) => airport.asPic).length;
    const airportsVisitedAsPicWithFullStopOrDeparture = Flightbook.airports.filter((airport) => airport.asPic && (airport.asFrom || airport.asTo)).length;
    const countriesVisited = Flightbook.airports.map((airport) => airport.isoCountry).filter(uniqueValues);

    const lowestElevation = Flightbook.airports.filter((airport) => airport.fieldElevation != null).sort((a, b) => a.fieldElevation - b.fieldElevation)[0];
    const highestElevation = Flightbook.airports.filter((airport) => airport.fieldElevation != null).sort((a, b) => b.fieldElevation - a.fieldElevation)[0];

    return (
        <React.Fragment>
            <Typography component="h3" variant="h4" sx={{ marginTop: 1 }}>
                Statistics
            </Typography>
            <ul>
                <li>
                    <b>{airportsVisited}</b> airport{airportsVisited !== 1 && 's'} visited
                </li>
                <li>
                    <b>{airportsVisitedAsPic}</b> airport{airportsVisitedAsPic !== 1 && 's'} visited as PIC
                </li>
                <li>
                    <b>{airportsVisitedAsPicWithFullStopOrDeparture}</b> airport{airportsVisitedAsPicWithFullStopOrDeparture !== 1 && 's'} visited as PIC with
                    either full stop or departure
                </li>
                <li>
                    Highest elevation{' '}
                    <Tooltip title={<ConvertedValue value={highestElevation.fieldElevation} type={UnitType.Altitude} />}>
                        <b>{formatNumber(highestElevation.fieldElevation)} ft</b>
                    </Tooltip>{' '}
                    (
                    <span onClick={() => onAirportClicked(highestElevation.icao)} style={{ cursor: 'pointer' }}>
                        {highestElevation.icao}
                    </span>
                    )
                </li>
                <li>
                    Lowest elevation{' '}
                    <Tooltip title={<ConvertedValue value={lowestElevation.fieldElevation} type={UnitType.Altitude} />}>
                        <b>{formatNumber(lowestElevation.fieldElevation)} ft</b>
                    </Tooltip>{' '}
                    (
                    <span onClick={() => onAirportClicked(lowestElevation.icao)} style={{ cursor: 'pointer' }}>
                        {lowestElevation.icao}
                    </span>
                    )
                </li>
                <li>
                    <b>{countriesVisited.length}</b> {countriesVisited.length === 1 ? 'country' : 'countries'} visited
                    <ul>
                        {countriesVisited.map((countryCode) => (
                            <li key={countryCode}>
                                <span className={`flag-icon flag-icon-${countryCode.toLowerCase()}`}></span> {isoCodeToCountryName(countryCode)}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </React.Fragment>
    );
};

export default AirportStatistics;
