<script lang="ts">
	import { cn } from '$lib/utils.js';

	/**
	 * Lightweight CSS-only loading spinner. Inherits the current text color
	 * (`border-current`), so it adapts to whatever context it sits in. Override
	 * the size with `class` (e.g. `class="size-6"`).
	 */
	let className = '';
	export { className as class };
</script>

<span
	class={cn(
		'inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent',
		className
	)}
	aria-hidden="true"
></span>
