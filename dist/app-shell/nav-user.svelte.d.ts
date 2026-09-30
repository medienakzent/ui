type Props = {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    /** Bereits übersetzte Beschriftung des Abmelde-Eintrags. */
    logoutLabel: string;
    /** Abmelden anstoßen — die Bestätigung (Dialog) stellt die App. */
    onLogout: () => void;
};
declare const NavUser: import("svelte").Component<Props, {}, "">;
type NavUser = ReturnType<typeof NavUser>;
export default NavUser;
