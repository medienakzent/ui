<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type SingleSelectProps = {
		value?: string;
		type?: 'single';
		name?: string;
		disabled?: boolean;
		required?: boolean;
		children?: Snippet;
		[key: string]: unknown;
	};

	let {
		value = $bindable(),
		type = 'single',
		name,
		disabled,
		required,
		children,
		...restProps
	}: SingleSelectProps = $props();
</script>

<SelectPrimitive.Root bind:value {type} {name} {disabled} {required} {...restProps}>
	{@render children?.()}
</SelectPrimitive.Root>
