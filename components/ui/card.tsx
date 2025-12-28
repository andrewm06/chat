import type { HTMLAttributes, HTMLHeadingElement } from "react";
import { twMerge } from "tailwind-merge";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "rounded-2xl border border-slate-200 bg-white shadow-sm backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={twMerge("px-6 pt-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={twMerge("text-lg font-semibold", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={twMerge("px-6 pb-6", className)} {...props} />;
}
