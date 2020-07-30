import React, {useState} from "react";
import {Row, Col, Button} from "reactstrap";

import MenuItem from "./MenuItem";
import AddMenuItem from "./AddMenuItem";
import MenuItemModal from "./MenuItemModal";
import RatingModal from "./RatingModal";

export default function TruckDetails(props){
    const [modals, setModals] = useState({
        rating: false,
        menu: false
    })

    const [isFavorited, setIsFavorited] = useState(false);

    const toggleModal = (modal) =>{
        setModals({
            ...modals,
            [modal]: !modals[modal]
        });
    }
    
    const addToFavorites = () => {
        setIsFavorited(true);
    }

    const removeFromFavorites = () => {
        setIsFavorited(false);
    }

    return (
        <div className="text-left truck-details-page">
            <div className="position-relative">
                <img alt="food truck" className="img-fluid" src="https://www.tasteofhome.com/wp-content/uploads/2019/09/cousins-maine-lobster-food-truck_1378623194-2.jpg"/>
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
            <div className="pt-3 stars float-right">
                <Button color="warning" className="mr-3" onClick={()=>toggleModal("rating")}>Rate</Button>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="fas fa-star"></i>
                <i style={{"color": "gold", "fontSize": "1.4rem"}} className="far fa-star"></i>
            </div>
            <h1 className="pt-2 pb-2 truck name">Cousins Maine Lobster</h1>
            <address className="location text-muted" >153 Place Plaza, New York NY</address>
            <p className="description lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, lacus vel aliquam gravida, erat purus dignissim quam, id feugiat magna orci a magna. Vestibulum odio magna, semper gravida ex ac, auctor accumsan velit. Nullam ac dignissim nibh. Vivamus ultricies ligula quis rhoncus venenatis. Vestibulum nisl purus, vehicula sit amet lobortis quis, viverra laoreet nisl. Nam non neque libero. In hac habitasse platea dictumst. Mauris vitae eleifend dui. Pellentesque quis enim id lorem pellentesque suscipit.</p>
            <h3 className="pb-3">Menu</h3>
            <Row className="menu-items"> 
                {[1,2,3,4,5].map(menuItem=>{
                    return(
                        <Col className="mb-3" md="6" lg="6">
                            <MenuItem menuItem={menuItem}></MenuItem>
                        </Col>
                    );
                })}
                <Col className="mb-3" md="6" lg= "6">
                    <AddMenuItem showMenuModal={()=> toggleModal("menu")}></AddMenuItem>
                </Col> 
            </Row>
            <MenuItemModal toggleModal={()=> toggleModal("menu")} modal={modals.menu}></MenuItemModal>
            <RatingModal toggleModal={()=> toggleModal("rating")} show={modals.rating}></RatingModal>
        </div>
    )
}