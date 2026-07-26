<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		class: className,
		align = 'start',
		children,
		...restProps
	}: SelectPrimitive.ContentProps = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		class={cn(
			'z-50 min-w-40 animate-in overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md fade-in-80',
			'data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1',
			className
		)}
		{align}
		{...restProps}
	>
		<!-- #206: Dropdown auf den kollisionsbewussten Platz (bits-ui exposed
		     `--bits-floating-available-height`) begrenzen und intern scrollen
		     lassen, statt fensterhoch aufzulaufen. -->
		<SelectPrimitive.Viewport
			class="max-h-[var(--bits-floating-available-height)] w-full overflow-y-auto overscroll-contain p-1"
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
