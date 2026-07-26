<script lang="ts">
	import { cn } from '$lib/utils.js';

	/**
	 * Schlichter Fortschrittsbalken für "X von Y erledigt"-Zustände (Tour-,
	 * Projekt- und Gerätelisten). Farbe ist funktional: primary solange offen,
	 * Grün erst bei 100 %.
	 */
	let {
		value,
		max,
		label = undefined,
		showCount = true,
		class: className = ''
	}: {
		value: number;
		max: number;
		label?: string;
		showCount?: boolean;
		class?: string;
	} = $props();

	const pct = $derived(max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0);
	const done = $derived(max > 0 && value >= max);
</script>

<div class={cn('min-w-0', className)}>
	{#if label || showCount}
		<div class="mb-1 flex items-baseline justify-between gap-2 text-xs text-muted-foreground">
			{#if label}<span class="truncate">{label}</span>{/if}
			{#if showCount}<span class="shrink-0 font-medium tabular-nums">{value}/{max}</span>{/if}
		</div>
	{/if}
	<div
		class="h-1.5 w-full overflow-hidden rounded-full bg-muted"
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={max}
	>
		<div
			class={cn(
				'h-full rounded-full transition-[width] duration-300',
				done ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-primary'
			)}
			style:width={`${pct}%`}
		></div>
	</div>
</div>
