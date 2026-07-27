<script lang="ts">
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import CircleX from '@lucide/svelte/icons/circle-x';
	import { dictionary } from '$lib/i18n';

	/**
	 * Einheitliche JaNein-Anzeige als Icon: grüner Haken im Kreis = Ja,
	 * rotes X im Kreis = Nein. Akzeptiert die üblichen Repräsentationen
	 * ('J'/'N'-Strings, number-Flags, boolean); null/undefined gilt fachlich
	 * als Nein. Ja/Nein bleibt für Screenreader und Tooltip als Text erhalten.
	 */
	let {
		value,
		size = 16
	}: {
		value: string | number | boolean | null | undefined;
		size?: number;
	} = $props();

	const ja = $derived(value === 'J' || value === 1 || value === true);
	const label = $derived(ja ? $dictionary.common.yes : $dictionary.common.no);
</script>

<span class="inline-flex items-center" role="img" title={label} aria-label={label}>
	{#if ja}
		<CircleCheck {size} class="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
	{:else}
		<CircleX {size} class="text-red-600 dark:text-red-400" aria-hidden="true" />
	{/if}
</span>
