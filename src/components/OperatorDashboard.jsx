import React from 'react';
import {Link} from "react-router-dom";
import TruckList from './TruckList';
import { Button } from 'reactstrap';

const OperatorDashboard = () => {
	return (
		<div className='operatorDashboard'>
			<div className='operatorDashboardHeader'>
				<h2>Operator's Trucks</h2>
				<Link to={"/add-truck"}>
					<Button
						className='btn'
						style={{ backgroundColor: 'rgb(0, 85, 200)'}}
						id='addTruck'
					>
						+ Add Truck
					</Button>
				</Link>
			</div>
			<TruckList OperatorDashboard={true} />
		</div>
	);
};

export default OperatorDashboard;
