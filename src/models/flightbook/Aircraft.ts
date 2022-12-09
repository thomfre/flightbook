export interface AircraftDetails {
    registration: string;
    isoCountry: string;
    type: string;
    manufacturer?: string | null;
    model?: string | null;
    class?: string | null;
    manufacturedYear?: number | null;
    operator: AircraftOperator;
    firstFlown: string;
    lastFlown: string;
    distinctFlightDates: number;
    numberOfFlights: number;
    numberOfAirports: number;
    asDual: boolean;
    asPic: boolean;
    picture?: string | null;
}

export interface AircraftOperator {
    name: string;
    url?: string;
    picture?: string;
}
