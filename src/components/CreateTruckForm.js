import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/AxiosWithAuth';

export default function CreateTruckForm(props) {
  const { push } = useHistory();
  const [ownerState, setOwnerState] = useState({});
  const [arrival, setArrival] = useState(
    new Date('December 31, 2100 21:00:00')
  );
  const [departure, setDeparture] = useState(
    new Date('December 31, 2100 23:59:59')
  );

  const [formData, setFormData] = useState({
    ownerID: ownerState.id,
    truckName: '',
    truckImage: '',
    cuisineType: '',
    priceRange: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    truckDescription: '',
    menuItem: [],
    truck_departure: 0,
    truck_arrival: 0,
  });

  const cuisineTypes = [
    'American',
    'Mexican',
    'Greek',
    'SeaFood',
    'Vegan Exclusive',
    'Vegetarian',
    'Chinese',
    'Thai',
    'Dessert',
    'Italian',
    'Filipino',
    'Kosher',
  ];

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    // its what the database needs
    // ask Pedro!
    const arrDate =
      new Date(arrival).getHours() * 60 + new Date(arrival).getMinutes();
    const depDate =
      new Date(departure).getHours() * 60 + new Date(departure).getMinutes();

    // refactor to ensure database gets what it needs
    const dbTruck = {
      truck_name: formData.truckName,
      truck_departure_time: arrDate,
      truck_arrival_time: depDate,
      user_id: formData.ownerID,
      location_zip_code: formData.zip,
      location_city: formData.city,
      location_address: formData.address,
      location_state: formData.state,
      truck_cuisine_type: formData.cuisineType,
      truck_description: formData.truckDescription,
      truck_photo: formData.truckImage,
    };

    // console.log(dbTruck);
    axiosWithAuth()
      .post(`/trucks`, dbTruck)
      .then((resp) => {
        console.log('SUBMITTED!');
        console.log('post truck resp:: ', resp);
        push(`/trucks/${resp.data.truck_id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="form-container">
      <form className="createTruckForm" onSubmit={submit}>
        <h1>Create a Truck</h1>
        <div>
          <label htmlFor="truckName">
            Truck Name
            <input
              onChange={onInputChange}
              type="text"
              id="truckName"
              name="truckName"
              placeholder="Enter your truck's name"
              value={formData.truckName}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="image">
            Image
            <input
              onChange={onInputChange}
              type="text"
              id="image"
              name="truckImage"
              placeholder="Url of an image of your truck"
              value={formData.image}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="cuisineType">
            Cuisine Type
            <select
              onChange={onInputChange}
              type="select"
              id="cuisineType"
              name="cuisineType"
              required
              defaultValue="-- Select your cuisine type --"
            >
              {/* <option
                            value="-- Select your cuisine type --"
                            disabled
                          ></option> */}
              {cuisineTypes.map((cuisineType) => (
                <option value={cuisineType} key={cuisineType}>
                  {cuisineType}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="priceRange">
            Price Range
            <select
              onChange={onInputChange}
              type="select"
              id="priceRange"
              name="priceRange"
              required
              defaultValue=""
            >
              <option value="" disabled>
                -- Select your price range --
              </option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="address">
            Address
            <input
              onChange={onInputChange}
              type="text"
              id="address"
              name="address"
              placeholder="Street address"
              value={formData.address}
            />
          </label>
        </div>
        <div>
          <label htmlFor="city">
            City
            <input
              onChange={onInputChange}
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
            />
          </label>
        </div>
        <div>
          <label htmlFor="state">
            State
            <input
              onChange={onInputChange}
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
            />
          </label>
        </div>
        <div>
          <label htmlFor="zip">
            Zip
            <input
              onChange={onInputChange}
              type="text"
              id="zip"
              name="zip"
              placeholder="Local zip code"
              value={formData.zip}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <input
              onChange={onInputChange}
              type="textarea"
              id="description"
              name="truckDescription"
              placeholder="Tell us what you're all about!"
              value={formData.description}
            />
          </label>
        </div>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
