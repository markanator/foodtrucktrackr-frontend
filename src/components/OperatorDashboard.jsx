import React from 'react';
import TruckList from './TruckList';
import { Button } from 'reactstrap';

const OperatorDashboard = () => {
	return (
		<div className='operatorDashboard'>
			<div className='operatorDashboardHeader'>
				<h2>Operator's Trucks</h2>
				<Button
					className='btn'
					style={{ backgroundColor: 'rgb(0, 85, 200)', width: '25%' }}
					id='addTruck'
				>
					+ Add Truck
				</Button>
			</div>
			<TruckList OperatorDashboard={true} />
		</div>
	);
};

export default OperatorDashboard;
