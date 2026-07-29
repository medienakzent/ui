<script lang="ts">
	import XIcon from '@lucide/svelte/icons/x';
	import { dictionary } from '$lib/i18n';

	/**
	 * Einheitliche Popup-Kopfzeile (User-Vorgabe 2026-07-28): Titel links,
	 * X-Schließen-Button rechts — in JEDEM Card-Popup gleich. Untertitel über
	 * `subtitle`, Zusatzinhalt (Filter/Suche der Selektoren) über den Slot
	 * UNTER der Titelzeile.
	 *
	 * `onClose` ist dieselbe Cancel-Funktion wie der Modal-Backdrop/ESC —
	 * ein Popup schließt damit überall über dasselbe X oben rechts.
	 */
	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let onClose: () => void;
	/** id für aria-labelledby des Modals. */
	export let titleId: string | undefined = undefined;
	/**
	 * Blendet den X-Schließen-Button aus — für nicht verlassbare Popups (z. B.
	 * der verpflichtende Abschluss-/Prüfbericht-Dialog), die nur über eine
	 * bewusste Aktion (Versand / Abschließen) beendet werden dürfen.
	 */
	export let hideClose: boolean = false;
</script>

<header class="shrink-0 border-b border-border p-4">
	<div class="flex items-start justify-between gap-3">
		<div class="min-w-0">
			<h2 id={titleId} class="truncate text-lg font-semibold">{title}</h2>
			{#if subtitle}
				<p class="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
			{/if}
		</div>
		<div class="flex shrink-0 items-center gap-1.5">
			<!-- Zusatz-Aktionen (z. B. Download) links vom X -->
			<slot name="actions" />
			{#if !hideClose}
				<button
					type="button"
					on:click={onClose}
					aria-label={$dictionary.common.actions.close}
					title={$dictionary.common.actions.close}
					class="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
				>
					<XIcon class="size-5" />
				</button>
			{/if}
		</div>
	</div>
	<slot />
</header>
