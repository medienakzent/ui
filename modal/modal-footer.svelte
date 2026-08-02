<script lang="ts">
	import { getUiLabels } from '../labels/index.js';

	/**
	 * Einheitliche Popup-Fußzeile (User-Vorgabe 2026-07-28): Abbrechen-Button
	 * links vom primären Bestätigen-Button, in JEDEM Card-Popup gleich.
	 *
	 *  - `onCancel` rendert den Sekundär-Button (Label default „Abbrechen").
	 *  - `confirmLabel` rendert den Primär-Button; `confirmType="submit"` für
	 *    Formulare (dann kein onConfirm nötig), sonst `onConfirm`.
	 *  - `destructive` färbt den Bestätigen-Button rot (Löschen-Dialoge).
	 *  - `loading` sperrt beide Buttons (z. B. während des Speicherns).
	 *  - Slot: Zusatzaktionen, linksbündig (mr-auto) vor den Buttons.
	 */
	export let onCancel: (() => void) | undefined = undefined;
	export let cancelLabel: string | undefined = undefined;
	export let confirmLabel: string | undefined = undefined;
	export let onConfirm: (() => void) | undefined = undefined;
	export let confirmType: 'button' | 'submit' = 'button';
	export let confirmDisabled: boolean = false;
	export let destructive: boolean = false;
	export let loading: boolean = false;

	const labels = getUiLabels();
</script>

<footer class="flex shrink-0 items-center justify-end gap-3 border-t border-border p-4">
	{#if $$slots.default}
		<div class="mr-auto flex min-w-0 items-center gap-2">
			<slot />
		</div>
	{/if}
	{#if onCancel}
		<button
			type="button"
			disabled={loading}
			on:click={onCancel}
			class="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
		>
			{cancelLabel ?? $labels.cancel}
		</button>
	{/if}
	<!-- Zusätzliche Buttons zwischen Abbrechen und Bestätigen (z. B. Logout:
	     „Nur abmelden") — Konsumenten nutzen die Sekundär-Klassen. -->
	<slot name="buttons" />
	{#if confirmLabel}
		<button
			type={confirmType}
			disabled={confirmDisabled || loading}
			on:click={confirmType === 'button' ? onConfirm : undefined}
			class="rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 {destructive
				? 'bg-destructive text-white hover:bg-destructive/90'
				: 'bg-primary text-primary-foreground hover:bg-primary/90'}"
		>
			{confirmLabel}
		</button>
	{/if}
</footer>
