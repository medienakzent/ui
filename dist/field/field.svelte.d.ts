import { type VariantProps } from 'tailwind-variants';
export declare const fieldVariants: import("tailwind-variants").TVReturnType<{
    orientation: {
        vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto";
        horizontal: string[];
        responsive: string[];
    };
}, undefined, "group/field data-[invalid=true]:text-destructive flex w-full gap-3", {
    orientation: {
        vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto";
        horizontal: string[];
        responsive: string[];
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    orientation: {
        vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto";
        horizontal: string[];
        responsive: string[];
    };
}, undefined>>;
export type FieldOrientation = VariantProps<typeof fieldVariants>['orientation'];
import { type WithElementRef } from '../utils/ui-utils.js';
import type { HTMLAttributes } from 'svelte/elements';
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    orientation?: FieldOrientation;
};
declare const Field: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Field = ReturnType<typeof Field>;
export default Field;
