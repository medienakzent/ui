<script lang="ts" module>
	/**
	 * Basis-Stil der Abschnittsüberschrift — die im Bestand 45×/24 Dateien
	 * wörtlich duplizierte Klassenkette. Als Konstante exportiert, damit
	 * Sonderfälle (z. B. eine Überschrift, die aus Layout-Gründen Teil einer
	 * fremden Klassenkette sein muss) dieselbe Quelle benutzen statt zu kopieren.
	 * `text-xs` ist laut Designkanon die Untergrenze — hier nicht unterschreiten.
	 */
	export const sectionLabelClass =
		'text-xs font-semibold tracking-wide text-muted-foreground uppercase';
</script>

<script lang="ts">
	import { cn } from '$lib/ui-utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * Abschnittsüberschrift ("KUNDENANSCHRIFT", "GERÄTE", …) über einem
	 * Detail-Block, einer Feldgruppe oder einer Suchergebnis-Gruppe.
	 *
	 * Die Abstände variieren im Bestand (pur, `mb-1`, `mb-2`, `mb-3`,
	 * `px-2 pt-1 pb-0.5`, `shrink-0`, …) — sie kommen weiterhin von außen über
	 * `class` und werden per `cn()` gemerged, der Basis-Stil steckt hier drin.
	 *
	 * `as` wählt das Element: im Bestand `h3` (Mehrheit), daneben `h4` für
	 * verschachtelte Blöcke sowie `span`/`p`, wo die Überschrift Teil einer Zeile
	 * ist und kein Heading sein darf (Semantik der Aufrufstelle bleibt erhalten).
	 */
	type Props = {
		/** Gerendertes Element — `h3` (Standard), `h4`, `span`, `p`, … */
		as?: string;
		/** Zusätzliche Klassen (Abstände/Layout), überschreiben den Basis-Stil. */
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	};

	let { as = 'h3', class: className = '', children, ...rest }: Props = $props();
</script>

<svelte:element this={as} class={cn(sectionLabelClass, className)} {...rest}>
	{@render children?.()}
</svelte:element>
