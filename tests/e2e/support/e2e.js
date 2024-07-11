import './commands';

Cypress.on('uncaught:exception', (e, runnable) => {
	console.log('error', e);
	console.log('runnable', runnable);
});
