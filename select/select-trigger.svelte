<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";

	let { class: className, children, ...restProps }: SelectPrimitive.TriggerProps = $props();
</script>

<SelectPrimitive.Trigger
	class={cn(
		"border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
		"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
		className
	)}
	{...restProps}
>
	<span class="line-clamp-1 text-left">
		{@render children?.()}
	</span>
	<ChevronDown class="ml-2 size-4 opacity-60" />
</SelectPrimitive.Trigger>
