import React from "react";

import SearchBar from "./SearchBar";
import TruckList from "./TruckList";
// connect component to Redux store
import { connect } from 'react-redux';

function SearchPage(props){
    console.log("props from SearchPage", props);
    return (
        <div className="search-page operatorDashboard">
            <SearchBar></SearchBar>
            {/* <TruckList></TruckList> */}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        searchState: {
            ...state.searchState,
            results: state.searchState.results
        }
    }
}


export default connect(mapStateToProps, {})(SearchPage);
//export default SearchPage;
// commented out ^^^ to connect component to the store