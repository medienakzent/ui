<script lang="ts">
	/**
	 * Ein beschriftetes Unterschriften-Feld (Canvas + Löschen-Link + Fehlerzeile) —
	 * gemeinsame Basis von signature-popup (Lieferscheine) und project-summary
	 * (Zusammenfassungs-Tab). Die Zeichenlogik liegt in ui/utils/signature-pad.
	 */
	import { Field, FieldLabel, FieldError } from '../field/index.js';
	import { setupSignaturePad, type SignaturePad } from '../utils/signature-pad.js';
	import { getUiLabels } from '../labels/index.js';

	type Props = {
		id: string;
		label: string;
		required?: boolean;
		/** Zuvor erfasste Unterschrift (PNG data URL oder base64) — wird beim Mount restauriert. */
		initial?: string;
		/** Fehlertext unterhalb des Feldes (null = kein Fehler). */
		error?: string | null;
		/** true, sobald gezeichnet oder eine Alt-Unterschrift restauriert wurde (bind-fähig). */
		hasInk?: boolean;
	};

	let {
		id,
		label,
		required = false,
		initial = '',
		error = null,
		hasInk = $bindable(false)
	}: Props = $props();

	const labels = getUiLabels();

	let canvasEl: HTMLCanvasElement | null = null;
	let pad: SignaturePad | null = null;

	function init(canvas: HTMLCanvasElement) {
		canvasEl = canvas;
		pad = setupSignaturePad(canvas, () => (hasInk = true), initial);
		return { destroy: () => pad?.destroy() };
	}

	export function clear() {
		pad?.clear();
		hasInk = false;
	}

	export function getDataUrl(): string {
		return canvasEl?.toDataURL('image/png') ?? '';
	}
</script>

<Field data-invalid={!!error}>
	<div class="flex items-center justify-between">
		<FieldLabel for={id}>
			{label}{#if required}<span aria-hidden="true" class="text-destructive">*</span>{/if}
		</FieldLabel>
		<button
			type="button"
			onclick={clear}
			class="text-xs text-muted-foreground hover:text-foreground"
		>
			{$labels.signatureClear}
		</button>
	</div>
	<!-- Der Zeichengrund liegt bewusst in CSS und NICHT im Canvas-Inhalt:
	     sonst backt toDataURL() eine deckende Flaeche in die exportierte PNG. -->
	<canvas
		{id}
		use:init
		class="w-full rounded-md border border-border bg-gray-100 dark:bg-gray-100"
		style="touch-action: none;"
	></canvas>
	{#if error}
		<FieldError>{error}</FieldError>
	{/if}
</Field>
