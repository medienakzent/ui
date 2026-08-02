<script lang="ts">
	import { Button } from '../button/index.js';
	import { cn } from '../utils/ui-utils.js';
	import Menu from '@lucide/svelte/icons/menu';
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
	<!-- Einheitlich auf allen Geräten: der klassische Hamburger kommuniziert
	     „Menü" klarer als die Panel-Symbole. -->
	<Menu class="size-5" />
	<span class="sr-only">Toggle Sidebar</span>
</Button>
