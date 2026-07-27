<script lang="ts">
	/**
	 * Drawer content — Bottom-Sheet on mobile, side-sheet on larger screens.
	 *
	 * Sits on top of `ui/sheet` with a default `side="bottom"` and a
	 * drag-affordance bar so the drawer reads as a mobile bottom-sheet
	 * without forcing every caller to override the default side prop.
	 *
	 * For non-bottom layouts (left/right/top), use `<Sheet>` directly.
	 */
	import { Dialog as SheetPrimitive } from 'bits-ui';
	import { dictionary } from '$lib/i18n';
	import type { Snippet } from 'svelte';
	import SheetPortal from '../sheet/sheet-portal.svelte';
	import SheetOverlay from '../sheet/sheet-overlay.svelte';
	import { sheetVariants, type Side } from '../sheet/sheet-content.svelte';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		/** Defaults to 'bottom' so the drawer reads as a mobile sheet. */
		side = 'bottom',
		/** Show the small grab-affordance bar at the top (only for `side='bottom'`). */
		grabber = true,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
		side?: Side;
		grabber?: boolean;
		children: Snippet;
	} = $props();
</script>

<SheetPortal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content
		bind:ref
		data-slot="drawer-content"
		class={cn(sheetVariants({ side }), side === 'bottom' && 'rounded-t-xl', className)}
		{...restProps}
	>
		{#if grabber && side === 'bottom'}
			<div
				class="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/30"
				aria-hidden="true"
			></div>
		{/if}
		{@render children?.()}
		<!-- Beschrifteter Schließen-Button statt X-Icon (User-Vorgabe 2026-07-27) -->
		<SheetPrimitive.Close
			class="absolute end-4 top-3 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none"
		>
			{$dictionary.common.actions.close}
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPortal>
