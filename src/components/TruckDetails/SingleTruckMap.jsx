import React from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
// locals
import mapStyles from '../search/mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 41.88553,
  lng: -87.61741,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
};

export default function SingleTruckMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  // retain state without causing rerender
  const mapRef = React.useRef();
  // access anywher in code and won't cause rerenders
  const mapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <p>Error Loading Map</p>;
  if (!isLoaded) return <p>Loading Map</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      // onClick={onMapClick}
      onLoad={mapLoad}
      style={{
        position: 'relative',
      }}
    >
      {/* test */}
    </GoogleMap>
  );
}
