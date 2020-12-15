import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function SearchPage(props) {
  const [searchInfo, setSearchInfo] = useState([]);

  return (
    <div className="search-page operatorDashboard">
      <SearchBar />
      {/* <TruckList></TruckList> */}
      {searchInfo.results.length === 0 ? (
        <div>
          <p>Sorry, no trucks match that description!</p>
        </div>
      ) : (
        searchInfo.results.map((truck, index) => (
                    <div key={index}>
                        <Link to={`/trucks/${truck.truck_id}`}><h3>{truck.truck_name}</h3></Link>
                        <p>{truck.truck_cuisine_type}</p>
                        <p>{truck.price_range}</p>
                        <p>{truck.location_address}</p>
                        <p>{truck.location_city}, {truck.location_state}</p>
                        <p>{truck.truck_description}</p>
                    </div>
                ))}
      )}
    </div>
  );
}

export default SearchPage;
