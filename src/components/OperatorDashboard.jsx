import React from 'react';
import {Link} from "react-router-dom";
import TruckList from './TruckList';
import { Button } from 'reactstrap';
// connect component to Redux store
// import { connect } from 'react-redux';

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

// const mapStateToProps = state => {
// 	return {
// 		user: state.user
// 	}
// };

// export default connect(mapStateToProps, {})(OperatorDashboard);

export default OperatorDashboard;
// commented out ^^^ to connect component to the store