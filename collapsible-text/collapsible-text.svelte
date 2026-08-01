<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { dictionary } from '$lib/i18n';

	/**
	 * Textblock mit Überschrift, der auf der Beleg-Detailseite standardmäßig auf
	 * 3 Zeilen begrenzt wird (line-clamp-3). Ist der Inhalt länger, erscheint ein
	 * "Mehr anzeigen"-Umschalter — so geht kein Platz durch lange Betreff-/
	 * Schluss-/Bemerkungstexte verloren.
	 */
	export let title: string;
	export let text: string | null | undefined;

	let expanded = false;
	let el: HTMLParagraphElement | undefined;
	let overflowing = false;

	// Overflow nur im eingeklappten Zustand messen (dort ist die Höhe begrenzt).
	afterUpdate(() => {
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
				on:click={() => (expanded = !expanded)}
				class="mt-1 text-xs font-medium text-primary hover:underline"
			>
				{expanded ? $dictionary.common.actions.showLess : $dictionary.common.actions.showMore}
			</button>
		{/if}
	</div>
{/if}
