import React, { useEffect, useState } from 'react';
// move user
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/AxiosWithAuth';

export default function EditTruck(props) {
  const { push } = useHistory();
  // get id
  const { id } = useParams();
  const [truckState, setTruckState] = useState({});
  const [loading, setLoading] = useState(true);
  // time picker stuff
  const [truck_arrival_time, setArrival] = useState(new Date());
  const [truck_departure_time, setDeparture] = useState(new Date());

  const [formData, setFormData] = useState({ ...truckState });

  useEffect(() => {
    if (truckState.id != null) {
      setLoading(false);
    }
  }, [id, truckState.id]);

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
      new Date(truck_arrival_time).getHours() * 60 +
      new Date(truck_arrival_time).getMinutes();
    const depDate =
      new Date(truck_departure_time).getHours() * 60 +
      new Date(truck_departure_time).getMinutes();

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
      truck_photo: formData.truck_photo,
    };

    axiosWithAuth()
      .put(`/trucks/${id}`, dbTruck)
      .then((resp) => {
        console.log('SUBMITTED!');
        console.log('post truck resp:: ', resp);
        push(`/trucks/${resp.data.truck_id}`);
      })
      .catch((err) => {
        // dispatch({ type: "TRUCK_FAIL" });
        console.error(err);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="form-container">
      <form className="createTruckForm" onSubmit={submit}>
        <h1>Create a Truck</h1>
        <div>
          <label htmlFor="truckName">Truck Name</label>
          <input
            onChange={onInputChange}
            type="text"
            name="truck_name"
            placeholder="Enter your truck's name"
            value={formData.truck_name}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            onChange={onInputChange}
            type="text"
            name="truck_photo"
            placeholder="Url of an image of your truck"
            value={formData.truck_photo}
            required
          />
        </div>
        <div>
          <label htmlFor="cuisineType">Cuisine Type</label>
          <input
            onChange={onInputChange}
            type="select"
            name="truck_cuisine_type"
            required
            defaultValue="-- Select your cuisine type --"
            value={formData.truck_cuisine_type}
          >
            {cuisineTypes.map((cuisine_type) => (
              <option value={cuisine_type} key={cuisine_type}>
                {cuisine_type}
              </option>
            ))}
          </input>
        </div>
        <div>
          <label htmlFor="priceRange">Price Range</label>
          <input
            onChange={onInputChange}
            type="select"
            name="price_range"
            required
            value={formData.price_range}
          >
            <option value="" disabled>
              -- Select your price range --
            </option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            onChange={onInputChange}
            type="text"
            name="location_address"
            placeholder="Street address"
            value={formData.location_address}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            onChange={onInputChange}
            type="text"
            name="location_city"
            placeholder="City"
            value={formData.location_city}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            onChange={onInputChange}
            type="text"
            name="location_state"
            placeholder="State"
            value={formData.location_state}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <input
            onChange={onInputChange}
            type="text"
            name="location_zip_code"
            placeholder="Local zip code"
            value={formData.location_zip_code}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            onChange={onInputChange}
            type="textarea"
            name="truck_description"
            placeholder="Tell us what you're all about!"
            value={formData.truck_description}
          />
        </div>
        {/* <div>
                    <label>
                        Arrival Time:
                        <br />
                        <DateTimePicker
                            onChange={setArrival}
                            value={truck_arrival_time}
                            clearIcon="Clear"
                            required={true}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Departure Time:
                        <br />
                        <DateTimePicker
                            onChange={setDeparture}
                            value={truck_departure_time}
                            clearIcon="Clear"
                        />
                    </label>
                </div> */}

        <button color="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
