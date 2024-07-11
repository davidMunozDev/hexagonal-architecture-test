/* eslint-disable no-undef */
import translations from '../../../src/translations';
describe('The detail', () => {
	it('add and delete saved cities', () => {
		cy.visit(
			'/BBVA-Technical-Test/detail/Madrid/Spain?coordinates=40.4165,-3.70256',
		);
		cy.contains(translations.detail.add_button).click();
		cy.contains(translations.detail.delete_button).should('exist');

		cy.visit('/');
		cy.contains('Madrid').should('exist');

		cy.contains('OPEN').click();
		cy.contains(translations.detail.delete_button).click();
		cy.contains(translations.detail.add_button).should('exist');
	});

	it('render the weather information', () => {
		cy.visit(
			'/BBVA-Technical-Test/detail/Madrid/Spain?coordinates=40.4165,-3.70256',
		);

		cy.get('[data-test="current-weather"]').should('exist');
		cy.get('[data-test="daily-weather"]').should('exist');
	});
});
