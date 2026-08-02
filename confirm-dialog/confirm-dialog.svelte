<script lang="ts">
	/**
	 * Einheitlicher Bestätigungs-Dialog (User-Vorgabe 2026-07-28): Modal-Karte
	 * mit ModalHeader (Titel + X) und ModalFooter (Abbrechen/Bestätigen) —
	 * ersetzt die früheren handgebauten fixed-Overlays. Der Fließtext kommt
	 * über `body` oder frei über den Default-Slot (z. B. mit Zusatz-Inputs).
	 */
	import Modal from '../modal/modal.svelte';
	import ModalHeader from '../modal/modal-header.svelte';
	import ModalFooter from '../modal/modal-footer.svelte';

	export let open: boolean = false;
	export let title: string;
	export let body: string | undefined = undefined;
	export let confirmLabel: string;
	export let cancelLabel: string | undefined = undefined;
	export let onConfirm: () => void;
	export let onCancel: () => void;
	/** Roter Bestätigen-Button (Löschen u. Ä.). */
	export let destructive: boolean = false;
	export let loading: boolean = false;
	/** z-Ebene — höher setzen, wenn der Dialog über einem offenen Popup liegt. */
	export let zClass: string = 'z-50';
</script>

<Modal {open} size="sm" {onCancel} {zClass} mobileBottom>
	<ModalHeader {title} onClose={onCancel} />
	<div class="min-h-0 flex-1 overflow-y-auto p-4">
		{#if body}
			<p class="text-sm text-muted-foreground">{body}</p>
		{/if}
		<slot />
	</div>
	<ModalFooter {onCancel} {cancelLabel} {confirmLabel} {onConfirm} {destructive} {loading} />
</Modal>
