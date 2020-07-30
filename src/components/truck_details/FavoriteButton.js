import React from "react";

function FavoriteButton({isFavorited, addToFavorites, removeFromFavorites}){
    return (
        <div>
        {!isFavorited &&
            <i 
                onClick={addToFavorites}
                style={{"color": "hotpink", "fontSize": "3rem", "bottom": "5%", "right": "5%"}} 
                className="far fa-heart position-absolute">
            </i>
        }{isFavorited &&
            <i 
                onClick={removeFromFavorites}
                style={{"color": "hotpink", "fontSize": "3rem", "bottom": "5%", "right": "5%"}} 
                className="fas fa-heart position-absolute">
            </i>
        }
        </div>
    )
}

export default FavoriteButton;