<script lang="ts">
	import Skeleton from './skeleton.svelte';

	/**
	 * Shimmering placeholder pills for a list item's metric-badge row while the
	 * lazy metrics load. Sits inside the `badges` slot's flex-wrap container, so
	 * it renders the pills directly (no wrapper).
	 */
</script>

<Skeleton class="h-6 w-24 rounded-md" />
<Skeleton class="h-6 w-20 rounded-md" />
<Skeleton class="h-6 w-16 rounded-md" />
