import { type Snippet } from 'svelte';
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
declare const Modal: $$__sveltets_2_IsomorphicComponent<{
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
         * Consumer composes header / body / footer freely inside the default content.
         * For viewer-style fullscreen (no card, dark backdrop) pass `variant="plain"`.
         *
         * Example:
         *   <Modal bind:open size="xl" {onCancel}>
         *     <header class="border-b border-border p-4">...</header>
         *     <div class="flex-1 overflow-y-auto p-4">...</div>
         *     <footer class="border-t border-border p-4">...</footer>
         *   </Modal>
         */ open?: boolean;
    size?: "sm" | "lg" | "md" | "xl" | "2xl" | "full";
    dismissible?: boolean;
    onCancel: () => void;
    variant?: "card" | "plain";
    labelledBy?: string | undefined;
    /**
         * On `<sm:` screens, anchor the modal to the bottom of the viewport (bottom-sheet style)
         * with a rounded top edge and ≤ 90vh height. On `sm:`+ screens, behaves like a normal
         * centered card. Only applies to `variant="card"`. Selectors and tall content forms opt
         * into this for a more native feel on phones.
         */ mobileBottom?: boolean;
    /**
         * Ob ein Klick auf den Hintergrund (Backdrop) das Popup schließt. Default
         * FALSE: Popups dürfen sich nur über eine Schaltfläche (Abbrechen/X/Speichern)
         * schließen — ein versehentlicher Klick daneben verwirft sonst ungespeicherte
         * Eingaben. Reine Viewer (Galerie/Bild) können es per Prop aktivieren.
         */ closeOnBackdrop?: boolean;
    /**
         * z-index-Klasse des Overlays. Default `z-50` (Standard-Popup-Ebene). Höher
         * setzen, wenn dieses Popup ÜBER einem bereits offenen Popup liegen muss
         * (z. B. der Bild-Editor über dem Galerie-Viewer) — sonst gewinnt bei
         * gleichem z-index das im DOM zuletzt gerenderte (alte) Popup.
         */ zClass?: string;
    children?: Snippet | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Modal = InstanceType<typeof Modal>;
export default Modal;
