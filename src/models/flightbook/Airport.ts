export interface Airport {
    name: string;
    icao: string;
    iata: string;
    type: string;
    isoCountry: string;
    region: string;
    coordinates: number[];
    fieldElevation?: number | null;
    wikipedia: string;
    firstVisited: string;
    lastVisited: string;
    asDual: boolean;
    asPic: boolean;
    asInstructor: boolean;
    asFrom: boolean;
    asTo: boolean;
    asVia: boolean;
    distinctVisitDates: number;
    totalFlights: number;
    aircraft: string[];
    picture?: string | null;
}
