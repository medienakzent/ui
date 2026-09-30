/**
 * Ein Eintrag der Breadcrumb-Kette. Die Ableitung (welche Segmente es gibt,
 * wie sie heißen, welches Zwischensegment eine echte Route ist) macht die
 * App — sie kennt ihren Router. Die Shell rendert nur:
 *
 * - letzter Eintrag  → aktive Seite (nicht klickbar)
 * - `href` gesetzt   → Link
 * - `href` fehlt     → reiner Text (Segment ohne eigene Route)
 */
export type AppShellBreadcrumb = {
    label: string;
    href?: string;
};
import type { Snippet } from 'svelte';
type Props = {
    /** Navigationsbaum links (die App reicht ihre eigene Sidebar herein). */
    sidebar?: Snippet;
    /**
     * Fertig abgeleitete Breadcrumb-Kette, von der Startseite bis zur
     * aktiven Seite. Ändert sie sich, scrollt die Leiste ans rechte Ende.
     */
    breadcrumbs?: AppShellBreadcrumb[];
    /** Rechte Seite der Kopfzeile — App-Aktionen (Status, Aktualisieren, …). */
    headerEnd?: Snippet;
    /** Seiteninhalt. */
    children?: Snippet;
    /**
     * Inhalt unterhalb des Seiteninhalts, aber noch innerhalb des Insets —
     * für app-eigene Leisten/Overlays, die neben dem Inhalt stehen sollen
     * (Statusleiste, Toaster).
     */
    insetEnd?: Snippet;
    /**
     * Vor-/Zurück-Buttons in der Kopfzeile. Sie existieren für die
     * installierte PWA, die keine Browser-Leiste hat; in einer normalen
     * Web-App sind sie redundant → `navButtons={false}`.
     */
    navButtons?: boolean;
    /** Zurück-Button zeigen (z. B. `false` auf der Startseite). */
    canGoBack?: boolean;
    /** Vorwärts-Button zeigen. */
    canGoForward?: boolean;
    /** Klick auf Zurück — die App entscheidet, was „zurück" heißt. */
    onBack?: () => void;
    /** Klick auf Vorwärts. */
    onForward?: () => void;
    /** Beschriftung (aria-label/title) des Zurück-Buttons. */
    backLabel?: string;
    /** Beschriftung (aria-label/title) des Vorwärts-Buttons. */
    forwardLabel?: string;
    /**
     * Logo in der Kopfzeile: Bildpfad oder Snippet für eigenes Markup.
     * Nur auf kleinen Breiten sichtbar — ab `md` zeigt die Sidebar das Logo.
     */
    logo?: string | Snippet;
    /** Alternativtext, wenn `logo` ein Bildpfad ist. */
    logoAlt?: string;
    /** Beschriftung (aria-label) des Logo-Links. */
    logoLabel?: string;
    /** Logo ausblenden, ohne die Quelle zu entfernen. */
    showLogo?: boolean;
    /** Linkziel des Logos. */
    homeHref?: string;
    /**
     * Wechselt dieser Wert, wird der Inhaltsbereich neu gemountet — die
     * Ladelogik der aktuellen Ansicht läuft dadurch frisch (Aktualisieren).
     */
    reloadKey?: unknown;
};
declare const AppShell: import("svelte").Component<Props, {}, "">;
type AppShell = ReturnType<typeof AppShell>;
export default AppShell;
