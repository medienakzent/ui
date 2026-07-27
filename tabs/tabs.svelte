<script lang="ts">
	import { onMount } from 'svelte';

	type Tab = {
		id: string;
		label: string;
		badge?: string | number | null;
	};

	export let tabs: Tab[];
	export let active: string = tabs[0]?.id ?? '';

	// Bei Überbreite (viele Tabs / schmale Screens) scrollt die Leiste horizontal;
	// Kanten-Fades zeigen an, dass weitere Tabs außerhalb des Sichtbereichs liegen.
	let scroller: HTMLDivElement | undefined;
	let canLeft = false;
	let canRight = false;

	function updateHints() {
		if (!scroller) return;
		canLeft = scroller.scrollLeft > 2;
		canRight = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2;
	}

	onMount(() => {
		updateHints();
		const ro = new ResizeObserver(updateHints);
		if (scroller) ro.observe(scroller);
		return () => ro.disconnect();
	});

	// Tab-Wechsel kann die Leiste neu rendern (Badges) — Hinweise nachziehen.
	$: if (tabs && scroller) updateHints();
</script>

<div class="relative">
	<div bind:this={scroller} on:scroll={updateHints} class="row-scroll gap-1 border-b border-border">
		{#each tabs as tab (tab.id)}
			<button
				class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium whitespace-nowrap {active ===
				tab.id
					? 'border-b-2 border-foreground text-foreground'
					: 'text-muted-foreground'}"
				on:click={() => (active = tab.id)}
			>
				{tab.label}
				{#if tab.badge != null}
					<span
						class="inline-flex min-w-5 items-center justify-center rounded-md bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground"
					>
						{tab.badge}
					</span>
				{/if}
			</button>
		{/each}
	</div>
	{#if canLeft}
		<div
			class="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent"
			aria-hidden="true"
		></div>
	{/if}
	{#if canRight}
		<div
			class="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent"
			aria-hidden="true"
		></div>
	{/if}
</div>
