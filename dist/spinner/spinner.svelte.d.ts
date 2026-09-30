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
declare const Spinner: $$__sveltets_2_IsomorphicComponent<{
    /**
         * Lightweight CSS-only loading spinner. Inherits the current text color
         * (`border-current`), so it adapts to whatever context it sits in. Override
         * the size with `class` (e.g. `class="size-6"`).
         */ class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Spinner = InstanceType<typeof Spinner>;
export default Spinner;
