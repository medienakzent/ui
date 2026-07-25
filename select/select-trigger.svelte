<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { cn } from '$lib/utils';

	let { class: className, children, ...restProps }: SelectPrimitive.TriggerProps = $props();
</script>

<SelectPrimitive.Trigger
	class={cn(
		'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
		'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
		'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
		className
	)}
	{...restProps}
>
	<span class="line-clamp-1 text-left">
		{@render children?.()}
	</span>
	<ChevronDown class="ml-2 size-4 opacity-60" />
</SelectPrimitive.Trigger>
