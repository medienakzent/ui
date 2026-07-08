<script lang="ts">
	type Tab = {
		id: string;
		label: string;
		badge?: string | number | null;
	};

	export let tabs: Tab[];
	export let active: string = tabs[0]?.id ?? '';
</script>

<div class="flex gap-1 border-b border-border">
	{#each tabs as tab (tab.id)}
		<button
			class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium {active === tab.id
				? 'border-b-2 border-foreground text-foreground'
				: 'text-muted-foreground'}"
			on:click={() => (active = tab.id)}
		>
			{tab.label}
			{#if tab.badge != null}
				<span
					class="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground"
				>
					{tab.badge}
				</span>
			{/if}
		</button>
	{/each}
</div>
