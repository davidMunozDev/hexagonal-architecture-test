if ('serviceWorker' in navigator && !window?.Cypress)
	navigator.serviceWorker.register('/hexagonal-architecture-test/dev-sw.js?dev-sw', {
		scope: '/hexagonal-architecture-test/',
		type: 'module',
	});
