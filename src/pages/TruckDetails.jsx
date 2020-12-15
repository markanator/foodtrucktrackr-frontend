import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// locals
import MenuItem from '../components/truck_details/MenuItem';
import AddMenuItem from '../components/truck_details/AddMenuItem';
import MenuItemModal from '../components/truck_details/MenuItemModal';
import RatingModal from '../components/truck_details/RatingModal';
import FavoriteButton from '../components/truck_details/FavoriteButton';

export default function TruckDetails() {
  // get id from URL
  const { id } = useParams();
  const [userProfileData, setUserProfileData] = useState({});

  // used to inform user site is loading
  const [isLoading, setIsLoading] = useState(true);

  // create truckState for the page to use
  const [truckInfo, setTruckInfo] = useState({
    averageRating: null,
    foodItems: [],
    id: null,
    latitude: 0,
    location_address: '',
    location_city: '',
    location_state: '',
    location_zip_code: '',
    longitude: 0,
    operator_id: 0,
    price_range: '',
    truck_arrival_time: '',
    truck_cuisine_type: '',
    truck_departure_time: '',
    truck_description: '',
    truck_id: null,
    truck_name: '',
    truck_photo: '',
    userRating: null,
  });

  const [modals, setModals] = useState({
    rating: false,
    menu: false,
  });

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (userProfileData.user_role === 'diner') {
      // console.log("userProfileData", userProfileData);
      const thisTruck = userProfileData.favoriteTrucks.filter(
        (truck) => truck.truck_id === id
      );
      // console.log("thisTruck", thisTruck[0]);
      if (thisTruck.length !== 0) {
        setIsFavorited(true);
      }
    } else {
      console.log('not a diner');
    }
  }, []);

  const toggleModal = (modal) => {
    setModals({
      ...modals,
      [modal]: !modals[modal],
    });
  };

  const addToFavorites = () => {
    setIsFavorited(true);
  };

  const removeFromFavorites = () => {
    setIsFavorited(false);
  };

  useEffect(() => {
    // axios
    //     .get(`https://foodtrackertcr.herokuapp.com/trucks`)
    //     .then((resp) => {
    //         // console.log(resp.data);
    //         // console.log("id", id);
    //         // set local state
    //         setIsLoading(false);
    //         const truckInQuestion = resp.data.filter((truck) => {
    //             return truck.truck_id == id;
    //         });
    //         // console.log("truckInQuestion", truckInQuestion);
    //         setTruckInfo(truckInQuestion[0]);
    //     })
    //     .catch((err) => {
    //         // set local state
    //         setIsLoading(false);
    //         // log why it couldn't
    //         console.error(err);
    //     });
    console.log('FETCH TRUCK DEETS');
  }, [id, userProfileData.id]);

  // const renderMenuItems = (menuItemArray) => {
  //     if (menuItemArray !== undefined && menuItemArray.length > 0) {
  //         return (
  //             truckInfo.foodItems.map((menuItem) => {
  //                 return (
  //                     <Col className="mb-3" md="6" lg="6">
  //                         <MenuItem key={menuItem.id} menuItem={menuItem} />
  //                     </Col>
  //                 );
  //             }),
  //             truckInfo.operator_id === userProfileData.id ? (
  //                 <AddMenuItem
  //                     showMenuModal={() => toggleModal("menu")}
  //                 ></AddMenuItem>
  //             ) : null
  //         );
  //     } else {
  //         return <p>No menu items to show.</p>;
  //     }
  // };

  if (isLoading) {
    return <p>Loading Truck Deets...</p>;
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
        <button
          type="button"
          color="warning"
          className="mr-3"
          onClick={() => toggleModal('rating')}
        >
          Rate
        </button>
        <i
          style={{ color: 'gold', fontSize: '1.4rem' }}
          className="fas fa-star"
        />
        <i
          style={{ color: 'gold', fontSize: '1.4rem' }}
          className="fas fa-star"
        />
        <i
          style={{ color: 'gold', fontSize: '1.4rem' }}
          className="fas fa-star"
        />
        <i
          style={{ color: 'gold', fontSize: '1.4rem' }}
          className="fas fa-star"
        />
        <i
          style={{ color: 'gold', fontSize: '1.4rem' }}
          className="far fa-star"
        />
      </div>
      <h1 className="pt-2 pb-2 truck name">{truckInfo.truck_name}</h1>
      <address className="location text-muted">
        {truckInfo.location_address}, {truckInfo.location_city}{' '}
        {truckInfo.location_state} {truckInfo.location_zip_code}
      </address>
      <p className="description lead">{truckInfo.truck_description}</p>
      <h3 className="pb-3">Menu</h3>
      <div className="menu-items">
        {/* {renderMenuItems(truckInfo.foodItems)} */}
        {truckInfo.foodItems.map((menuItem) => (
          <div className="mb-3" md="6" lg="6" key={menuItem.truck_id}>
            <MenuItem key={menuItem.id} menuItem={menuItem} />
          </div>
        ))}
        <div className="mb-3" md="6" lg="6">
          {truckInfo.operator_id === userProfileData.id ? (
            <AddMenuItem showMenuModal={() => toggleModal('menu')} />
          ) : null}
        </div>
      </div>

      <MenuItemModal
        toggleModal={() => toggleModal('menu')}
        modal={modals.menu}
      />
      <RatingModal
        toggleModal={() => toggleModal('rating')}
        show={modals.rating}
        truckId={id}
      />
    </div>
  );
}
