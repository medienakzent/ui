<script lang="ts">
	import Skeleton from './skeleton.svelte';

	/**
	 * #187: Generic placeholder for entity detail pages (Customer, Project,
	 * Device, Order, Delivery Note, Tour-Project). Mirrors the common detail
	 * layout — a title + badge row, an action-button row, and a label/value
	 * grid — so the first paint shows structure instead of an empty screen or a
	 * bare "Lädt…" line. `rows` controls how many grid rows are drawn.
	 */
	export let rows: number = 6;
</script>

<div class="space-y-4 p-1" aria-busy="true" aria-live="polite">
	<!-- Title + badge -->
	<div class="flex flex-wrap items-center gap-3">
		<Skeleton class="h-7 w-48" />
		<Skeleton class="h-5 w-20 rounded-md" />
		<Skeleton class="h-5 w-24 rounded-md" />
	</div>

	<!-- Action buttons -->
	<div class="flex flex-wrap gap-2">
		<Skeleton class="h-9 w-24 rounded-md" />
		<Skeleton class="h-9 w-28 rounded-md" />
	</div>

	<!-- Label / value grid -->
	<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 pt-2 sm:grid-cols-[auto_1fr_auto_1fr]">
		{#each Array(rows) as _, i (i)}
			<Skeleton class="h-4 w-24" />
			<Skeleton class="h-4 w-32" />
		{/each}
	</div>
</div>
