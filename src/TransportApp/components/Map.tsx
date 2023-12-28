import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import 'maplibre-gl/dist/maplibre-gl.css';

import './../../App.css';

export default function Map({ onCoordinatesChange }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState('IK3R8uX8Q961oxcKDN1k');
  const [mapController, setMapController] = useState();

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-78.55499458658646, -0.29547810042325295],
      zoom: 14
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    setMapController(createMapLibreGlMapController(map.current, maplibregl));

    map.current.on('click', handleMapClick);

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [API_KEY]);

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;

    // Remove the existing marker if it exists
    if (map.current.getLayer('marker')) {
      map.current.removeLayer('marker');
      map.current.removeSource('marker');
    }

    // Add a new marker at the clicked location
    map.current.addSource('marker', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            }
          }
        ]
      }
    });

    map.current.addLayer({
      id: 'marker',
      type: 'circle',
      source: 'marker',
      paint: {
        'circle-radius': 10,
        'circle-color': '#ff0000'
      }
    });

    // Call the callback function with the updated coordinates
    if (onCoordinatesChange) {
      onCoordinatesChange({ lng, lat });
    }
  };

  return (
    <div className="map-wrap">
      <div className="geocoding">
        <GeocodingControl apiKey={API_KEY} mapController={mapController} />
      </div>
      <div ref={mapContainer} className="map" />
    </div>
  );
}
