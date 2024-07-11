import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
	server: { port: 8080, host: true },
	base: '/BBVA-Technical-Test/',
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	plugins: [
		react(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'dev-sw.js',
			manifest: {
				name: 'Weather app for BBVA',
				background_color: '#ffffff',
				categories: ['weather', 'forecast'],
				description: 'Weather app',
				dir: 'ltr',
				display: 'standalone',
				display_override: ['standalone', 'fullscreen'],
				icons: [
					{
						src: '/BBVA-Technical-Test/favicon.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/BBVA-Technical-Test/splash.png',
						sizes: '1439x1439',
						type: 'image/png',
					},
				],
			},
			registerType: 'autoUpdate',
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./tests/setupTests.js'],
		include: ['**/*.test.?(c|m)[jt]s?(x)'],
	},
});
