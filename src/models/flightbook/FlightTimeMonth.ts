export interface FlightTimeMonth {
    month: string;
    flightTimeMinutes: number;
    nightMinutes: number;
    dualMinutes: number;
    picMinutes: number;
    numberOfFlights: number;
    landings: number;
    dualLandings: number;
    picLandings: number;
    nightLandings: number;
    airports: string[];
}
