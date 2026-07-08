<script lang="ts" module>
	export type BadgeVariant = 'id' | 'neutral' | 'positive' | 'warning' | 'signal';

	/**
	 * Variant → classes, lifted verbatim from the repeated pill markup across the
	 * list items so the visual result is unchanged.
	 *  - `id`       inline id / secondary badge next to a title
	 *  - `neutral`  metric pill (counts)
	 *  - `positive` success / contract / done
	 *  - `warning`  attention / unchecked / locked
	 *  - `signal`   strong red marker (e.g. Begehungs-Auftrag)
	 */
	export const badgeVariants: Record<BadgeVariant, string> = {
		id: 'rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground',
		neutral:
			'rounded-full border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground',
		positive:
			'rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700',
		warning:
			'rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700',
		signal:
			'rounded-full border border-red-300 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700'
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

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
