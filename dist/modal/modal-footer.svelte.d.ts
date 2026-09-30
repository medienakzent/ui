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
declare const ModalFooter: $$__sveltets_2_IsomorphicComponent<{
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
         */ onCancel?: (() => void) | undefined;
    cancelLabel?: string | undefined;
    confirmLabel?: string | undefined;
    onConfirm?: (() => void) | undefined;
    confirmType?: "button" | "submit";
    confirmDisabled?: boolean;
    destructive?: boolean;
    loading?: boolean;
    /** Zusätzliche Buttons zwischen Abbrechen und Bestätigen. */ buttons?: Snippet | undefined;
    /** Zusatzaktionen, linksbündig (mr-auto) vor den Buttons. */ children?: Snippet | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type ModalFooter = InstanceType<typeof ModalFooter>;
export default ModalFooter;
