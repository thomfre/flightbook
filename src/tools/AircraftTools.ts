import { AircraftDetails } from '../models/flightbook/Aircraft';

export const getAircraftClassName = (aircraftClass: string): string => {
    switch (aircraftClass) {
        case 'SEP':
            return 'Single Engine Piston';
        case 'TMG':
            return 'Touring Motor Glider';
        default:
            return aircraftClass;
    }
};

export const getAircraftMakeAndModel = (aircraft: AircraftDetails): string => {
    const parts = [];

    if (aircraft.manufacturer) {
        parts.push(aircraft.manufacturer);
    }

    if (aircraft.model) {
        parts.push(aircraft.model);
    }

    return aircraft.manufacturedYear ? `${parts.join(' ')} (${aircraft.manufacturedYear})` : parts.join(' ');
};
