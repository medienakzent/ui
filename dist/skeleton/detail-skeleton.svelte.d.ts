/**
 * #187: Generic placeholder for entity detail pages (Customer, Project,
 * Device, Order, Delivery Note, Tour-Project). Mirrors the common detail
 * layout — a title + badge row, an action-button row, and a label/value
 * grid — so the first paint shows structure instead of an empty screen or a
 * bare "Lädt…" line. `rows` controls how many grid rows are drawn.
 */
type Props = {
    rows?: number;
};
declare const DetailSkeleton: import("svelte").Component<Props, {}, "">;
type DetailSkeleton = ReturnType<typeof DetailSkeleton>;
export default DetailSkeleton;
