<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { cn } from '../utils/ui-utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AvatarPrimitive.ImageProps = $props();
</script>

<!--
	`object-contain` statt des shadcn-Defaults `object-cover`: Logos und
	Firmenbilder sind selten quadratisch und wuerden sonst beschnitten.
	Aufrufer koennen es per `class` weiterhin ueberschreiben (tailwind-merge).
-->
<AvatarPrimitive.Image
	bind:ref
	data-slot="avatar-image"
	class={cn('aspect-square size-full object-contain', className)}
	{...restProps}
/>
