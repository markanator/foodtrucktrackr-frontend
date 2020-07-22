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

const Home = () => {
	return (
		<div>
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
				<Button>Search</Button>
			</Form>
			<h2>Sign Up</h2>

			<Form>
				<div>
					<FormGroup>
						<div>
							<CustomInput type='checkbox' id='Diner' label='Diner' inline />
							<CustomInput
								type='checkbox'
								id='Operator'
								label='Operator'
								inline
							/>
						</div>
					</FormGroup>
				</div>
				<FormGroup>
					<Label for='Email'>Email</Label>
					<Input type='email' name='Email' id='Email' />
				</FormGroup>
				<FormGroup>
					<Label for='Username'>Username</Label>
					<Input type='username' name='Username' id='Username' />
				</FormGroup>
				<FormGroup>
					<Label for='Password'>Password</Label>
					<Input type='password' name='Password' id='Password' />
				</FormGroup>
				<Button>Submit</Button>
			</Form>
		</div>
	);
};

export default Home;
