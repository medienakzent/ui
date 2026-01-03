<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { Check } from "lucide-svelte";
	import { cn } from "$lib/utils";

	let { class: className, ...restProps }: SelectPrimitive.ItemProps = $props();
</script>

<SelectPrimitive.Item
	class={cn(
		"relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...restProps}
>
	<span class="absolute left-2 flex size-4 items-center justify-center">
		<Check class="size-4" />
	</span>
	<span class="ml-6 flex-1">
		<slot />
	</span>
</SelectPrimitive.Item>
