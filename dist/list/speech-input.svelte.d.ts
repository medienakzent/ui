type Props = {
    lang?: string;
    /**
     * Optional zwei-Wege-Binding fuer das Transkript. Wenn der Aufrufer
     * `bind:value` setzt, schreibt die Komponente das Endergebnis direkt in
     * dieses Feld zurueck — ohne dass der Konsument einen Result-Handler
     * verkabeln muss.
     */
    value?: string;
    /**
     * Wenn true, wird der erkannte Text an den bestehenden `value` angehaengt
     * (mit einem Leerzeichen). Default: false (ueberschreibt).
     */
    append?: boolean;
    class?: string;
    /** Wird nach jedem erkannten Transkript aufgerufen. */
    onresult?: (transcript: string) => void;
};
declare const SpeechInput: import("svelte").Component<Props, {}, "value">;
type SpeechInput = ReturnType<typeof SpeechInput>;
export default SpeechInput;
