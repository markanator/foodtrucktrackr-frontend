import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input
} from 'reactstrap';

const SearchBar = () => {
	const [formState, setFormstate] = useState({
		query: "",
		cuisineType: "",
		radius: 5,
	})

	const cuisineTypes = [ 
        "American",
        "Mexican",
        "Greek",
        "SeaFood",
        "Vegan Exclusive",
        "Vegetarian",
        "Chinese",
        "Thai",
        "Dessert",
        "Italian",
        "Filipino",
        "Kosher"
	];
	
	const onInputChange = e => {
		setFormstate({
			...formState,
			[e.target.name]: e.target.value
		});
	}

	const submit = e => {
		e.preventDefault();
	}

	console.log(formState);

	return (
		<div className='home-header'>
			<h1>Find the Right Truck for You</h1>
			<Form onSubmit={submit}className='searchBarContainer' inline>
				<FormGroup>
					<Input
						onChange={onInputChange}
						type='search'
						name='query'
						id='query'
						placeholder='City, State, USA'
					/>
				</FormGroup>
				<Input onChange={onInputChange} type="select" name="cuisineType">
					<option selected disabled value="">-- Select a cuisine type --</option>
					{cuisineTypes.map(cuisineType =>{
						return (
							<option key={cuisineType} value={cuisineType}>{cuisineType}</option>
						)
					})}
				</Input>
				<Input onChange={onInputChange} type="select" name="radius">
					<option value={5}>within 5 miles</option>
					<option value={10}>within 10 miles</option>
					<option value={15}>within 15 miles</option>
					<option value={20}>within 20 miles</option>
				</Input>
				<Button id='btn' style={{ backgroundColor: 'rgb(0, 150, 250)' }}>
					Search
				</Button>
			</Form>
		</div>
	);
};

export default SearchBar;
