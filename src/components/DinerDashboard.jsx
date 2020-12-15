import React from 'react';
import SearchBar from './SearchBar';
import TrucksPage from './TrucksPage';

const DinerDashboard = () => (
  <div>
    <SearchBar />
    <h2 style={{ textAlign: 'left', marginTop: '5%' }}>Favorite Trucks</h2>
    <TrucksPage />
  </div>
);

export default DinerDashboard;
