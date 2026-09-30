import { getContext, hasContext, setContext } from 'svelte';
import { derived, readable } from 'svelte/store';
export const defaultUiLabels = {
    close: 'Schließen',
    cancel: 'Abbrechen',
    showMore: 'Mehr anzeigen',
    showLess: 'Weniger anzeigen',
    yes: 'Ja',
    no: 'Nein',
    searchPlaceholder: 'Suchen...',
    noResults: 'Keine Treffer.',
    emptyDefault: 'Keine Einträge gefunden.',
    clearSearch: 'Suche leeren',
    signatureClear: 'Löschen'
};
const UI_LABELS_KEY = Symbol('ui-labels');
const defaultStore = readable(defaultUiLabels);
const isStore = (input) => typeof input.subscribe === 'function';
/**
 * Setzt die Beschriftungen für alle UI-Bausteine unterhalb der aufrufenden
 * Komponente (Context — muss also während deren Initialisierung laufen).
 *
 * Als Store übergeben, damit ein Sprachwechsel zur Laufzeit durchschlägt:
 * `setUiLabels(derived(dictionary, ($d) => ({ close: $d.common.actions.close, … })))`.
 * Ein einfaches Objekt bleibt für statische Fälle erlaubt. Nicht gesetzte
 * Felder fallen auf `defaultUiLabels` zurück.
 */
export function setUiLabels(labels) {
    const store = isStore(labels)
        ? derived(labels, ($labels) => ({ ...defaultUiLabels, ...$labels }))
        : readable({ ...defaultUiLabels, ...labels });
    setContext(UI_LABELS_KEY, store);
    return store;
}
/**
 * Liest die Beschriftungen als Store (`$labels.close`). Ohne `setUiLabels`
 * eines Vorfahren liefert sie die deutschen Defaults — Bausteine funktionieren
 * dadurch auch isoliert (Tests, Storybook, fremde App ohne Verdrahtung).
 */
export function getUiLabels() {
    return hasContext(UI_LABELS_KEY) ? getContext(UI_LABELS_KEY) : defaultStore;
}
