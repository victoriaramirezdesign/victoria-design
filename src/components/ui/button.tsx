import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const sizes = "h-11 px-6";

const variants: Record<Variant, string> = {
  solid:
    "bg-accent text-accent-fg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-line text-fg hover:bg-fg/5 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-fg hover:bg-fg/5",
};

function cn(variant: Variant, className?: string) {
  return `${base} ${sizes} ${variants[variant]} ${className ?? ""}`.trim();
}

export function ButtonLink({
  variant = "solid",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={cn(variant, className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={cn(variant, className)} {...props}>
      {children}
    </button>
  );
}
