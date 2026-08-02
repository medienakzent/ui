import { getContext, hasContext, setContext } from 'svelte';
import { derived, readable, type Readable } from 'svelte/store';

/**
 * Beschriftungen, die die UI-Bausteine selbst rendern (Schließen-X, „Mehr
 * anzeigen", „Keine Treffer." …). Sie liegen bewusst NICHT im App-Dictionary:
 * die Bausteine sollen als eigenständige Bibliothek ohne die KKIS-Fachsprache
 * aus `i18n/messages.ts` benutzbar sein.
 *
 * Die Defaults sind deutsch und entsprechen wörtlich den bisherigen
 * Dictionary-Einträgen. Eine Konsumenten-App überschreibt sie EINMAL zentral
 * (in der Workbench: `src/routes/+layout.svelte`) per `setUiLabels`.
 */
export type UiLabels = {
	/** modal-header, drawer-content */
	close: string;
	/** modal-footer (Sekundär-Button) */
	cancel: string;
	/** collapsible-text */
	showMore: string;
	/** collapsible-text */
	showLess: string;
	/** ja-nein-icon */
	yes: string;
	/** ja-nein-icon */
	no: string;
	/** searchable-select (Suchfeld im Panel) */
	searchPlaceholder: string;
	/** searchable-select (leere Trefferliste) */
	noResults: string;
	/** list-shell (Leertext, wenn kein `emptyText` gesetzt ist) */
	emptyDefault: string;
	/** list-shell (X-Button der Suchleiste) */
	clearSearch: string;
	/** signature-field (Unterschrift löschen) */
	signatureClear: string;
};

export const defaultUiLabels: UiLabels = {
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

const defaultStore: Readable<UiLabels> = readable(defaultUiLabels);

type UiLabelsInput = Partial<UiLabels> | Readable<Partial<UiLabels>>;

const isStore = (input: UiLabelsInput): input is Readable<Partial<UiLabels>> =>
	typeof (input as Readable<Partial<UiLabels>>).subscribe === 'function';

/**
 * Setzt die Beschriftungen für alle UI-Bausteine unterhalb der aufrufenden
 * Komponente (Context — muss also während deren Initialisierung laufen).
 *
 * Als Store übergeben, damit ein Sprachwechsel zur Laufzeit durchschlägt:
 * `setUiLabels(derived(dictionary, ($d) => ({ close: $d.common.actions.close, … })))`.
 * Ein einfaches Objekt bleibt für statische Fälle erlaubt. Nicht gesetzte
 * Felder fallen auf `defaultUiLabels` zurück.
 */
export function setUiLabels(labels: UiLabelsInput): Readable<UiLabels> {
	const store = isStore(labels)
		? derived(labels, ($labels): UiLabels => ({ ...defaultUiLabels, ...$labels }))
		: readable<UiLabels>({ ...defaultUiLabels, ...labels });
	setContext(UI_LABELS_KEY, store);
	return store;
}

/**
 * Liest die Beschriftungen als Store (`$labels.close`). Ohne `setUiLabels`
 * eines Vorfahren liefert sie die deutschen Defaults — Bausteine funktionieren
 * dadurch auch isoliert (Tests, Storybook, fremde App ohne Verdrahtung).
 */
export function getUiLabels(): Readable<UiLabels> {
	return hasContext(UI_LABELS_KEY) ? getContext<Readable<UiLabels>>(UI_LABELS_KEY) : defaultStore;
}
