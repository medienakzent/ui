/**
 * Drawer — Bottom-Sheet adapter on top of `ui/sheet`.
 *
 * Re-exports Sheet primitives (Root/Trigger/Close/Portal/Overlay/Header/
 * Footer/Title/Description) and provides a custom `DrawerContent` that
 * defaults to `side='bottom'` with a grab-affordance bar.
 *
 * Use for mobile-friendly modal flows where a bottom-sheet feels more
 * native than a center-screen Dialog or Modal. For top/left/right
 * layouts, use `ui/sheet` directly.
 */
import {
	Root,
	Trigger,
	Close,
	Portal,
	Overlay,
	Header,
	Footer,
	Title,
	Description
} from '../sheet/index.js';
import Content from './drawer-content.svelte';

export {
	Root,
	Close,
	Trigger,
	Portal,
	Overlay,
	Content,
	Header,
	Footer,
	Title,
	Description,
	//
	Root as Drawer,
	Close as DrawerClose,
	Trigger as DrawerTrigger,
	Portal as DrawerPortal,
	Overlay as DrawerOverlay,
	Content as DrawerContent,
	Header as DrawerHeader,
	Footer as DrawerFooter,
	Title as DrawerTitle,
	Description as DrawerDescription
};
