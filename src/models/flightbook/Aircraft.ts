export interface Aircraft {
    registration: string;
    isoCountry: string;
    type: string;
    firstFlown: string;
    lastFlown: string;
    distinctFlightDates: number;
    numberOfFlights: number;
    numberOfAirports: number;
    asDual: boolean;
    asPic: boolean;
    picture?: string;
}
