/**
 * Unsichtbarer „Mehr laden"-Sentinel für inkrementell gerenderte Listen
 * (#189): Die Liste rendert initial nur `visible` Zeilen; sobald der
 * Sentinel in Sichtweite scrollt, fordert er über `onMore` die nächste
 * Tranche an. Nach dem DOM-Update wird der Sentinel re-observiert, damit
 * er auch dann weiterfeuert, wenn er sichtbar bleibt (schnelles Scrollen).
 */
type Props = {
    total: number;
    visible: number;
    step?: number;
    onMore: (next: number) => void;
};
declare const ListLoadMore: import("svelte").Component<Props, {}, "">;
type ListLoadMore = ReturnType<typeof ListLoadMore>;
export default ListLoadMore;
