import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

const SearchBar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

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
				<Dropdown isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle
						caret
						style={{
							backgroundColor: 'white',
							color: 'gray',
							border: 'none',
							borderRadius: '0px',
						}}
					>
						Filter
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem id='cuisine'>Cuisine Type</DropdownItem>
						<DropdownItem id='distance'>Distance</DropdownItem>
						<DropdownItem id='price'>Price</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button id='btn' style={{ backgroundColor: 'rgb(0, 150, 250)' }}>
					Search
				</Button>
			</Form>
		</div>
	);
};

export default SearchBar;
