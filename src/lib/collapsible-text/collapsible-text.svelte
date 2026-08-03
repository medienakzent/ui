<script lang="ts">
	import { getUiLabels } from '../labels/index.js';

	/**
	 * Textblock mit Überschrift, der auf der Beleg-Detailseite standardmäßig auf
	 * 3 Zeilen begrenzt wird (line-clamp-3). Ist der Inhalt länger, erscheint ein
	 * "Mehr anzeigen"-Umschalter — so geht kein Platz durch lange Betreff-/
	 * Schluss-/Bemerkungstexte verloren.
	 */
	type Props = {
		title: string;
		text: string | null | undefined;
	};

	let { title, text }: Props = $props();

	const labels = getUiLabels();

	let expanded = $state(false);
	let el = $state<HTMLParagraphElement | undefined>(undefined);
	let overflowing = $state(false);

	// Overflow nur im eingeklappten Zustand messen (dort ist die Höhe begrenzt).
	// Seiteneffekt (DOM-Messung nach dem Rendern), kein abgeleiteter Wert:
	// `text` wird mitgelesen, damit nach Textwechsel neu gemessen wird.
	$effect(() => {
		void text;
		if (el && !expanded) {
			overflowing = el.scrollHeight - el.clientHeight > 2;
		}
	});
</script>

{#if text}
	<div class="border-t border-border pt-3">
		<h3 class="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
			{title}
		</h3>
		<p bind:this={el} class="text-sm whitespace-pre-line {expanded ? '' : 'line-clamp-3'}">
			{text}
		</p>
		{#if overflowing || expanded}
			<button
				type="button"
				onclick={() => (expanded = !expanded)}
				class="mt-1 text-xs font-medium text-primary hover:underline"
			>
				{expanded ? $labels.showLess : $labels.showMore}
			</button>
		{/if}
	</div>
{/if}
