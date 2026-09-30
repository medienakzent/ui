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
declare const ModalHeader: $$__sveltets_2_IsomorphicComponent<{
    /**
         * Einheitliche Popup-Kopfzeile (User-Vorgabe 2026-07-28): Titel links,
         * X-Schließen-Button rechts — in JEDEM Card-Popup gleich. Untertitel über
         * `subtitle`, Zusatzinhalt (Filter/Suche der Selektoren) über den Slot
         * UNTER der Titelzeile.
         *
         * `onClose` ist dieselbe Cancel-Funktion wie der Modal-Backdrop/ESC —
         * ein Popup schließt damit überall über dasselbe X oben rechts.
         */ title: string;
    subtitle?: string | undefined;
    onClose: () => void;
    /** id für aria-labelledby des Modals. */ titleId?: string | undefined;
    /**
         * Blendet den X-Schließen-Button aus — für nicht verlassbare Popups (z. B.
         * der verpflichtende Abschluss-/Prüfbericht-Dialog), die nur über eine
         * bewusste Aktion (Versand / Abschließen) beendet werden dürfen.
         */ hideClose?: boolean;
    /** Zusatz-Aktionen (z. B. Download) links vom X. */ actions?: Snippet | undefined;
    /** Zusatzinhalt (Filter/Suche der Selektoren) UNTER der Titelzeile. */ children?: Snippet | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type ModalHeader = InstanceType<typeof ModalHeader>;
export default ModalHeader;
