<script lang="ts">
	import * as Sidebar from '../sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import type { ShellNavItem } from './nav-types.js';

	type Props = {
		items: ShellNavItem[];
	} & ComponentProps<typeof Sidebar.Group>;

	let { ref = $bindable(null), items, ...restProps }: Props = $props();
</script>

<Sidebar.Group bind:ref {...restProps}>
	<Sidebar.GroupContent>
		<!-- Einstellungen/Support/Feedback in EINER Reihe am unteren Menürand
		     (Nutzer-Vorgabe 2026-07-28); im eingeklappten Icon-Modus wieder
		     untereinander (nur Icons). -->
		<div class="flex items-stretch gap-1 group-data-[collapsible=icon]:flex-col">
			{#each items as item (item.id)}
				<!-- Nur Icons (Nutzer-Vorgabe 2026-07-28) — Beschriftung via
				     title/aria-label statt sichtbarem Text. -->
				<a
					href={item.href}
					onclick={item.onClick}
					title={item.label}
					aria-label={item.label}
					class="flex flex-1 items-center justify-center rounded-md px-1 py-2 text-sidebar-foreground/70 group-data-[collapsible=icon]:flex-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
				>
					<item.icon class="size-4 shrink-0" />
				</a>
			{/each}
		</div>
	</Sidebar.GroupContent>
</Sidebar.Group>
