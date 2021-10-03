import { Aircraft } from './Aircraft';
import { Airport } from './Airport';
import { Country } from './Country';
import { FlightTimeMonth } from './FlightTimeMonth';

export interface Flightbook {
    parentPage?: string;
    airportGallerySearch?: string;
    aircraftGallerySearch?: string;
    generatedDate: string;
    aircrafts: Aircraft[];
    airports: Airport[];
    countries: Country[];
    flightTimeMonths: FlightTimeMonth[];
}
