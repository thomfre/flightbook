import { SpeedElevationPoint } from './SpeedElevationPoint';

export interface Tracklog {
    date: string;
    name: string;
    aircraft: string;
    from: string;
    to: string;
    via: string[];
    youtube?: string;
    blogpost?: string;
    facebookPost?: string;
    gallery?: string;
    totalDistance: number;
    geoJson: GeoJSON.Feature;
    speedElevationPoints: SpeedElevationPoint[];
}
