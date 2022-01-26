import { SpeedElevationPoint } from './SpeedElevationPoint';

export interface Tracklog {
    date: string;
    name: string;
    aircraft: string;
    from: string;
    to: string;
    via: string[];
    asPic: boolean;
    youtube?: string;
    blogpost?: string;
    facebookPost?: string;
    gallery?: string;
    altitudeMax: number;
    altitudeAverage: number;
    speedMax: number;
    speedAverage: number;
    totalDistance: number;
    metars: string[];
    geoJson: GeoJSON.Feature;
    speedElevationPoints: SpeedElevationPoint[];
}
