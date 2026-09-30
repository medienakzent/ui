/**
 * Textblock mit Überschrift, der auf der Beleg-Detailseite standardmäßig auf
 * 3 Zeilen begrenzt wird (line-clamp-3). Ist der Inhalt länger, erscheint ein
 * "Mehr anzeigen"-Umschalter — so geht kein Platz durch lange Betreff-/
 * Schluss-/Bemerkungstexte verloren.
 */
type Props = {
    title: string;
    text: string | null | undefined;
};
declare const CollapsibleText: import("svelte").Component<Props, {}, "">;
type CollapsibleText = ReturnType<typeof CollapsibleText>;
export default CollapsibleText;
