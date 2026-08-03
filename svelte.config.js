import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * Bibliotheks-Konfiguration — bewusst OHNE `kit`-Block und ohne Adapter.
 * Dieses Paket ist framework-neutral: es soll sowohl in SvelteKit-Apps als auch
 * in reinen Svelte+Vite-Apps laufen. Ein `$lib`-Alias existiert hier deshalb
 * nicht; alle Importe innerhalb der Bausteine sind relativ.
 */
export default {
	preprocess: vitePreprocess()
};
