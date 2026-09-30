import type { ShellNavItem } from './nav-types.js';
type Props = {
    items: ShellNavItem[];
    /** Aktueller Pfad für die Aktiv-Erkennung (App liefert ihn, kein Router-Import). */
    pathname: string;
};
declare const NavMain: import("svelte").Component<Props, {}, "">;
type NavMain = ReturnType<typeof NavMain>;
export default NavMain;
