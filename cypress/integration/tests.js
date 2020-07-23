describe('', () => {
	it('', () => {
		cy.visit('localhost:3000');
		cy.viewport(2400, 1500);

		cy.get('#Email').type('brian@bagrov.com');
		cy.get('#Username').type('Brian');
		cy.get('#Password').type('password');

		cy.get(
			'[style="background-color: rgb(0, 85, 200); width: 15%; font-size: 1.2rem;"]'
		).click();
	});
});
