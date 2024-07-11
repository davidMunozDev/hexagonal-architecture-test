import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8080',
		specPattern: 'tests/e2e/tests/*.spec.{js,jsx,ts,tsx}',
		supportFile: 'tests/e2e/support/e2e.js',
	},
});
