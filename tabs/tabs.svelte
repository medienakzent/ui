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
			class="px-4 py-2 text-sm font-medium {active === tab.id
				? 'border-b-2 border-foreground text-foreground'
				: 'text-muted-foreground'}"
			on:click={() => (active = tab.id)}
		>
			{tab.label}{tab.badge != null ? ` (${tab.badge})` : ''}
		</button>
	{/each}
</div>
