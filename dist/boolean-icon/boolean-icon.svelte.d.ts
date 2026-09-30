/**
 * Einheitliche Ja/Nein-Anzeige als Icon: grüner Haken im Kreis = `true`,
 * rotes X im Kreis = `false`.
 *
 * Der Baustein bewertet nichts selbst — er erwartet einen fertigen boolean.
 * Wie ein Datenwert darauf abgebildet wird ('J'/'N', 0/1, Flag-Spalte …),
 * entscheidet der Aufrufer. Es gibt bewusst KEINEN dritten Zustand: ein
 * fehlender Wert (null/undefined/leeres Feld) wird am Aufrufer zu `false`
 * aufgelöst und damit — wie bisher — als „Nein" dargestellt.
 *
 * Ja/Nein bleibt für Screenreader und Tooltip als Text erhalten.
 */
type Props = {
    value: boolean;
    size?: number;
};
declare const BooleanIcon: import("svelte").Component<Props, {}, "">;
type BooleanIcon = ReturnType<typeof BooleanIcon>;
export default BooleanIcon;
