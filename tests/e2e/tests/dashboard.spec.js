/* eslint-disable no-undef */
import translations from '../../../src/translations';

const { dashboard } = translations;
describe('The dashboard', () => {
	it('render the dashboard with no saved cities fon first time load', () => {
		cy.visit('/');

		cy.contains(dashboard.delete_all_saved_cities).should('not.exist');
		cy.contains(dashboard.no_saved_cities).should('exist');
	});
	it('find a city and navigate to the detail with the correct option', () => {
		cy.visit('/');
		cy.get(`input[placeholder="${dashboard.input_search_placeholder}"]`).type(
			'Madrid',
		);
		cy.intercept('**/search**').as('citiesList');
		cy.wait('@citiesList');
		cy.contains('Madrid Spain').click();
		// cy.contains(city).should('exist');
	});
});
