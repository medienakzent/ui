/**
     * Drawer content — Bottom-Sheet on mobile, side-sheet on larger screens.
     *
     * Sits on top of `ui/sheet` with a default `side="bottom"` and a
     * drag-affordance bar so the drawer reads as a mobile bottom-sheet
     * without forcing every caller to override the default side prop.
     *
     * For non-bottom layouts (left/right/top), use `<Sheet>` directly.
     */
import { Dialog as SheetPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import SheetPortal from '../sheet/sheet-portal.svelte';
import { type Side } from '../sheet/sheet-content.svelte';
import { type WithoutChildrenOrChild } from '../utils/ui-utils.js';
import type { ComponentProps } from 'svelte';
type $$ComponentProps = WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
    side?: Side;
    grabber?: boolean;
    children: Snippet;
};
declare const DrawerContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DrawerContent = ReturnType<typeof DrawerContent>;
export default DrawerContent;
