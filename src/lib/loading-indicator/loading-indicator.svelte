<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from '../spinner/spinner.svelte';
	import { cn } from '../utils/ui-utils.js';

	/**
	 * Inline "loading…" indicator: an animated spinner next to a label. Drop-in
	 * replacement for the static `<p>Lade …</p>` texts used across detail pages,
	 * selectors and popups. The label goes in the default content; pass layout
	 * tweaks (padding, text size) via `class`.
	 */
	let className = '';
	export { className as class };
	export let spinnerClass: string = '';
	export let children: Snippet | undefined = undefined;
</script>

<div
	class={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}
	role="status"
	aria-live="polite"
>
	<Spinner class={spinnerClass} />
	{@render children?.()}
</div>
