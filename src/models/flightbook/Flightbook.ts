import { Aircraft } from './Aircraft';
import { Airport } from './Airport';
import { Country } from './Country';
import { FlightStatistics } from './FlightStatistics';
import { FlightTimeMonth } from './FlightTimeMonth';

export interface Flightbook {
    parentPage?: string;
    airportGallerySearch?: string;
    aircraftGallerySearch?: string;
    flickrProxyUrl?: string;
    generatedDate: string;
    aircrafts: Aircraft[];
    airports: Airport[];
    countries: Country[];
    flightTimeMonths: FlightTimeMonth[];
    flightStatistics: FlightStatistics[];
}
