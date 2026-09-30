/**
 * Gemeinsame Parameter für Svelte-Transitions in Listen — als Funktionen
 * exportiert, damit Aufrufstellen (animate:flip / transition:fade) stabil
 * bleiben, auch wenn sich die Parameter hier zentral ändern.
 */
/** Zentrale Reduced-Motion-Erkennung — überall hierüber statt eigener
 * matchMedia-Kopien (Svelte-Transitions umgehen die CSS-Regel in layout.css). */
export declare const prefersReducedMotion: () => boolean;
/** `animate:flip` auf Listen-Zeilen — bewusst ohne Animation (s. o.). */
export declare const listFlip: () => {
    duration: number;
};
/** `transition:fade` auf Listen-Zeilen — bewusst ohne Animation (s. o.). */
export declare const listFade: () => {
    duration: number;
};
