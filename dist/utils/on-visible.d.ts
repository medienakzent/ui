/**
 * Svelte action: fires `callback` once the node scrolls into view, then stops
 * observing. Used by list items to lazily load metrics only when visible.
 *
 * `rootMargin: '160px 0px'` pre-loads rows just before they enter the viewport
 * — same threshold the hand-rolled IntersectionObservers used previously.
 *
 * Usage: `<a use:onVisible={loadMetrics}>` — a falsy callback is a no-op, so the
 * action can be applied unconditionally on a shared template.
 */
export declare function onVisible(node: HTMLElement, callback?: (() => void) | null): {
    destroy(): void;
} | undefined;
