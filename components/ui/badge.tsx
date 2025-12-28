import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type BadgeVariant = "success" | "warning" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 border border-slate-200",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
