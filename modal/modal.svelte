<script lang="ts">
	import { tick } from 'svelte';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	/**
	 * Generic modal shell.
	 *
	 * Provides:
	 *  - backdrop with click-to-close + Escape handling
	 *  - body scroll-lock while open
	 *  - focus trap entry (initial focus to dialog)
	 *  - aria-modal + dialog role
	 *  - max-height container with internal scrolling responsibility on consumer
	 *
	 * Consumer composes header / body / footer freely inside the default slot.
	 * For viewer-style fullscreen (no card, dark backdrop) pass `variant="plain"`.
	 *
	 * Example:
	 *   <Modal bind:open size="xl" {onCancel}>
	 *     <header class="border-b border-border p-4">...</header>
	 *     <div class="flex-1 overflow-y-auto p-4">...</div>
	 *     <footer class="border-t border-border p-4">...</footer>
	 *   </Modal>
	 */

	export let open: boolean = false;
	export let size: Size = 'md';
	export let dismissible: boolean = true;
	export let onCancel: () => void;
	export let variant: 'card' | 'plain' = 'card';
	export let labelledBy: string | undefined = undefined;
	/**
	 * On `<sm:` screens, anchor the modal to the bottom of the viewport (bottom-sheet style)
	 * with a rounded top edge and ≤ 90vh height. On `sm:`+ screens, behaves like a normal
	 * centered card. Only applies to `variant="card"`. Selectors and tall content forms opt
	 * into this for a more native feel on phones.
	 */
	export let mobileBottom: boolean = false;
	/**
	 * Ob ein Klick auf den Hintergrund (Backdrop) das Popup schließt. Default
	 * FALSE: Popups dürfen sich nur über eine Schaltfläche (Abbrechen/X/Speichern)
	 * schließen — ein versehentlicher Klick daneben verwirft sonst ungespeicherte
	 * Eingaben. Reine Viewer (Galerie/Bild) können es per Prop aktivieren.
	 */
	export let closeOnBackdrop: boolean = false;
	/**
	 * z-index-Klasse des Overlays. Default `z-50` (Standard-Popup-Ebene). Höher
	 * setzen, wenn dieses Popup ÜBER einem bereits offenen Popup liegen muss
	 * (z. B. der Bild-Editor über dem Galerie-Viewer) — sonst gewinnt bei
	 * gleichem z-index das im DOM zuletzt gerenderte (alte) Popup.
	 */
	export let zClass: string = 'z-50';

	let dialogEl: HTMLDivElement | undefined;

	const sizeClass: Record<Size, string> = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl'
	};

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && dismissible) onCancel();
	}

	function handleBackdrop(e: MouseEvent) {
		if (closeOnBackdrop && dismissible && e.target === e.currentTarget) onCancel();
	}

	// Body scroll lock while modal is open
	$: if (typeof document !== 'undefined') {
		document.body.style.overflow = open ? 'hidden' : '';
	}

	// Initial focus when opening
	$: if (open && dialogEl) {
		tick().then(() => dialogEl?.focus());
	}
</script>

{#if open}
	<div
		class="fixed inset-0 {zClass} flex justify-center {variant === 'plain'
			? 'bg-black/95'
			: 'bg-black/70 backdrop-blur-sm'} {mobileBottom && variant === 'card'
			? 'items-end sm:items-center'
			: 'items-center'}"
		on:click={handleBackdrop}
		on:keydown={handleKeydown}
		role="presentation"
	>
		{#if variant === 'card'}
			<div
				bind:this={dialogEl}
				class={mobileBottom
					? `flex max-h-[90dvh] w-full ${sizeClass[size]} flex-col overflow-hidden rounded-t-xl bg-background shadow-xl outline-none sm:mx-4 sm:max-h-[85dvh] sm:rounded-lg`
					: `mx-4 flex max-h-[85dvh] w-full ${sizeClass[size]} flex-col overflow-hidden rounded-lg bg-background shadow-xl outline-none`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelledBy}
				tabindex="-1"
			>
				<slot />
			</div>
		{:else}
			<div
				bind:this={dialogEl}
				class="flex h-full w-full flex-col outline-none"
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelledBy}
				tabindex="-1"
			>
				<slot />
			</div>
		{/if}
	</div>
{/if}
