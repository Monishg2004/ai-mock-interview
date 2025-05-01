import { cn } from "@/lib/utils";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
