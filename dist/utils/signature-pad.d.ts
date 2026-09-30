/**
 * Canvas-Unterschriften-Pad — aus signature-popup.svelte extrahiert, damit
 * die Zusammenfassungs-Seite (Tour-Projekt, Origin ContentPage „Zusammenfassung")
 * dieselbe Zeichenlogik nutzen kann wie das Signatur-Popup der Lieferscheine.
 */
export type SignaturePad = {
    clear: () => void;
    destroy: () => void;
};
export declare function setupSignaturePad(canvas: HTMLCanvasElement, onInk: () => void, initial: string): SignaturePad;
