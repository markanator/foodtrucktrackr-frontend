import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/universal/Footer';
import Header from './components/universal/Header';

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
				</Switch>
			</div>
			<Footer />
		</div>
	);
};

export default App;
