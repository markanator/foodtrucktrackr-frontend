import { Box } from '@chakra-ui/react';
import mapboxGl from 'mapbox-gl';
import React, { useEffect } from 'react';

mapboxGl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default function Map() {
  useEffect(() => {
    const map = new mapboxGl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.694, 41.793], // starting position [lng, lat]
      zoom: 9,
    });
  }, []);

  return <Box id="map" h="505px" w="full" pos="relative" overflow="hidden" />;
}
