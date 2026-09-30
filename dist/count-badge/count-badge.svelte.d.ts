/**
 * Inline-Count neben Icon/Text eines Buttons (z. B. „Kollegen 1").
 * Bewusst KEIN absolut positionierter Notification-Dot mehr: der ragte über
 * den Button hinaus und wurde von paint-containment-Vorfahren
 * (content-visibility der Listenzeilen) abgeschnitten.
 * Wird nur bei count > 0 gerendert; `pointer-events-none`, damit der Klick
 * weiterhin den Button trifft.
 */
type Props = {
    count: number;
};
declare const CountBadge: import("svelte").Component<Props, {}, "">;
type CountBadge = ReturnType<typeof CountBadge>;
export default CountBadge;
