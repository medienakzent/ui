import type { Snippet } from 'svelte';
type Props = {
    enabled: boolean;
    children?: Snippet;
};
declare const DevOnly: import("svelte").Component<Props, {}, "">;
type DevOnly = ReturnType<typeof DevOnly>;
export default DevOnly;
