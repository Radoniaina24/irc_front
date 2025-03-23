import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "danger";
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({
  variant = "primary",
  className,
  icon,
  children,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium";

  const variantStyles = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    success: "bg-green-600 text-white",
    danger: "bg-red-600 text-white",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </span>
  );
}
