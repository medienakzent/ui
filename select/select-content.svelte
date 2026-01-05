<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	let {
		class: className,
		align = "start",
		children,
		...restProps
	}: SelectPrimitive.ContentProps = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		class={cn(
			"z-50 min-w-[10rem] overflow-hidden rounded-md border border-slate-200 bg-popover text-popover-foreground shadow-md animate-in fade-in-80 dark:border-slate-800 dark:bg-slate-900",
			"data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
			className
		)}
		{align}
		{...restProps}
	>
		<SelectPrimitive.Viewport class="p-1">
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
