import '@thomfre/leaflet.heightgraph';
import '@thomfre/leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';
import L from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const FlightElevation = ({ data }: { data: any }) => {
    const map = useMap();

    useEffect(() => {
        const heightgraphData = [
            {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: data,
                        properties: {
                            attributeType: '3'
                        }
                    }
                ],
                properties: {
                    summary: 'Elevation'
                }
            }
        ];

        // @ts-ignore
        const hg = window.L.control.heightgraph({ expand: false });
        hg.addTo(map);
        hg.addData(heightgraphData);

        const group = new L.FeatureGroup();

        map.eachLayer((layer) => {
            // @ts-ignore
            if (layer.getBounds || layer.getLatLng) {
                group.addLayer(layer);
            }
        });

        map.fitBounds(group.getBounds());
    }, []);

    return null;
};

export default FlightElevation;
