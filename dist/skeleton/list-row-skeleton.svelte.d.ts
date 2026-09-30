/**
 * The single skeleton loader for every list view. Mirrors the `ListRow`
 * layout (title + id badge, a meta line, a metric-badge row, a date) so the
 * placeholder matches the real rows. Renders `count` shimmering rows inside a
 * `divide-y` container — drop it in wherever a list is loading.
 */
type Props = {
    count?: number;
};
declare const ListRowSkeleton: import("svelte").Component<Props, {}, "">;
type ListRowSkeleton = ReturnType<typeof ListRowSkeleton>;
export default ListRowSkeleton;
