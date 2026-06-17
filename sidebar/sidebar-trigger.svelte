<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import PanelLeftClose from '@lucide/svelte/icons/panel-left-close';
	import PanelLeftOpen from '@lucide/svelte/icons/panel-left-open';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from './context.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick?: (e: MouseEvent) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<Button
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	variant="ghost"
	size="icon"
	class={cn('size-9 text-muted-foreground', className)}
	type="button"
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	{...restProps}
>
	{#if sidebar.open}
		<PanelLeftClose class="size-5" />
	{:else}
		<PanelLeftOpen class="size-5" />
	{/if}
	<span class="sr-only">Toggle Sidebar</span>
</Button>
