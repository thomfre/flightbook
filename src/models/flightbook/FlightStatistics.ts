export interface FlightStatistics {
    year?: number;
    altitudeMax: number;
    altitudeMaxFlight: string;
    altitudeAverage: number;
    speedMax: number;
    speedMaxFlight: string;
    speedAverage: number;
    distanceTotal: number;
    distanceMax: number;
    distanceMaxFlight: string;
    distanceAverage: number;
    firstFlight: string;
    lastFlight: string;
    longestSlump?: DateRange;
    longestStreak: DateRange;
}

export interface DateRange {
    from: string;
    to: string;
    numberOfDays: string;
}
