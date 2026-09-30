type Tab = {
    id: string;
    label: string;
    badge?: string | number | null;
};
type Props = {
    tabs: Tab[];
    active?: string;
};
declare const Tabs: import("svelte").Component<Props, {}, "active">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
