<script lang="ts">
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from '$lib/services/motion';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

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
		'2xl': 'max-w-2xl',
		// Vollflächig: Karte füllt den kompletten Viewport (Formulare wie die
		// Ansprechpartner-Anlage) — Fokus-Trap/Scroll-Lock/ESC wie gehabt.
		full: 'max-w-none'
	};

	// Öffnen/Schließen animieren: Backdrop blendet, die Karte fliegt kurz von
	// unten ein. Im Bottom-Sheet-Modus auf Phones (mobileBottom, <sm) rutscht
	// sie komplett von der Unterkante herein — wie ein natives Sheet. Die
	// Parameter werden pro Öffnen ausgewertet (Funktionsaufruf im Markup).
	const backdropFade = () => ({ duration: prefersReducedMotion() ? 0 : 150 });
	const panelFly = () => {
		if (prefersReducedMotion()) return { duration: 0 };
		const isSheet =
			mobileBottom && variant === 'card' && window.matchMedia('(max-width: 639px)').matches;
		return isSheet
			? { y: '100%', duration: 260, easing: cubicOut }
			: { y: 16, duration: 200, easing: cubicOut };
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

	// ── iPad/Mobile: fokussierte Eingaben IMMER in den sichtbaren Bereich
	// scrollen (User-Vorgabe 2026-07-28). Wenn die Bildschirmtastatur auffährt,
	// verdeckt sie sonst das fokussierte Feld — vor allem in bottom-anchored
	// Sheets. Zwei Signale: focusin (Feld angetippt) und visualViewport-resize
	// (Tastatur fährt auf/zu, auch verzögert nach dem Fokus).
	function isEditable(el: EventTarget | null): el is HTMLElement {
		return (
			el instanceof HTMLElement &&
			(el instanceof HTMLInputElement ||
				el instanceof HTMLTextAreaElement ||
				el instanceof HTMLSelectElement ||
				el.isContentEditable)
		);
	}

	function scrollFocusedIntoView() {
		const active = document.activeElement;
		if (!dialogEl || !isEditable(active) || !dialogEl.contains(active)) return;
		// 'center' hält das Feld auch dann sichtbar, wenn die Tastatur die
		// untere Viewport-Hälfte einnimmt; 'nearest' würde am Sheet-Rand kleben.
		active.scrollIntoView({ block: 'center', behavior: 'smooth' });
	}

	function handleFocusIn(e: FocusEvent) {
		if (!isEditable(e.target)) return;
		// Verzögert: iOS fährt die Tastatur erst NACH dem focus-Event auf und
		// verschiebt dabei den visualViewport — sofortiges Scrollen greift zu früh.
		setTimeout(scrollFocusedIntoView, 300);
	}

	let cleanupViewport: (() => void) | null = null;
	$: if (typeof window !== 'undefined') {
		if (open && !cleanupViewport && window.visualViewport) {
			const vv = window.visualViewport;
			const onResize = () => scrollFocusedIntoView();
			vv.addEventListener('resize', onResize);
			cleanupViewport = () => vv.removeEventListener('resize', onResize);
		} else if (!open && cleanupViewport) {
			cleanupViewport();
			cleanupViewport = null;
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 {zClass} flex justify-center {variant === 'plain'
			? 'bg-black/95'
			: 'bg-black/30 backdrop-blur-sm'} {mobileBottom && variant === 'card'
			? 'items-end sm:items-center'
			: 'items-center'}"
		on:click={handleBackdrop}
		on:keydown={handleKeydown}
		on:focusin={handleFocusIn}
		role="presentation"
		transition:fade={backdropFade()}
	>
		{#if variant === 'card'}
			<div
				bind:this={dialogEl}
				transition:fly|global={panelFly()}
				class={size === 'full'
					? 'flex h-dvh max-h-none w-full flex-col overflow-hidden bg-background outline-none'
					: mobileBottom
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
