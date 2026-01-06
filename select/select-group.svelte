<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

	let { children, ...restProps }: SelectPrimitive.GroupProps = $props();
</script>

<SelectPrimitive.Group {...restProps}>
	{@render children?.()}
</SelectPrimitive.Group>
