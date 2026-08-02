<script lang="ts">
	/**
	 * Unified list-row template. One layout for every list across the app.
	 *
	 * Regions (named slots, all optional except `title`):
	 *   title     — primary text
	 *   id-badge  — inline id / secondary badge next to the title
	 *   timeframe — date range line (Zeitraum)
	 *   meta      — extra muted lines
	 *   badges    — row of metric badges (Reihe an Badges)
	 *   date      — top-right timestamp/date
	 *   actions   — below the date, buttons/controls
	 *
	 * Whole-row click:
	 *   • No actions  → the entire row IS the link (simplest, most robust — the
	 *     whole element is one anchor). Used by every list without inline controls.
	 *   • With actions → the row is a relative container; the title link stretches
	 *     over it via a ::before overlay (see the style block), and the buttons sit
	 *     above it through z-10, so a button never nests inside an anchor.
	 *
	 * The whole row gets a subtle hover background; `load` is wired to
	 * `use:onVisible` for lazy metrics.
	 */
	import { onVisible } from '$lib/actions/on-visible';
	import { cn } from '$lib/ui-utils.js';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let href: string | null = null;
	export let load: (() => void) | null = null;
	export let indent: boolean = false;
	/** Beschriftung des Aufklapp-Buttons für die Badge-Reihe. */
	export let badgesLabel: string = 'Details';
	let className = '';
	export { className as class };

	/** Untere Badge-Reihe: standardmäßig eingeklappt, per Button pro Zeile
	 *  aufklappbar — spart Platz und hält die Liste übersichtlich. */
	let badgesExpanded = false;

	/** Sichtbarkeit der Zeile (IntersectionObserver). Die Metrics-Subquery `load`
	 *  läuft NUR, wenn die Zeile sichtbar UND aufgeklappt ist — eingeklappte oder
	 *  außerhalb des Viewports liegende Zeilen lösen keine Query aus. */
	let rowVisible = false;
	$: if (rowVisible && badgesExpanded && load) load();

	// A plain anchor wrapper is only safe when the row has no interactive controls.
	// Der Aufklapp-Button zählt als Control, daher bei vorhandenen Badges kein
	// Ganz-Zeilen-Anchor (sonst Button im Anchor verschachtelt).
	$: wholeRowLink = !!href && !$$slots.actions && !$$slots.badges;
</script>

<svelte:element
	this={wholeRowLink ? 'a' : 'div'}
	href={wholeRowLink ? href : undefined}
	use:onVisible={load ? () => (rowVisible = true) : null}
	class={cn(
		// px-4 + Container-Bleed: Die Zeile hat nur Innenabstand; der zugehörige
		// Listen-Container (ListShell u. a.) zieht sich per -mx-4 auf Seitenbreite.
		// So laufen Hintergrund (Tint, Hover) UND divide-y-Trennlinien gleich breit
		// bis an den Rand, während der Text exakt in der Flucht bleibt. In
		// eingerahmten Karten (Dienstleistungen) ohne -mx-4 wirkt px-4 als
		// normaler Inhalts-Einzug innerhalb der Border.
		'relative isolate flex items-start justify-between gap-4 px-4 py-3 text-sm text-foreground transition-colors',
		href && 'hover:bg-muted/50',
		indent && 'ml-6',
		className
	)}
>
	<div class="min-w-0 flex-1 space-y-2">
		<!-- Titel nutzt die volle Zeilenbreite; Status-/Info-Badges stehen darunter
		     in einer einzeiligen, seitlich scrollbaren Reihe (row-scroll). -->
		<div class="space-y-1">
			<span class="block font-semibold">
				{#if href && !wholeRowLink}
					<a {href} class="stretched-link">
						<slot name="title" />
					</a>
				{:else}
					<slot name="title" />
				{/if}
			</span>
			{#if $$slots['id-badge']}
				<div class="row-scroll">
					<slot name="id-badge" />
				</div>
			{/if}
		</div>
		{#if $$slots.timeframe}
			<p class="text-xs text-muted-foreground"><slot name="timeframe" /></p>
		{/if}
		{#if $$slots.meta}
			<div class="space-y-1 text-xs text-muted-foreground"><slot name="meta" /></div>
		{/if}
		{#if $$slots.badges}
			<div class="row-scroll pt-1">
				<!-- Toggle in identischer Badge-Form (Badge mit onclick → <button>). -->
				<Badge
					variant="neutral"
					onclick={() => (badgesExpanded = !badgesExpanded)}
					aria-expanded={badgesExpanded}
					class="inline-flex shrink-0 items-center gap-1"
				>
					<ChevronRight
						size={12}
						class="transition-transform {badgesExpanded ? 'rotate-180' : ''}"
					/>
					{badgesLabel}
				</Badge>
				{#if badgesExpanded}
					<!-- Ohne Aufklapp-Animation: Badges rechts neben dem Button einfaden.
					     z-10 hält interaktive Badges über dem Zeilen-Link-Overlay. -->
					<div class="relative z-10 flex animate-in items-center gap-2 duration-150 fade-in">
						<slot name="badges" />
					</div>
				{/if}
			</div>
		{/if}
	</div>
	{#if $$slots.date || $$slots.actions}
		<div class="flex shrink-0 flex-col items-end gap-2">
			{#if $$slots.date}
				<span class="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
					<slot name="date" />
				</span>
			{/if}
			{#if $$slots.actions}
				<div class="relative z-10 flex items-center gap-2"><slot name="actions" /></div>
			{/if}
		</div>
	{/if}
</svelte:element>

<style>
	/* Stretched link for rows that also have action buttons: the title's
	   ::before overlay covers the whole (relative) row, so a click anywhere
	   navigates, while the buttons sit above it via z-10. */
	.stretched-link::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
	}
</style>
