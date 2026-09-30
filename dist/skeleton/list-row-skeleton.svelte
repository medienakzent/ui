<script lang="ts">
	import Skeleton from './skeleton.svelte';

	/**
	 * The single skeleton loader for every list view. Mirrors the `ListRow`
	 * layout (title + id badge, a meta line, a metric-badge row, a date) so the
	 * placeholder matches the real rows. Renders `count` shimmering rows inside a
	 * `divide-y` container — drop it in wherever a list is loading.
	 */
	type Props = {
		count?: number;
	};

	let { count = 5 }: Props = $props();
</script>

<div class="divide-y divide-border">
	{#each Array(count) as _, i (i)}
		<!-- Wie list-row.svelte: kein -mx-2/px-2 mehr (ragte über Container-Border) -->
		<div class="flex items-start justify-between gap-4 py-3">
			<div class="flex-1 space-y-2">
				<div class="flex items-center gap-2">
					<Skeleton class="h-4 w-32" />
					<Skeleton class="h-5 w-16 rounded-md" />
				</div>
				<Skeleton class="h-3 w-48" />
				<div class="flex gap-2 pt-1">
					<Skeleton class="h-6 w-20 rounded-md" />
					<Skeleton class="h-6 w-20 rounded-md" />
				</div>
			</div>
			<Skeleton class="h-3 w-16" />
		</div>
	{/each}
</div>
