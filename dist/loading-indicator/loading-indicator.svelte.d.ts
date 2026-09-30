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
declare const LoadingIndicator: $$__sveltets_2_IsomorphicComponent<{
    /**
         * Inline "loading…" indicator: an animated spinner next to a label. Drop-in
         * replacement for the static `<p>Lade …</p>` texts used across detail pages,
         * selectors and popups. The label goes in the default content; pass layout
         * tweaks (padding, text size) via `class`.
         */ class?: string;
    spinnerClass?: string;
    children?: Snippet | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type LoadingIndicator = InstanceType<typeof LoadingIndicator>;
export default LoadingIndicator;
