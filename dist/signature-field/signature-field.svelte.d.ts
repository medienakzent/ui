type Props = {
    id: string;
    label: string;
    required?: boolean;
    /** Zuvor erfasste Unterschrift (PNG data URL oder base64) — wird beim Mount restauriert. */
    initial?: string;
    /** Fehlertext unterhalb des Feldes (null = kein Fehler). */
    error?: string | null;
    /** true, sobald gezeichnet oder eine Alt-Unterschrift restauriert wurde (bind-fähig). */
    hasInk?: boolean;
};
declare const SignatureField: import("svelte").Component<Props, {
    clear: () => void;
    getDataUrl: () => string;
}, "hasInk">;
type SignatureField = ReturnType<typeof SignatureField>;
export default SignatureField;
