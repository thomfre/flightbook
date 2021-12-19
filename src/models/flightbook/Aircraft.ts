export interface Aircraft {
    registration: string;
    isoCountry: string;
    type: string;
    firstFlown: string;
    lastFlown: string;
    numberOfFlights: number;
    asDual: boolean;
    asPic: boolean;
    picture?: string;
}
