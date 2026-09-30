import type { Component } from 'svelte';
/**
 * Vertrag zwischen App und Shell-Navigation (`nav-main`, `nav-secondary`).
 *
 * Bewusst frei von App-Kopplung — die Datei wandert mit den Nav-Komponenten in
 * die UI-Bibliothek (docs/UI-LIBRARY.md, Phase 2/7). Alles, was aus der App
 * kommt, ist hier bereits AUFGELÖST: `label` statt i18n-Key, `color` statt
 * `getNavColor(id)`. Gating (`feature`, `recht`, `devOnly`) bleibt in der App
 * und erreicht die Komponenten nie.
 */
export type ShellNavItem = {
    /** Stabiler Schlüssel für `{#each}` — unabhängig von der Sprache. */
    id: string;
    /** Fertiges Linkziel (externe Einträge enthalten bereits die Server-Basis). */
    href: string;
    /** Bereits übersetzte Beschriftung. */
    label: string;
    icon: Component;
    /** Sektionsfarbe für Tint + Farbbalken der aktiven Zeile. Ohne Farbe: kein Akzent. */
    color?: string;
    badge?: string | number | null;
    /** Kennzeichnung „öffnet extern" (Icon hinter der Beschriftung). */
    external?: boolean;
    /** Nur Sekundär-Navigation: zusätzliche Aktion beim Klick. */
    onClick?: () => void;
};
