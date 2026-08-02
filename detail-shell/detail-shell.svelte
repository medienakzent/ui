<script lang="ts">
	import DetailSkeleton from '$lib/components/ui/skeleton/detail-skeleton.svelte';
	import { cn } from '$lib/ui-utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * Kopf-Gerüst der Detailseiten: der Guard, mit dem alle 10 Detailseiten
	 * beginnen — Skeleton beim Laden, roter Fehlersatz, „nicht gefunden"-Satz,
	 * sonst der Inhalt. Reihenfolge ist Teil des Vertrags (Laden > Fehler >
	 * nicht gefunden).
	 *
	 * BEWUSST NICHT enthalten: Titelzeile (`<h1>` + Nummern-Pill). Das Markup
	 * direkt hinter dem Guard ist zu verschieden, um es sinnvoll zu kapseln —
	 * unterschiedliche Wrapper (`space-y-4` vs. `space-y-4 p-4`), unterschiedliche
	 * Kopfzeilen (`flex items-center gap-3` vs. `flex flex-wrap items-center
	 * gap-3` vs. Titel und Badge-Reihe untereinander), zwischen den Badges
	 * stehende Aktionsgruppen mit `ml-auto`, im Kopf eingehängte Popups, und zwei
	 * Seiten (Protokoll-Detail, Tour-Detail) ohne Titelzeile. Ein `title`/
	 * `badges`-Snippet bräuchte dafür so viele Layout-Schalter, dass die Seiten
	 * dadurch nicht kürzer, sondern nur indirekter würden.
	 *
	 * Texte kommen als Props von außen — keine Übersetzungs-/Domänen-Importe.
	 */
	type Props = {
		/** Lädt gerade — zeigt `DetailSkeleton`. */
		loading?: boolean;
		/** Fehlertext oder `null`/`''`, wenn kein Fehler vorliegt. */
		error?: string | null;
		/** Entity konnte nicht gefunden werden. */
		notFound?: boolean;
		/** Text des „nicht gefunden"-Zustands. */
		notFoundText?: string;
		/** Zeilen des Skeletons (siehe `DetailSkeleton`). */
		skeletonRows?: number;
		/** Klassen der Zustands-Absätze. Standard `p-4` wie auf den Detailseiten;
		 *  in bereits gepolsterten Containern (Protokoll-Detail) auf `''` setzen. */
		stateClass?: string;
		/** Inhalt, sobald geladen, fehlerfrei und gefunden. */
		children: Snippet;
	};

	let {
		loading = false,
		error = null,
		notFound = false,
		notFoundText = '',
		skeletonRows = 6,
		stateClass = 'p-4',
		children
	}: Props = $props();
</script>

{#if loading}
	<DetailSkeleton rows={skeletonRows} />
{:else if error}
	<p class={cn('text-sm font-semibold text-destructive', stateClass)}>{error}</p>
{:else if notFound}
	<p class={cn('text-sm text-muted-foreground', stateClass)}>{notFoundText}</p>
{:else}
	{@render children()}
{/if}
