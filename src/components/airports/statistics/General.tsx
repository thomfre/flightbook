import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import 'flag-icons/css/flag-icons.css';
import React, { useMemo } from 'react';
import Flightbook from '../../../data/flightbook.json';
import { isoCodeToCountryName } from '../../../tools/CountryTools';
import { uniqueValues } from '../../../tools/UniqueValues';
import { formatNumber } from '../../common/Number';
import { ConvertedValue, UnitType } from '../../common/UnitChip';

const AirportStatisticsGeneral = ({ onAirportClicked }: { onAirportClicked: (icao: string) => void }): React.ReactElement => {
    const airportsVisited = useMemo(() => Flightbook.airports.length, [Flightbook]);
    const airportsVisitedAsPic = useMemo(() => Flightbook.airports.filter((airport) => airport.asPic).length, [Flightbook]);
    const airportsVisitedAsPicWithFullStopOrDeparture = useMemo(
        () => Flightbook.airports.filter((airport) => airport.asPic && (airport.asFrom || airport.asTo)).length,
        [Flightbook]
    );

    const countriesVisited = useMemo(() => Flightbook.airports.map((airport) => airport.isoCountry).filter(uniqueValues), [Flightbook]);

    const airportsPerCountry = useMemo(() => countriesVisited.map((c) => Flightbook.airports.filter((a) => a.isoCountry === c).length), [countriesVisited]);

    const lowestElevation = useMemo(
        () => Flightbook.airports.filter((airport) => airport.fieldElevation != null).sort((a, b) => a.fieldElevation - b.fieldElevation)[0],
        [Flightbook]
    );

    const highestElevation = useMemo(
        () => Flightbook.airports.filter((airport) => airport.fieldElevation != null).sort((a, b) => b.fieldElevation - a.fieldElevation)[0],
        [Flightbook]
    );

    return (
        <ul style={{ marginTop: 0 }}>
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
                <Chip label={highestElevation.icao} size="small" onClick={() => onAirportClicked(highestElevation.icao)} />
            </li>
            <li>
                Lowest elevation{' '}
                <Tooltip title={<ConvertedValue value={lowestElevation.fieldElevation} type={UnitType.Altitude} />}>
                    <b>{formatNumber(lowestElevation.fieldElevation)} ft</b>
                </Tooltip>{' '}
                <Chip label={lowestElevation.icao} size="small" onClick={() => onAirportClicked(lowestElevation.icao)} />
            </li>
            <li>
                <b>{countriesVisited.length}</b> {countriesVisited.length === 1 ? 'country' : 'countries'} visited
                <ul>
                    {countriesVisited.map((countryCode, index) => (
                        <li key={countryCode}>
                            <span className={`fi fi-${countryCode.toLowerCase()}`}></span> {isoCodeToCountryName(countryCode)}{' '}
                            <i>
                                ({airportsPerCountry[index]} airport{airportsPerCountry[index] === 1 ? '' : 's'})
                            </i>
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    );
};

export default AirportStatisticsGeneral;
