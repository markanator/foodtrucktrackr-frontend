import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const SearchBar = () => {
	return (
		<div className='home-header'>
			<h1>Find the Right Truck for You</h1>
			<Form className='searchBarContainer' inline>
				<FormGroup>
					<Input
						type='search'
						name='Search'
						id='Search'
						placeholder='City, State, USA'
					/>
				</FormGroup>
				<Button id='btn' style={{ backgroundColor: 'rgb(0, 150, 250)' }}>
					Search
				</Button>
			</Form>
		</div>
	);
};

export default SearchBar;
