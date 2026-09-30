/**
     * Unified list-row template. One layout for every list across the app.
     *
     * Regions (snippet props, all optional except `title`):
     *   title     — primary text
     *   idBadge   — inline id / secondary badge next to the title
     *   timeframe — date range line (Zeitraum)
     *   meta      — extra muted lines
     *   badges    — row of metric badges (Reihe an Badges)
     *   date      — top-right timestamp/date
     *   actions   — below the date, buttons/controls
     *
     * Whole-row click:
     *   • No actions  → the entire row IS the link (simplest, most robust — the
     *     whole element is one anchor). Used by every list without inline controls.
     *   • With actions → the row is a relative container; the title link stretches
     *     over it via a ::before overlay (see the style block), and the buttons sit
     *     above it through z-10, so a button never nests inside an anchor.
     *
     * The whole row gets a subtle hover background; `load` is wired to
     * `use:onVisible` for lazy metrics.
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
declare const ListRow: $$__sveltets_2_IsomorphicComponent<{
    /** Pflicht — jede Zeile hat einen Titel; alle übrigen Regionen sind optional. */ title: Snippet;
    idBadge?: Snippet | null;
    timeframe?: Snippet | null;
    meta?: Snippet | null;
    badges?: Snippet | null;
    date?: Snippet | null;
    actions?: Snippet | null;
    href?: string | null;
    load?: (() => void) | null;
    indent?: boolean;
    /** Beschriftung des Aufklapp-Buttons für die Badge-Reihe. */ badgesLabel?: string;
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type ListRow = InstanceType<typeof ListRow>;
export default ListRow;
