import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// `svelte()` statt `sveltekit()` — dieses Paket kennt kein SvelteKit.
// Tailwind wird nur für die Browser-Tests gebraucht, damit die Komponenten
// dort gestylt rendern; ausgeliefert wird es nicht.
export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'unit',
					environment: 'node',
					include: ['src/**/*.spec.ts'],
					exclude: ['src/**/*.svelte.test.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'browser',
					include: ['src/**/*.svelte.test.ts'],
					browser: {
						enabled: true,
						provider: playwright(),
						headless: true,
						instances: [{ browser: 'chromium' }]
					}
				}
			}
		]
	}
});
