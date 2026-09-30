export type SearchableSelectOption = {
    value: string;
    label: string;
    /** Zusätzliche Klassen für den Options-Button (z. B. Warnfarben in Aktions-Menüs). */
    class?: string;
    /** Trennlinie oberhalb dieser Option (bei aktiver Suche ausgeblendet). */
    separatorBefore?: boolean;
    /** Nicht auswählbar (z. B. Lade-/Fehler-/Leer-Platzhalter). */
    disabled?: boolean;
    /** Optionales Icon hinter dem Label (z. B. Markierung „direkt zugeordnet"). */
    iconAfter?: import('svelte').Component<{
        class?: string;
    }>;
};
type $$ComponentProps = {
    options?: SearchableSelectOption[];
    value?: string | null;
    onSelect?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    align?: 'start' | 'center' | 'end';
    invalid?: boolean;
    /** id des Triggers, damit ein <label for=…> darauf zeigen kann. */
    id?: string;
    /** aria-label des Triggers, wenn kein sichtbares Label existiert. */
    ariaLabel?: string;
    /** Optionale Überschrift oberhalb der Liste (ersetzt frühere Select.Group). */
    heading?: string;
    class?: string;
    style?: string;
    /** Optionales Icon im Trigger (vor dem Label) — z. B. für kompakte
     *  Icon-only-Buttons auf Mobilgeräten (Label per `labelClass` ausblenden). */
    triggerIcon?: import('svelte').Component<{
        class?: string;
    }>;
    /** Zusatzklassen für das Label im Trigger (z. B. `hidden sm:inline`). */
    labelClass?: string;
    open?: boolean;
};
declare const SearchableSelect: import("svelte").Component<$$ComponentProps, {}, "open">;
type SearchableSelect = ReturnType<typeof SearchableSelect>;
export default SearchableSelect;
