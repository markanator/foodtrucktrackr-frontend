import React from "react";

import SearchBar from "./SearchBar";
import TruckList from "./TruckList";
// connect component to Redux store
//import { connect } from 'react-redux';
//redux hooks to get state
import { useSelector } from 'react-redux';

function SearchPage(props){
    console.log("props from SearchPage", props);
    const searchInfo = useSelector(
        (state) => state.dinerOperatorReducer.searchState
    );
    console.log('searchInfo from useSelector in SearchPage', searchInfo); 

    return (
        <div className="search-page operatorDashboard">
            <SearchBar></SearchBar>
            {/* <TruckList></TruckList> */}
            {/* {props.searchState.results} */}
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