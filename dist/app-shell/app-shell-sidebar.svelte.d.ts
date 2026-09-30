import { type ComponentProps, type Snippet } from 'svelte';
import * as Sidebar from '../sidebar/index.js';
import NavUser from './nav-user.svelte';
import type { ShellNavItem } from './nav-types.js';
type Props = {
    /** Hauptnavigation — bereits übersetzt und gefiltert (siehe ShellNavItem). */
    navMain: ShellNavItem[];
    /** Sekundärnavigation (Icon-Reihe am unteren Menürand). */
    navSecondary: ShellNavItem[];
    /** Aktueller Pfad: Aktiv-Erkennung der Navigation + Navigations-Signal. */
    pathname: string;
    user: ComponentProps<typeof NavUser>['user'];
    /** Bereits übersetzte Beschriftung des Abmelde-Eintrags. */
    logoutLabel: string;
    /** Abmelden anstoßen — die Bestätigung stellt die App (`footerExtras`). */
    onLogout: () => void;
    /**
     * Erste Kopfzeile neben dem Logo. Bewusst NICHT `title` — der Name
     * kollidiert mit dem gleichnamigen HTML-Attribut aus `Sidebar.Root`.
     */
    brandTitle: string;
    /** Zweite Kopfzeile (Produkt-/Versionszeile), optional. */
    brandSubtitle?: string;
    /** Logo: Bildpfad oder Snippet für eigenes Markup. */
    logo: string | Snippet;
    /** Alternativtext, wenn `logo` ein Bildpfad ist. */
    logoAlt?: string;
    /** Linkziel des Logos. */
    homeHref?: string;
    /** Zusatzzeile(n) innerhalb des Logo-Menüs (z. B. Build-Info). */
    brandExtras?: Snippet;
    /** Eigener Kopfbereich unter dem Logo-Menü (z. B. Kontext-Auswahl). */
    headerExtras?: Snippet;
    /** Suchfeld im Kopfbereich; nur mit diesem Snippet erscheint die Suchzeile. */
    search?: Snippet;
    /** Beschriftung des Such-Icons im eingeklappten Zustand. */
    searchLabel?: string;
    /** Zusätzlicher Inhalt im Footer (z. B. Bestätigungsdialoge). */
    footerExtras?: Snippet;
    /**
     * Nach jeder Navigation (und beim ersten Rendern) mit dem aktuellen Pfad
     * aufgerufen — Ersatz für einen Router-Hook, den die Shell nicht kennt.
     */
    onNavigated?: (pathname: string) => void;
} & ComponentProps<typeof Sidebar.Root>;
declare const AppShellSidebar: import("svelte").Component<Props, {}, "ref">;
type AppShellSidebar = ReturnType<typeof AppShellSidebar>;
export default AppShellSidebar;
