import * as Sidebar from '../sidebar/index.js';
import type { ComponentProps } from 'svelte';
import type { ShellNavItem } from './nav-types.js';
type Props = {
    items: ShellNavItem[];
} & ComponentProps<typeof Sidebar.Group>;
declare const NavSecondary: import("svelte").Component<Props, {}, "ref">;
type NavSecondary = ReturnType<typeof NavSecondary>;
export default NavSecondary;
