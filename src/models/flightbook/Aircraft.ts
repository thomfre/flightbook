export interface Aircraft {
    registration: string;
    type: string;
    firstFlown: string;
    lastFlown: string;
    numberOfFlights: number;
    asDual: boolean;
    asPic: boolean;
    picture?: string;
}
