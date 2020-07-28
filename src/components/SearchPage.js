import React from "react";

import SearchBar from "./SearchBar";
import TruckList from "./TruckList";

function SearchPage(props){
    return (
        <div className="search-page operatorDashboard">
            <SearchBar></SearchBar>
            <TruckList></TruckList>
        </div>
    )
}

export default SearchPage;