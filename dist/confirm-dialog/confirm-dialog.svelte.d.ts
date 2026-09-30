/**
     * Einheitlicher Bestätigungs-Dialog (User-Vorgabe 2026-07-28): Modal-Karte
     * mit ModalHeader (Titel + X) und ModalFooter (Abbrechen/Bestätigen) —
     * ersetzt die früheren handgebauten fixed-Overlays. Der Fließtext kommt
     * über `body` oder frei über den Default-Inhalt (z. B. mit Zusatz-Inputs).
     */
import type { Snippet } from 'svelte';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const ConfirmDialog: $$__sveltets_2_IsomorphicComponent<{
    open?: boolean;
    title: string;
    body?: string | undefined;
    confirmLabel: string;
    cancelLabel?: string | undefined;
    onConfirm: () => void;
    onCancel: () => void;
    /** Roter Bestätigen-Button (Löschen u. Ä.). */ destructive?: boolean;
    loading?: boolean;
    /** z-Ebene — höher setzen, wenn der Dialog über einem offenen Popup liegt. */ zClass?: string;
    children?: Snippet | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type ConfirmDialog = InstanceType<typeof ConfirmDialog>;
export default ConfirmDialog;
