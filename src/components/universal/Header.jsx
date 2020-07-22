import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<Navbar className='navbar'>
			<div className='navTitle'>
				<i className='fas fa-truck'></i>
				<h1 className='headerTitle'>Food Truck Trackr</h1>
			</div>
			<Link to='/' className='navItem'>
				Home
			</Link>
			<Link to='/profile' className='navItem'>
				Profile
			</Link>
			<Link to='/trucks' className='navItem'>
				Trucks
			</Link>
			<Link to='/signin' className='navItem'>
				Login/Sign Up
			</Link>
		</Navbar>
	);
};

export default Header;
