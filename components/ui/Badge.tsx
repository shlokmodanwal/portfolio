import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-medium tracking-wide",
        variant === "default" && "tag",
        variant === "accent"  && "tag",
        variant === "muted"   && "tag",
        className
      )}
    >
      {children}
    </span>
  );
}
