// esm-env statt $app/environment: dieses Modul wird von UI-Bausteinen genutzt, die auch außerhalb von SvelteKit laufen sollen.
import { BROWSER as browser } from 'esm-env';
/**
 * Gemeinsame Parameter für Svelte-Transitions in Listen — als Funktionen
 * exportiert, damit Aufrufstellen (animate:flip / transition:fade) stabil
 * bleiben, auch wenn sich die Parameter hier zentral ändern.
 */
/** Zentrale Reduced-Motion-Erkennung — überall hierüber statt eigener
 * matchMedia-Kopien (Svelte-Transitions umgehen die CSS-Regel in layout.css). */
export const prefersReducedMotion = () => browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Außendienst-Umbau: Listenfilter-Animationen deaktiviert (duration 0) — beim
 * schnellen Filtern im Feld ist eine springende Liste Reibung, kein Feedback.
 * API bleibt bestehen, damit die animate:flip/transition:fade-Aufrufstellen
 * unverändert funktionieren. */
/** `animate:flip` auf Listen-Zeilen — bewusst ohne Animation (s. o.). */
export const listFlip = () => ({ duration: 0 });
/** `transition:fade` auf Listen-Zeilen — bewusst ohne Animation (s. o.). */
export const listFade = () => ({ duration: 0 });
