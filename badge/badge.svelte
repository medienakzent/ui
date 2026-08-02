<script lang="ts" module>
	export type BadgeVariant = 'id' | 'neutral' | 'positive' | 'warning' | 'signal' | 'info';

	/**
	 * Variant → classes. Außendienst-Umbau: nüchterne Optik — rounded-md statt
	 * Pill-Form, text-xs als Untergrenze, Farbe nur funktional (Ampel):
	 *  - `id`       inline id / secondary badge next to a title (grau)
	 *  - `neutral`  metric pill (counts, grau)
	 *  - `info`     Metadaten/Hinweis — bewusst dieselbe graue Optik wie neutral
	 *  - `positive` success / contract / done (grün)
	 *  - `warning`  attention / unchecked / locked (amber)
	 *  - `signal`   strong red marker (e.g. Begehungs-Auftrag)
	 */
	// Einheitliche Geometrie für ALLE Varianten (User-Vorgabe 2026-07-28):
	// rounded-md, border, px-2 py-1, text-xs font-medium — nur die Farbe variiert.
	export const badgeVariants: Record<BadgeVariant, string> = {
		id: 'rounded-md border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground',
		neutral:
			'rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground',
		positive:
			'rounded-md border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300',
		warning:
			'rounded-md border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300',
		signal:
			'rounded-md border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300',
		info: 'rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground'
	};
</script>

<script lang="ts">
	import { cn } from '$lib/ui-utils.js';

	/**
	 * Presentational pill. Renders a `<span>` by default; pass `href` or `onclick`
	 * to render an `<a>` / `<button>` that still looks like a badge (e.g. the
	 * "Ansprechpartner N" trigger in the tour-projects row).
	 */
	let {
		variant = 'neutral',
		href = null,
		onclick = undefined,
		class: className = '',
		children,
		...rest
	}: {
		variant?: BadgeVariant;
		href?: string | null;
		onclick?: ((e: MouseEvent) => void) | undefined;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	} = $props();

	const tag = $derived(href ? 'a' : onclick ? 'button' : 'span');
	// `relative z-10` lifts interactive badges above a ListRow stretched-link
	// overlay so they stay clickable while the rest of the row navigates.
	const interactive = $derived(href || onclick ? 'relative z-10 hover:bg-muted' : '');
</script>

<svelte:element
	this={tag}
	{href}
	{onclick}
	type={tag === 'button' ? 'button' : undefined}
	class={cn(badgeVariants[variant], interactive, className)}
	{...rest}
>
	{@render children?.()}
</svelte:element>
