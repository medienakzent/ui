<script lang="ts">
	/**
	 * Ein beschriftetes Unterschriften-Feld (Canvas + Löschen-Link + Fehlerzeile) —
	 * gemeinsame Basis von signature-popup (Lieferscheine) und project-summary
	 * (Zusammenfassungs-Tab). Die Zeichenlogik liegt in ui/utils/signature-pad.
	 */
	import { Field, FieldLabel, FieldError } from '../field/index.js';
	import { setupSignaturePad, type SignaturePad } from '../utils/signature-pad.js';
	import { getUiLabels } from '../labels/index.js';

	export let id: string;
	export let label: string;
	export let required: boolean = false;
	/** Zuvor erfasste Unterschrift (PNG data URL oder base64) — wird beim Mount restauriert. */
	export let initial: string = '';
	/** Fehlertext unterhalb des Feldes (null = kein Fehler). */
	export let error: string | null = null;
	/** true, sobald gezeichnet oder eine Alt-Unterschrift restauriert wurde (bind-fähig). */
	export let hasInk: boolean = false;

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
			on:click={clear}
			class="text-xs text-muted-foreground hover:text-foreground"
		>
			{$labels.signatureClear}
		</button>
	</div>
	<canvas {id} use:init class="w-full rounded-md border border-border" style="touch-action: none;"
	></canvas>
	{#if error}
		<FieldError>{error}</FieldError>
	{/if}
</Field>
