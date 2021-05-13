export interface Airport {
    name: string;
    icao: string;
    isoCountry: string;
    coordinates: number[];
    firstVisited: string;
    lastVisited: string;
    asDual: boolean;
    asPic: boolean;
    asFrom: boolean;
    asTo: boolean;
    asVia: boolean;
    distinctVisitDates: number;
    picture?: string;
}
