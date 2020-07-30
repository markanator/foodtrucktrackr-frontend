import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spinner } from "reactstrap";

// router stuff
import { useParams } from "react-router-dom";
// redux stuff
import { useSelector } from "react-redux";
// auth reqs
import { axiosWithAuth } from "../../utils/AxiosWithAuth";

import MenuItem from "./MenuItem";
import AddMenuItem from "./AddMenuItem";
import MenuItemModal from "./MenuItemModal";
import RatingModal from "./RatingModal";
import FavoriteButton from "./FavoriteButton";

export default function TruckDetails(props) {
    // get id from URL
    const { id } = useParams();
    // get userID
    const userProfileData = useSelector((state) => state.tempSiteReducer.user);

    // used to inform user site is loading
    const [isLoading, setIsLoading] = useState(true);

    // create truckState for the page to use
    const [truckInfo, setTruckInfo] = useState({
        averageRating: null,
        foodItems: [],
        id: null,
        latitude: 0,
        location_address: "",
        location_city: "",
        location_state: "",
        location_zip_code: "",
        longitude: 0,
        operator_id: 0,
        price_range: "",
        truck_arrival_time: "",
        truck_cuisine_type: "",
        truck_departure_time: "",
        truck_description: "",
        truck_id: null,
        truck_name: "",
        truck_photo: "",
        userRating: null,
    });

    const [modals, setModals] = useState({
        rating: false,
        menu: false,
    });

    const [isFavorited, setIsFavorited] = useState(false);

    const toggleModal = (modal) => {
        setModals({
            ...modals,
            [modal]: !modals[modal],
        });
    };

    const addToFavorites = () => {
        return axiosWithAuth()
            .post(`/trucks/favorites/${id}`)
            .then((resp) => {
                console.log(resp);
                // set local state
                return setIsFavorited(true);
            })
            .catch((err) => {
                // set local state
                setIsLoading(false);
                // log why it couldn't
                console.error(err);

                return setIsFavorited(false);
            });
    };

    const removeFromFavorites = () => {
        return axiosWithAuth()
            .delete(`/trucks/favorites/${id}`)
            .then((resp) => {
                console.log(resp);
                // set local state
                return setIsFavorited(false);
            })
            .catch((err) => {
                // set local state
                setIsLoading(false);
                // log why it couldn't
                console.error(err);

                return setIsFavorited(true);
            });
    };

    useEffect(() => {
        axiosWithAuth()
            .get(`/trucks/${id}`)
            .then((resp) => {
                // console.log(resp.data);
                // set local state
                setIsLoading(false);
                setTruckInfo({ ...resp.data });
            })
            .catch((err) => {
                // set local state
                setIsLoading(false);
                // log why it couldn't
                console.error(err);
            });
    }, [id, userProfileData.id]);

    if (isLoading) {
        return <Spinner color="primary" />;
    }
    return (
        <div className="text-left truck-details-page">
            <div className="position-relative">
                <img
                    alt="food truck"
                    className="img-fluid"
                    src={truckInfo.truck_photo}
                />
                <FavoriteButton
                    isFavorited={isFavorited}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                />
            </div>
            <div className="pt-3 stars float-right">
                <Button
                    color="warning"
                    className="mr-3"
                    onClick={() => toggleModal("rating")}
                >
                    Rate
                </Button>
                <i
                    style={{ color: "gold", fontSize: "1.4rem" }}
                    className="fas fa-star"
                ></i>
                <i
                    style={{ color: "gold", fontSize: "1.4rem" }}
                    className="fas fa-star"
                ></i>
                <i
                    style={{ color: "gold", fontSize: "1.4rem" }}
                    className="fas fa-star"
                ></i>
                <i
                    style={{ color: "gold", fontSize: "1.4rem" }}
                    className="fas fa-star"
                ></i>
                <i
                    style={{ color: "gold", fontSize: "1.4rem" }}
                    className="far fa-star"
                ></i>
            </div>
            <h1 className="pt-2 pb-2 truck name">{truckInfo.truck_name}</h1>
            <address className="location text-muted">
                {truckInfo.location_address}, {truckInfo.location_city}{" "}
                {truckInfo.location_state} {truckInfo.location_zip_code}
            </address>
            <p className="description lead">{truckInfo.truck_description}</p>
            <h3 className="pb-3">Menu</h3>
            <Row className="menu-items">
                {truckInfo.foodItems.map((menuItem) => {
                    return (
                        <Col className="mb-3" md="6" lg="6">
                            <MenuItem key={menuItem.id} menuItem={menuItem} />
                        </Col>
                    );
                })}
                <Col className="mb-3" md="6" lg="6">
                    {truckInfo.operator_id === userProfileData.id ? (
                        <AddMenuItem
                            showMenuModal={() => toggleModal("menu")}
                        ></AddMenuItem>
                    ) : null}
                </Col>
            </Row>
            <MenuItemModal
                toggleModal={() => toggleModal("menu")}
                modal={modals.menu}
            ></MenuItemModal>
            <RatingModal
                toggleModal={() => toggleModal("rating")}
                show={modals.rating}
            ></RatingModal>
        </div>
    );
}
