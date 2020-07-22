import React from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	CustomInput,
	FormFeedback,
} from 'reactstrap';

const Home = (props) => {
	//form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		e.persist();
		console.log(e);
	};

	return (
		<div>
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
					<Button
						id='btn'
						style={{ backgroundColor: 'rgb(0, 150, 250)' }}
						className='button'
					>
						Search
					</Button>
				</Form>
			</div>

			<h2 className='sign-up'>
				<hr />
				Sign Up <hr />
			</h2>

			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Button
						id='btn'
						style={{
							borderRadius: '0px',
							backgroundColor: 'rgb(0, 120, 220)',
							border: 'none',
						}}
					>
						Diner
					</Button>
					<Button
						id='btn'
						style={{
							borderRadius: '0px',
							backgroundColor: 'rgb(0, 120, 220)',
							border: 'none',
						}}
					>
						Operator
					</Button>
				</FormGroup>
				<FormGroup>
					<Label for='Email'>Email</Label>
					<Input type='email' name='Email' id='Email' />
				</FormGroup>
				<FormGroup>
					<Label for='Username'>Username</Label>
					<Input type='username' name='Username' id='Username' minLength='2' />
				</FormGroup>
				<FormGroup>
					<Label for='Password'>Password</Label>
					<Input type='password' name='Password' id='Password' minLength='5' />
				</FormGroup>
				<Button
					id='btn'
					style={{
						backgroundColor: 'rgb(0, 85, 200)',
						width: '15%',
						fontSize: '1.2rem',
					}}
				>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Home;
