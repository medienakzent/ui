<script lang="ts">
	import { onDestroy, tick } from 'svelte';

	/**
	 * Unsichtbarer „Mehr laden"-Sentinel für inkrementell gerenderte Listen
	 * (#189): Die Liste rendert initial nur `visible` Zeilen; sobald der
	 * Sentinel in Sichtweite scrollt, fordert er über `onMore` die nächste
	 * Tranche an. Nach dem DOM-Update wird der Sentinel re-observiert, damit
	 * er auch dann weiterfeuert, wenn er sichtbar bleibt (schnelles Scrollen).
	 */
	export let total: number;
	export let visible: number;
	export let step: number = 100;
	export let onMore: (next: number) => void;

	let sentinel: HTMLDivElement | undefined;
	let observer: IntersectionObserver | undefined;

	async function handleIntersect(entries: IntersectionObserverEntry[]) {
		if (!entries.some((e) => e.isIntersecting)) return;
		if (visible >= total) return;
		onMore(Math.min(total, visible + step));
		await tick();
		if (sentinel && observer) {
			observer.unobserve(sentinel);
			observer.observe(sentinel);
		}
	}

	$: setupObserver(sentinel);
	function setupObserver(node: HTMLDivElement | undefined) {
		observer?.disconnect();
		observer = undefined;
		if (!node || typeof IntersectionObserver === 'undefined') return;
		observer = new IntersectionObserver(handleIntersect, { rootMargin: '320px 0px' });
		observer.observe(node);
	}

	onDestroy(() => observer?.disconnect());
</script>

{#if visible < total}
	<div
		bind:this={sentinel}
		class="py-3 text-center text-xs text-muted-foreground"
		role="status"
		aria-live="polite"
	>
		{visible} / {total}
	</div>
{/if}
