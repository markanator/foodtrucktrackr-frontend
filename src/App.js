import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/universal/Footer';
import Header from './components/universal/Header';
import DinerDashboard from './components/DinerDashboard';
import OperatorDashboard from './components/OperatorDashboard';

const App = () => {
	const [users, setUsers] = useState([]);
	return (
		<div>
			<Header />
			<div className='App'>
				<Switch>
					<Route exact path='/'>
						<Home users={users} setUsers={setUsers} />
					</Route>
					<Route path='/login'></Route>
					<Route path='/operatordashboard'>
						<OperatorDashboard />
					</Route>
					<Route path='/dinerdashboard'>
						<DinerDashboard />
					</Route>
				</Switch>
			</div>
			<Footer />
		</div>
	);
};

export default App;
