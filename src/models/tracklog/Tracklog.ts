import { SpeedElevationPoint } from './SpeedElevationPoint';

export interface Tracklog {
    date: string;
    name: string;
    aircraft: string;
    youtube?: string;
    blogpost?: string;
    totalDistance: number;
    geoJson: GeoJSON.Feature;
    speedElevationPoints: SpeedElevationPoint[];
}
