if ('serviceWorker' in navigator && !window?.Cypress)
	navigator.serviceWorker.register('/BBVA-Technical-Test/dev-sw.js?dev-sw', {
		scope: '/BBVA-Technical-Test/',
		type: 'module',
	});
