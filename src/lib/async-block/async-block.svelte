<script lang="ts">
	import LoadingIndicator from '../loading-indicator/loading-indicator.svelte';
	import type { Snippet } from 'svelte';

	/**
	 * Lade-/Fehler-/Leer-Zustand für Listen und Abschnitte — die im Bestand 13×
	 * wörtlich wiederholte Kette
	 *
	 *   {#if loading} … {:else if error} … {:else if leer} … {:else} Inhalt
	 *
	 * Die Reihenfolge der Zustände ist Teil des Vertrags: Laden schlägt Fehler,
	 * Fehler schlägt Leer. Der Standardfall (Spinner + Text, roter Fehlersatz,
	 * muted Leer-Satz) braucht keine Snippets; wer abweichend rendert (z. B.
	 * `ListRowSkeleton` statt Spinner), reicht das passende `*Content`-Snippet
	 * durch. Die Snippets heißen bewusst nicht wie die Props (`loading`/`error`/
	 * `empty`), weil Props und Snippets denselben Namensraum teilen.
	 *
	 * Texte kommen als Props von außen — der Baustein bleibt frei von
	 * Übersetzungs-/Domänen-Abhängigkeiten und ist so kopierbar.
	 */
	type Props = {
		/** Lädt gerade — hat Vorrang vor `error` und `empty`. */
		loading?: boolean;
		/** Fehlertext oder `null`/`''`, wenn kein Fehler vorliegt. */
		error?: string | null;
		/** Keine Daten vorhanden (i. d. R. `items.length === 0`). */
		empty?: boolean;
		/** Label neben dem Spinner im Standard-Ladezustand. */
		loadingText?: string;
		/** Text des Standard-Leer-Zustands. Ohne Text wird nichts gerendert. */
		emptyText?: string;
		/** Inhalt, sobald geladen, fehlerfrei und nicht leer. */
		children: Snippet;
		/** Eigener Ladezustand statt Spinner + `loadingText`. */
		loadingContent?: Snippet;
		/** Eigene Fehlerdarstellung; bekommt den Fehlertext als Argument. */
		errorContent?: Snippet<[string]>;
		/** Eigene Leerdarstellung statt `emptyText`. */
		emptyContent?: Snippet;
	};

	let {
		loading = false,
		error = null,
		empty = false,
		loadingText = '',
		emptyText = '',
		children,
		loadingContent,
		errorContent,
		emptyContent
	}: Props = $props();
</script>

{#if loading}
	{#if loadingContent}
		{@render loadingContent()}
	{:else}
		<LoadingIndicator>{loadingText}</LoadingIndicator>
	{/if}
{:else if error}
	{#if errorContent}
		{@render errorContent(error)}
	{:else}
		<p class="text-sm font-semibold text-destructive">{error}</p>
	{/if}
{:else if empty}
	{#if emptyContent}
		{@render emptyContent()}
	{:else if emptyText}
		<p class="text-sm text-muted-foreground">{emptyText}</p>
	{/if}
{:else}
	{@render children()}
{/if}
