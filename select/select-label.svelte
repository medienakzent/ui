<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	let { class: className, ...restProps }: SelectPrimitive.LabelProps = $props();
</script>

<SelectPrimitive.Label
	class={cn("px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-300", className)}
	{...restProps}
>
	<slot />
</SelectPrimitive.Label>
