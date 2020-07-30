import React, {useState, useEffect} from "react";
import {Row, Col, Button} from "reactstrap";

import MenuItem from "./MenuItem";
import AddMenuItem from "./AddMenuItem";
import MenuItemModal from "./MenuItemModal";
import RatingModal from "./RatingModal";
import FavoriteButton from "./FavoriteButton";

//import actions
import { addFavTruck, deleteFavTruck } from '../../actions';
// connect to the Store
import { connect } from 'react-redux';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';

function TruckDetails(props){
    console.log("props from truckDetails", props);
    const [modals, setModals] = useState({
        rating: false,
        menu: false
    });

    const [truckDetails, setTruckDetails] = useState({});

    const [isFavorited, setIsFavorited] = useState(false);

    const toggleModal = (modal) =>{
        setModals({
            ...modals,
            [modal]: !modals[modal]
        });
    }
    
    const addToFavorites = () => {
        console.log('truckDetails', truckDetails);
        setIsFavorited(true);
        props.addFavTruck(props.match.params.id);
    }

    const removeFromFavorites = () => {
        setIsFavorited(false);
        props.deleteFavTruck();
    }

    useEffect(() => {
        console.log(props.state);
        axiosWithAuth()
            .get(`trucks/${props.match.params.id}`)
            .then(res => {
                console.log(res);
                setTruckDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="text-left truck-details-page">
            <div className="position-relative">
                <img alt="food truck" className="img-fluid" src="https://www.tasteofhome.com/wp-content/uploads/2019/09/cousins-maine-lobster-food-truck_1378623194-2.jpg"/>
                <FavoriteButton isFavorited={isFavorited} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
            </div>
            <div className="pt-3 stars float-right">
                <Button color="warning" className="mr-3" onClick={()=>toggleModal("rating")}>Rate</Button>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="far fa-star"></i>
            </div>
            <h1 className="pt-2 pb-2 truck name">{truckDetails.truck_name}</h1>
            <address className="location text-muted" >{truckDetails.location_address}, {truckDetails.location_city} {truckDetails.location_state}</address>
            <p className="description lead">{truckDetails.truck_description}</p>
            <h3 className="pb-3">Menu</h3>
            <Row className="menu-items"> 
                {/* {truckDetails.foodItems.length > 0 ? truckDetails.foodItems.map(menuItem=>{
                    return(
                        <Col className="mb-3" md="6" lg="6">
                            <MenuItem menuItem={menuItem}></MenuItem>
                        </Col>
                    );
                }) : <p>Sorry, this truck has not provided a menu.</p>} */}
                <Col className="mb-3" md="6" lg= "6">
                    <AddMenuItem showMenuModal={()=> toggleModal("menu")}></AddMenuItem>
                </Col> 
            </Row>
            <MenuItemModal toggleModal={()=> toggleModal("menu")} modal={modals.menu}></MenuItemModal>
            <RatingModal toggleModal={()=> toggleModal("rating")} show={modals.rating}></RatingModal>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        state: state
    };
};

const mapDispatchToProps = {addFavTruck, deleteFavTruck};

export default connect(mapStateToProps, mapDispatchToProps)(TruckDetails);