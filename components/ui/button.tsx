import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus-visible:outline-slate-200",
  ghost:
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-200",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-l-white" aria-hidden />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
