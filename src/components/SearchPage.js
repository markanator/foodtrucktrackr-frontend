import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
// import TruckList from "./TruckList";
// connect component to Redux store
//import { connect } from 'react-redux';
//redux hooks to get state
// import { useSelector } from 'react-redux';

function SearchPage(props){
    const [searchInfo, setSearchInfo] = useState([]);
    //console.log("props from SearchPage", props);
    // const searchInfo = useSelector(
        // (state) => state.dinerOperatorReducer.searchState
    // );
    // console.log('searchInfo from useSelector in SearchPage', searchInfo);

    return (
        <div className="search-page operatorDashboard">
            <SearchBar></SearchBar>
            {/* <TruckList></TruckList> */}
            {searchInfo.results.length === 0 ? <div><p>Sorry, no trucks match that description!</p></div> : searchInfo.results.map((truck, index) => {
                return (
                    <div key={index}>
                        <Link to={`/trucks/${truck.truck_id}`}><h3>{truck.truck_name}</h3></Link>
                        <p>{truck.truck_cuisine_type}</p>
                        <p>{truck.price_range}</p>
                        <p>{truck.location_address}</p>
                        <p>{truck.location_city}, {truck.location_state}</p>
                        <p>{truck.truck_description}</p>
                    </div>
                )
            })}
        </div>
    )
}

/* const mapStateToProps = state => {
    return {
        searchState: state.searchState
    }
        searchState: {
            ...state.searchState,
            results: state.searchState.results
        }

} */


//export default connect(mapStateToProps, {})(SearchPage);
export default SearchPage;
// commented out ^^^ to connect component to the store