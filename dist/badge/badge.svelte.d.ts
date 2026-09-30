export type BadgeVariant = 'id' | 'neutral' | 'positive' | 'warning' | 'signal' | 'info';
/**
 * Variant → classes. Außendienst-Umbau: nüchterne Optik — rounded-md statt
 * Pill-Form, text-xs als Untergrenze, Farbe nur funktional (Ampel):
 *  - `id`       inline id / secondary badge next to a title (grau)
 *  - `neutral`  metric pill (counts, grau)
 *  - `info`     Metadaten/Hinweis — bewusst dieselbe graue Optik wie neutral
 *  - `positive` success / contract / done (grün)
 *  - `warning`  attention / unchecked / locked (amber)
 *  - `signal`   strong red marker (e.g. Begehungs-Auftrag)
 */
export declare const badgeVariants: Record<BadgeVariant, string>;
type $$ComponentProps = {
    variant?: BadgeVariant;
    href?: string | null;
    onclick?: ((e: MouseEvent) => void) | undefined;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
