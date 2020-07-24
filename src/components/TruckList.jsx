import React from 'react';
import { trucks as data } from '../dummy-data';
import SearchBar from './SearchBar';

const TruckList = () => {
	const starStyle = { fontSize: '20px' };

	return (
		<div>
			<SearchBar />
			<div className='truckListCardContainer'>
				{data.map((truck) => (
					<div key={truck.id}>
						<img
							src='https://picsum.photos/300/'
							alt='truckImage'
							className='truckPictures'
						/>
						<h3>Truck Name: {truck.truckName}</h3>
						<h4>Distance: {truck.location}</h4>
						<h5>Food Description: {truck.truckDescription}</h5>
						<h5>
							Rating: <i class='fas fa-star 8x' style={starStyle}></i>
							<i class='fas fa-star' style={starStyle}></i>
							<i class='fas fa-star' style={starStyle}></i>
							<i class='fas fa-star' style={starStyle}></i>
							<i class='far fa-star'></i>
						</h5>
						<h5>Price Range: $-$$</h5>
					</div>
				))}
			</div>
		</div>
	);
};

export default TruckList;
