<script lang="ts">
	import { tick } from 'svelte';

	/**
	 * Unsichtbarer „Mehr laden"-Sentinel für inkrementell gerenderte Listen
	 * (#189): Die Liste rendert initial nur `visible` Zeilen; sobald der
	 * Sentinel in Sichtweite scrollt, fordert er über `onMore` die nächste
	 * Tranche an. Nach dem DOM-Update wird der Sentinel re-observiert, damit
	 * er auch dann weiterfeuert, wenn er sichtbar bleibt (schnelles Scrollen).
	 */
	type Props = {
		total: number;
		visible: number;
		step?: number;
		onMore: (next: number) => void;
	};

	let { total, visible, step = 100, onMore }: Props = $props();

	let sentinel = $state<HTMLDivElement | undefined>(undefined);
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

	// Seiteneffekt: Observer an den gebundenen Sentinel hängen und beim
	// Wegfallen/Unmount wieder abräumen.
	$effect(() => {
		const node = sentinel;
		if (!node || typeof IntersectionObserver === 'undefined') return;
		const io = new IntersectionObserver(handleIntersect, { rootMargin: '320px 0px' });
		observer = io;
		io.observe(node);
		return () => {
			io.disconnect();
			if (observer === io) observer = undefined;
		};
	});
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
