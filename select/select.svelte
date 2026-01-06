<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

	let {
		value = $bindable(),
		defaultValue,
		type = 'single',
		name,
		disabled,
		required,
		loop,
		children,
		...restProps
	}: SelectPrimitive.Props = $props();
</script>

<SelectPrimitive.Root
	bind:value
	{defaultValue}
	{type}
	{name}
	{disabled}
	{required}
	{loop}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.Root>
