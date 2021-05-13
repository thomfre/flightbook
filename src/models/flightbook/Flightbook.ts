import { Aircraft } from './Aircraft';
import { Airport } from './Airport';
import { Country } from './Country';
import { FlightTimeMonth } from './FlightTimeMonth';

export interface Flightbook {
    generatedDate: string;
    aircrafts: Aircraft[];
    airports: Airport[];
    countries: Country[];
    flightTimeMonths: FlightTimeMonth[];
}
