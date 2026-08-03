<script lang="ts">
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import CircleX from '@lucide/svelte/icons/circle-x';
	import { getUiLabels } from '../labels/index.js';

	/**
	 * Einheitliche Ja/Nein-Anzeige als Icon: grüner Haken im Kreis = `true`,
	 * rotes X im Kreis = `false`.
	 *
	 * Der Baustein bewertet nichts selbst — er erwartet einen fertigen boolean.
	 * Wie ein Datenwert darauf abgebildet wird ('J'/'N', 0/1, Flag-Spalte …),
	 * entscheidet der Aufrufer. Es gibt bewusst KEINEN dritten Zustand: ein
	 * fehlender Wert (null/undefined/leeres Feld) wird am Aufrufer zu `false`
	 * aufgelöst und damit — wie bisher — als „Nein" dargestellt.
	 *
	 * Ja/Nein bleibt für Screenreader und Tooltip als Text erhalten.
	 */
	type Props = {
		value: boolean;
		size?: number;
	};

	let { value, size = 16 }: Props = $props();

	const labels = getUiLabels();

	const label = $derived(value ? $labels.yes : $labels.no);
</script>

<span class="inline-flex items-center" role="img" title={label} aria-label={label}>
	{#if value}
		<CircleCheck {size} class="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
	{:else}
		<CircleX {size} class="text-red-600 dark:text-red-400" aria-hidden="true" />
	{/if}
</span>
