import { type VariantProps } from 'tailwind-variants';
export declare const sheetVariants: import("tailwind-variants").TVReturnType<{
    side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto max-h-[85dvh] border-b";
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto max-h-[85dvh] border-t";
        left: "data-[state=closed]:slide-out-to-start data-[state=open]:slide-in-from-start inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm";
        right: "data-[state=closed]:slide-out-to-end data-[state=open]:slide-in-from-end inset-y-0 end-0 h-full w-3/4 border-s sm:max-w-sm";
    };
}, undefined, "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex max-h-[100dvh] flex-col gap-4 overflow-y-auto overscroll-contain shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
    side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto max-h-[85dvh] border-b";
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto max-h-[85dvh] border-t";
        left: "data-[state=closed]:slide-out-to-start data-[state=open]:slide-in-from-start inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm";
        right: "data-[state=closed]:slide-out-to-end data-[state=open]:slide-in-from-end inset-y-0 end-0 h-full w-3/4 border-s sm:max-w-sm";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto max-h-[85dvh] border-b";
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto max-h-[85dvh] border-t";
        left: "data-[state=closed]:slide-out-to-start data-[state=open]:slide-in-from-start inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm";
        right: "data-[state=closed]:slide-out-to-end data-[state=open]:slide-in-from-end inset-y-0 end-0 h-full w-3/4 border-s sm:max-w-sm";
    };
}, undefined>>;
export type Side = VariantProps<typeof sheetVariants>['side'];
import { Dialog as SheetPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import SheetPortal from './sheet-portal.svelte';
import { type WithoutChildrenOrChild } from '../utils/ui-utils.js';
import type { ComponentProps } from 'svelte';
type $$ComponentProps = WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
    side?: Side;
    children: Snippet;
};
declare const SheetContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type SheetContent = ReturnType<typeof SheetContent>;
export default SheetContent;
