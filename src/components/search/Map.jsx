/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@chakra-ui/react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import React, { useState } from 'react';

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 41.793,
    longitude: -87.694,
    zoom: 10,
  });
  const [zoomToggle, setZoomToggle] = useState(false);
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        scrollZoom={zoomToggle}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewPort) => setViewport(viewPort)}
      >
        <GeolocateControl
          style={{
            width: 'auto',
            position: 'absolute',
            top: '1.5rem',
            left: '1.25rem',
          }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
        {/* test */}
      </ReactMapGL>
      <Button
        pos="absolute"
        top="4.25rem"
        left="1.25rem"
        zIndex="999"
        colorScheme="red"
        onClick={() => {
          setZoomToggle((prev) => !prev);
        }}
      >
        Toggle Zoom
      </Button>
    </>
  );
}
